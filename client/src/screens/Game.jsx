import { useEffect, useMemo, useRef, useState } from 'react'
import { useGame } from '../game/context'
import { CHAPTERS, MODERN, ATTRS, CHARACTERS, ACHIEVEMENTS as ACHIEVEMENT_DEFS } from '../data'
import { applyEffects, applyRelationshipEffects, computeScore, pickEnding } from '../game/engine'
import { mockAiAnalysis, analyzeFreeText, matchChoice } from '../game/ai'
import { sfx } from '../game/audio'
import { logDecisionRemote } from '../game/store'
import {
  ARJUNA_OPENING_SEQUENCE,
  KARNA_OPENING_SEQUENCE,
  KRISHNA_OPENING_SEQUENCE,
  YUDHISHTHIRA_OPENING_SEQUENCE,
  ABHIMANYU_OPENING_SEQUENCE,
  getConsequenceSceneId,
  getIntroSceneId,
  getModernSceneId,
  getScene,
} from '../game/sceneData'
import { setAmbience, stopAmbienceOnly as stopAmbience } from '../game/ambientAudio'
import { CinematicRenderer } from '../components/CinematicRenderer'
import { CharacterPortrait } from '../components/CharacterPortrait'
import { SceneBackdrop } from '../components/SceneBackdrop'
import { CameraController } from '../components/CameraController'
import { CharacterStage } from '../components/CharacterStage'
import {
  Icon,
  Radar,
  NumberTicker,
  DeltaChip,
  InsightPanel,
  AiPanel,
  LotusDivider,
} from '../components/ui'

const OWN_PATH = {
  id: 'OWN',
  tag: 'Your own path',
  label: 'My own answer — written in my own words, at my own risk.',
  effects: { fairness: 2, compassion: 2, responsibility: 2, integrity: 2, strategy: 2, awareness: 2 },
  relationshipEffects: { krishna: 4, yudhishthira: 4 },
  consequence:
    "You walk a road that is on no one else's map. The story bends to include your answer — and the council of your conscience adjourns without a verdict, which is its own kind of consequence.",
}

const OWN_INSIGHT = {
  reflection:
    'The epic would recognize this move — not one of its heroes follows the map either. What matters now is how you carry what you have chosen.',
  principle: 'An unscripted choice still scripts its consequences.',
  source: 'A lesson every chapter of the Mahabharata repeats',
}

const ROMAN = { 1: 'I', 2: 'II', 3: 'III', 4: 'IV', 5: 'V' }

const DEFAULT_RELATIONSHIPS = {
  A: { krishna: 8, bhishma: -4, drona: -4 },
  B: { krishna: -4, bhishma: 8, drona: 6, yudhishthira: -6 },
  C: { krishna: 4, bhishma: 6, yudhishthira: 6, karna: -4 },
  D: { krishna: 12, yudhishthira: 6 },
}

export default function Game({ route, go }) {
  const { state, dispatch } = useGame()
  const mode = route.params?.mode || 'chapter'
  const chapter = mode === 'chapter' ? CHAPTERS.find((c) => c.id === route.params.chapterId) : null
  const scen = mode === 'modern' ? MODERN.find((s) => s.id === route.params.scenarioId) : null

  const chapterState = chapter ? state.chapters[chapter.id] || null : null
  const [nodeId, setNodeId] = useState(() =>
    mode === 'chapter' ? chapterState?.currentNode || chapter.startNode : scen.id
  )

  const node = useMemo(() => {
    if (mode === 'chapter') return chapter.nodes[nodeId]
    return {
      type: 'decision',
      scenarioId: scen.id,
      title: scen.title,
      subtitle: scen.category,
      narrative: scen.situation,
      prompt: scen.prompt,
      choices: scen.choices,
      insightStyle: 'modern',
      insight: scen.insight,
      freeText: scen.freeText,
      next: '__done__',
    }
  }, [mode, chapter, nodeId, scen])

  // Multi-beat story index
  const [beatIndex, setBeatIndex] = useState(0)

  // Stage: 'story' | 'intro' | 'choose' | 'consequence' | 'wisdom' | 'ending'
  const [stage, setStage] = useState(() =>
    node.type === 'story' ? 'story' : node.type === 'ending' ? 'ending' : 'intro'
  )
  const [selected, setSelected] = useState(null)
  const [committed, setCommitted] = useState(null)

  // Free-text
  const [ftOpen, setFtOpen] = useState(false)
  const [ftText, setFtText] = useState('')
  const [ftBusy, setFtBusy] = useState(false)
  const [ftResult, setFtResult] = useState(null)

  const lastChoiceRef = useRef(null)

  // Enter chapter
  useEffect(() => {
    if (mode === 'chapter') {
      dispatch({
        type: 'startChapter',
        chapterId: chapter.id,
        nodeId: chapterState?.currentNode || chapter.startNode,
      })
    }
    return () => stopAmbience()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (mode === 'chapter') dispatch({ type: 'setNode', chapterId: chapter.id, nodeId })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodeId])

  // Reset on node change
  useEffect(() => {
    setStage(node.type === 'story' ? 'story' : node.type === 'ending' ? 'ending' : 'intro')
    setSelected(null)
    setCommitted(null)
    setFtOpen(false)
    setFtText('')
    setFtResult(null)
    setBeatIndex(0)
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [nodeId, scen?.id]) // eslint-disable-line

  // Chapter completion
  const doneRef = useRef(false)
  useEffect(() => {
    if (node.type === 'ending' && mode === 'chapter' && !doneRef.current) {
      doneRef.current = true
      dispatch({ type: 'completeChapter', chapterId: chapter.id })
    }
  }, [node.type]) // eslint-disable-line

  // ---------- Helpers ----------

  const nextIdFor = (choiceId) =>
    mode === 'chapter' ? node.nextByChoice?.[choiceId] || node.next || null : null

  const buildIntro = () => {
    const paras = [...(node.narrative || [])]
    if (mode === 'chapter' && node.introVariants) {
      const last = lastChoiceRef.current || chapterState?.path?.slice(-1)[0]
      const variant = last ? node.introVariants[last] : null
      if (variant) paras.unshift(variant)
    }
    return paras
  }

  const commit = (choice, freeText = null) => {
    const relEffects = choice.relationshipEffects || DEFAULT_RELATIONSHIPS[choice.id] || {}
    const choiceWithRel = { ...choice, relationshipEffects: relEffects }
    const attrsAfter = applyEffects(state.attributes, choice.effects || {})
    const relsAfter = applyRelationshipEffects(state.relationships, relEffects)
    const nextId = nextIdFor(choice.id)

    dispatch({
      type: 'commitDecision',
      chapterId: mode === 'chapter' ? chapter.id : null,
      scenarioId: node.scenarioId || nodeId,
      mode,
      choice: choiceWithRel,
      freeText,
      nextNodeId: nextId,
    })

    logDecisionRemote({
      sessionId: state.sessionId,
      scenarioId: node.scenarioId || nodeId,
      mode,
      choiceId: choice.id,
      freeText,
      deltas: choice.effects || {},
      scoreAfter: computeScore(attrsAfter),
    })

    lastChoiceRef.current = choice.id

    // Build consequence scene data
    const conseqSceneId = getConsequenceSceneId(nodeId, choice.id)
    const conseqScene = getScene(conseqSceneId)

    setCommitted({
      choice: choiceWithRel,
      freeText,
      conseqSceneId,
      conseqScene,
      ai: mockAiAnalysis(choiceWithRel, attrsAfter),
      attrsAfter,
      relsAfter,
    })

    setStage('consequence')
    sfx('confirm', state.muted)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const advance = () => {
    if (mode === 'modern') {
      go('modern', { completed: scen.id })
      return
    }
    const nextId = nextIdFor(lastChoiceRef.current) || node.next
    if (!nextId) {
      go('chapters')
      return
    }
    setNodeId(nextId)
  }

  // ---------- Free-text handler ----------

  const submitFreeText = async () => {
    const text = ftText.trim()
    if (!text || ftBusy) return
    setFtBusy(true)
    let server = null
    try {
      const res = await fetch('/api/ai/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, scenarioId: node.scenarioId || nodeId, choices: node.choices }),
      })
      if (res.ok) server = await res.json()
    } catch { /* offline */ }
    await new Promise((r) => setTimeout(r, 450))
    const local = analyzeFreeText(text)
    const engineRes = server || local
    const matched = node.choices ? matchChoice(text, node.choices) : null
    const choice = matched || OWN_PATH
    const provisional = engineRes.provisional || local.provisional
    const deltas = Object.entries(provisional)
      .map(([key, v]) => ({ key, v: v - 50 }))
      .sort((a, b) => Math.abs(b.v) - Math.abs(a.v))
      .slice(0, 4)
    const labelOf = (k) => ATTRS.find((a) => a.key === k)?.label || k

    const analysis = {
      engine: engineRes.engine || 'rule-based-mock',
      simulated: engineRes.simulated !== false,
      decisionLabel: engineRes.decisionLabel || `"${text.slice(0, 75)}"`,
      summary: engineRes.summary || local.summary,
      ethicalConsiderations: engineRes.ethicalConsiderations || local.ethicalConsiderations,
      strategicConsiderations: engineRes.strategicConsiderations || local.strategicConsiderations,
      possibleConsequences: engineRes.possibleConsequences || local.possibleConsequences,
      strengths: deltas.filter((d) => d.v > 0).slice(0, 2).map((d) => ({ label: labelOf(d.key), delta: Math.round(d.v / 5) })),
      concerns: deltas.filter((d) => d.v < 0).slice(0, 2).map((d) => ({ label: labelOf(d.key), delta: Math.round(d.v / 5) })),
      bars: deltas.map((d) => ({ key: d.key, label: labelOf(d.key), value: provisional[d.key] ?? 50, delta: d.v })),
    }

    setFtResult({ analysis, choice, text, note: engineRes.note })
    setFtBusy(false)
    sfx('counsel', state.muted)
  }

  // ---------- Scene ID resolution ----------

  const getStorySequence = () => {
    if (chapter?.id === 'karna') return KARNA_OPENING_SEQUENCE
    if (chapter?.id === 'krishna') return KRISHNA_OPENING_SEQUENCE
    if (chapter?.id === 'yudhishthira') return YUDHISHTHIRA_OPENING_SEQUENCE
    if (chapter?.id === 'abhimanyu') return ABHIMANYU_OPENING_SEQUENCE
    return ARJUNA_OPENING_SEQUENCE
  }

  const getStorySceneId = () => {
    const seq = getStorySequence()
    return seq[beatIndex] || seq[0]
  }

  const getDecisionIntroSceneId = () => {
    if (mode === 'modern') return getModernSceneId(scen?.id)
    return getIntroSceneId(nodeId) || `${chapter?.id || 'arj'}_1_intro`
  }

  // ---------- Derived ----------
  const progressDecisions = mode === 'chapter' ? chapterState?.path?.length || 0 : 0
  const scenIndex = mode === 'modern' ? MODERN.findIndex((s) => s.id === scen.id) + 1 : 0

  // ---------- Choose stage backdrop ----------
  const chooseBackdropKey = useMemo(() => {
    const introId = getDecisionIntroSceneId()
    const introScene = getScene(introId)
    return introScene?.backdrop || 'battlefield_dawn'
  }, [nodeId, mode]) // eslint-disable-line

  const chooseBackgroundImage = useMemo(() => {
    const introId = getDecisionIntroSceneId()
    const introScene = getScene(introId)
    return introScene?.backgroundImage || null
  }, [nodeId, mode]) // eslint-disable-line

  const chooseCharacters = useMemo(() => {
    const introId = getDecisionIntroSceneId()
    const introScene = getScene(introId)
    return introScene?.characters || []
  }, [nodeId, mode]) // eslint-disable-line

  const chooseCamera = useMemo(() => {
    const introId = getDecisionIntroSceneId()
    const introScene = getScene(introId)
    return introScene?.camera ? { ...introScene.camera, duration: 30000, endZoom: (introScene.camera.endZoom || 1) + 0.05 } : {}
  }, [nodeId, mode]) // eslint-disable-line

  return (
    <div className="scene cinematic-game-wrap">
      {/* Top Banner */}
      <div className="scene-head">
        <div className="scene-kicker">
          {mode === 'chapter' ? (
            <>Chapter {ROMAN[chapter?.order || 1]} · {chapter?.title}</>
          ) : (
            <>Modern Dilemma {scenIndex} of {MODERN.length} · {scen?.category}</>
          )}
        </div>
        {stage !== 'ending' && (
          <div className="scene-progress">
            {mode === 'chapter'
              ? `${progressDecisions} of ${chapter?.decisionsRequired || 4} decisions made`
              : 'One situation · one call'}
          </div>
        )}
      </div>

      {/* ====== MULTI-BEAT STORY (All 5 Chapters) ====== */}
      {stage === 'story' && (
        <CinematicRenderer
          sceneId={getStorySceneId()}
          muted={state.muted}
          continueLabel={beatIndex < getStorySequence().length - 1 ? 'Next Scene' : 'Approach the Dilemma'}
          onComplete={() => {
            if (beatIndex < getStorySequence().length - 1) {
              setBeatIndex(beatIndex + 1)
            } else {
              setNodeId(node.next)
            }
          }}
        />
      )}

      {/* ====== DECISION · INTRO (cinematic scene) ====== */}
      {stage === 'intro' && node.type === 'decision' && (
        <CinematicRenderer
          sceneId={getDecisionIntroSceneId()}
          muted={state.muted}
          continueLabel="Face the Decision"
          onComplete={() => {
            setStage('choose')
            sfx('page', state.muted)
          }}
        />
      )}

      {/* ====== DECISION · CHOOSE (backdrop visible behind cards) ====== */}
      {stage === 'choose' && (
        <div className="choose-screen-cinematic fade-in">
          {/* Background scene remains visible */}
          <div className="choose-backdrop-layer">
            <CameraController camera={chooseCamera}>
              <SceneBackdrop backdropKey={chooseBackdropKey} backgroundImage={chooseBackgroundImage} />
              <CharacterStage characters={chooseCharacters} />
            </CameraController>
            <div className="choose-overlay-gradient" />
          </div>

          {/* Choice cards overlaid */}
          <div className="choose-content-overlay">
            {mode === 'modern' && node.narrative && node.narrative.length > 0 && (
              <div className="modern-situation-card pop-in">
                <div className="modern-situation-kicker">
                  <Icon name="spark" size={13} />
                  <span>WHAT HAPPENED</span>
                </div>
                <div className="modern-situation-body">
                  {node.narrative.map((p, idx) => (
                    <p key={idx} className="modern-situation-p">{p}</p>
                  ))}
                </div>
              </div>
            )}

            <div className="prompt-block">
              <div className="eyebrow gold">YOUR DILEMMA</div>
              <h2 className="prompt-heading">{node.prompt}</h2>
            </div>

            <div className="choice-grid">
              {node.choices.map((c, i) => (
                <button
                  key={c.id}
                  className={`choice-card royal-card ${selected === c.id ? 'selected' : ''}`}
                  style={{ animationDelay: `${i * 80}ms` }}
                  onClick={() => {
                    setSelected(c.id)
                    sfx('select', state.muted)
                  }}
                >
                  <div className="choice-numeral">{ROMAN[i + 1] || c.id}</div>
                  <div className="choice-body">
                    <div className="choice-tag">{c.tag}</div>
                    <div className="choice-label">{c.label}</div>
                  </div>
                  {selected === c.id && (
                    <div className="choice-check-badge">
                      <Icon name="check" size={16} />
                    </div>
                  )}
                </button>
              ))}
            </div>

            {selected && (
              <div className="confirm-bar pop-in">
                <div className="confirm-text">
                  Selected: <strong>&ldquo;{node.choices.find((c) => c.id === selected)?.label}&rdquo;</strong>
                </div>
                <div className="btn-row">
                  <button
                    className="btn gold lg"
                    onClick={() => commit(node.choices.find((c) => c.id === selected))}
                  >
                    Confirm Choice <Icon name="arrow" size={15} />
                  </button>
                  <button className="btn ghost" onClick={() => setSelected(null)}>
                    Reconsider
                  </button>
                </div>
              </div>
            )}

            {node.freeText?.enabled && (
              <div className="ft-wrap fade-up">
                <button className="ft-toggle" onClick={() => setFtOpen(!ftOpen)}>
                  <Icon name="spark" size={15} />
                  {ftOpen ? 'Hide custom reasoning' : 'Prefer to express your own reasoning in free text?'}
                </button>

                {ftOpen && (
                  <div className="ft-body pop-in royal-parchment">
                    <label className="ft-label" htmlFor="ft-text">
                      {node.freeText.prompt || 'What would you do?'}
                    </label>
                    <textarea
                      id="ft-text"
                      className="ft-textarea"
                      value={ftText}
                      onChange={(e) => setFtText(e.target.value)}
                      placeholder="Speak plainly — your moral reasoning and second-order calculations will be evaluated by Krishna's Counsel."
                      rows={4}
                    />
                    <div className="btn-row">
                      <button
                        className="btn gold"
                        disabled={!ftText.trim() || ftBusy}
                        onClick={submitFreeText}
                      >
                        {ftBusy ? 'Analyzing moral reasoning…' : 'Analyze My Decision'}
                      </button>
                    </div>

                    {ftResult && (
                      <div className="ft-result pop-in">
                        <AiPanel
                          analysis={ftResult.analysis}
                          note={ftResult.note}
                          decisionLabel={ftResult.analysis.decisionLabel}
                        />
                        <div className="ft-match">
                          {matchLabel(ftResult.choice, node.choices)}
                        </div>
                        <button
                          className="btn gold lg"
                          onClick={() => {
                            const choice =
                              ftResult.choice === OWN_PATH
                                ? { ...OWN_PATH, insight: OWN_INSIGHT }
                                : ftResult.choice
                            commit(choice, ftResult.text)
                          }}
                        >
                          Commit this Decision <Icon name="arrow" size={15} />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ====== CONSEQUENCE SCENE ====== */}
      {stage === 'consequence' && committed && (
        <div className="consequence-screen-cinematic fade-in">
          {/* Cinematic consequence visual if available */}
          {committed.conseqSceneId && (
            <CinematicRenderer
              sceneId={committed.conseqSceneId}
              muted={state.muted}
              continueLabel=""
              onComplete={() => {}}
            />
          )}

          {/* If no cinematic scene, show fallback dialogue */}
          {!committed.conseqSceneId && (
            <div className="consequence-fallback-dialogue fade-up">
              <div className="dialogue-portrait-side">
                <CharacterPortrait characterId="krishna" size={90} emotion="calm" />
                <div className="reaction-speaker-name">Krishna</div>
              </div>
              <div className="dialogue-speech-bubble royal-parchment">
                <p className="reaction-dialogue-text">{committed.choice.consequence}</p>
              </div>
            </div>
          )}

          {/* Score impacts */}
          <div className="panel shift-panel fade-up" style={{ animationDelay: '300ms' }}>
            <div className="eyebrow gold">DECISION PROFILE SHIFT</div>
            <div className="attr-shift-grid">
              {ATTRS.map((a, i) => {
                const delta = committed.choice.effects?.[a.key] || 0
                const val = state.attributes[a.key]
                return (
                  <div className="attr-row" key={a.key} style={{ animationDelay: `${i * 60}ms` }}>
                    <span className="attr-icon" style={{ color: a.color }}>
                      <Icon name={a.icon} size={15} />
                    </span>
                    <span className="attr-name">{a.label}</span>
                    <div className="attr-bar">
                      <div
                        className="attr-fill"
                        style={{ width: `${val}%`, background: a.color, animationDelay: `${i * 60}ms` }}
                      />
                    </div>
                    <span className="attr-val">{val}</span>
                    <DeltaChip value={delta} delay={300 + i * 70} />
                  </div>
                )
              })}
            </div>

            {committed.choice.relationshipEffects && Object.keys(committed.choice.relationshipEffects).length > 0 && (
              <div className="rel-shift-block">
                <div className="eyebrow gold">RELATIONSHIP IMPACT</div>
                <div className="rel-shift-chips">
                  {Object.entries(committed.choice.relationshipEffects).map(([charId, delta]) => {
                    const cMeta = CHARACTERS[charId] || { name: charId }
                    return (
                      <div className="rel-chip" key={charId}>
                        <span className="rel-chip-name">{cMeta.name}</span>
                        <DeltaChip value={delta} delay={450} />
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            <div className="scoreline">
              <span className="scoreline-label">Dharma Decision Profile</span>
              <span className="scoreline-num">
                <NumberTicker value={state.score} />
                <span className="score-of"> / 100</span>
              </span>
            </div>
          </div>

          <div className="continue-row fade-up" style={{ animationDelay: '500ms' }}>
            <button
              className="btn gold lg"
              onClick={() => {
                setStage('wisdom')
                sfx('insight', state.muted)
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
            >
              Examine Wisdom & Counsel <Icon name="arrow" size={16} />
            </button>
          </div>
        </div>
      )}

      {/* ====== WISDOM & COUNSEL ====== */}
      {stage === 'wisdom' && committed && (
        <div className="wisdom-screen fade-in">
          {committed.choice.insight && (
            <InsightPanel insight={committed.choice.insight} style={node.insightStyle || 'epic'} />
          )}
          {!committed.choice.insight && node.insight && (
            <InsightPanel insight={node.insight} style={node.insightStyle || 'epic'} />
          )}

          <AiPanel analysis={committed.ai} decisionLabel={committed.choice.label} />

          <div className="continue-row fade-up" style={{ animationDelay: '500ms' }}>
            {mode === 'modern' ? (
              <div className="btn-row wrap">
                {scen?.next && (
                  <button
                    className="btn gold lg"
                    onClick={() => {
                      dispatch({ type: 'completeModern', scenarioId: scen.id })
                      go('game', { mode: 'modern', scenarioId: scen.next })
                    }}
                  >
                    Proceed to Next Dilemma <Icon name="arrow" size={16} />
                  </button>
                )}
                <button
                  className="btn ghost lg"
                  onClick={() => go('modern', { completed: scen.id })}
                >
                  Return to Modern Dilemmas Hub
                </button>
                {!scen?.next && (
                  <button
                    className="btn gold lg"
                    onClick={() => go('dashboard')}
                  >
                    Examine Your Dharma Profile <Icon name="arrow" size={16} />
                  </button>
                )}
              </div>
            ) : (
              <button className="btn gold lg" onClick={advance}>
                {(nextIdFor(lastChoiceRef.current) || '').endsWith('_end')
                  ? 'Behold the Outcome'
                  : 'Continue the Journey'}{' '}
                <Icon name="arrow" size={16} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* ====== ENDING ====== */}
      {stage === 'ending' && mode === 'chapter' && (
        <EndingStage node={node} chapter={chapter} go={go} />
      )}
    </div>
  )
}

function matchLabel(choice) {
  if (choice === OWN_PATH || choice?.id === 'OWN') {
    return 'Your words walk an unscripted road — the narrative bends to honor your authentic reasoning.'
  }
  return `Closest canonical path: "${choice?.label}". Your custom reasoning is permanently recorded with your decision profile.`
}

/* ---------------------------------------------------------- ending screen */

function EndingStage({ node, chapter, go }) {
  const { state, dispatch } = useGame()
  const ending = pickEnding(node.endings, state.attributes, state.score)
  const unlockedIds = Object.keys(state.achievements)
  const lockedChapters = CHAPTERS.filter((c) => c.status !== 'playable')

  const replay = () => {
    dispatch({ type: 'startChapter', chapterId: chapter.id, nodeId: chapter.startNode, fresh: true })
    go('game', { mode: 'chapter', chapterId: chapter.id })
  }

  return (
    <div className="ending fade-in">
      {/* Ending cinematic backdrop */}
      <div className="ending-cinematic-backdrop">
        <CameraController camera={{ startZoom: 1.05, endZoom: 0.95, panX: 0, panY: 2, duration: 15000 }}>
          <SceneBackdrop backdropKey="aftermath_sunset" />
        </CameraController>
        <div className="ending-backdrop-gradient" />
      </div>

      <div className="ending-content-overlay">
        <div className="ending-kicker">Chapter Complete — {chapter?.title}</div>
        <h2 className="ending-archetype">{ending.name}</h2>
        <div className="ending-line">&ldquo;{ending.line}&rdquo;</div>

        <LotusDivider />

        <div className="epilogue royal-parchment fade-up">
          {ending.epilogue.map((p, i) => (
            <p key={i} className="epilogue-para">{p}</p>
          ))}
        </div>

        <div className="panel final-panel fade-up">
          <div className="final-grid">
            <div className="radar-wrap">
              <Radar attrs={state.attributes} size={290} />
            </div>

            <div className="final-side">
              <div className="eyebrow gold">Your Dharma Decision Profile</div>
              <div className="score-hero left">
                <div className="score-hero-num">
                  <NumberTicker value={state.score} />
                  <span className="score-of">/ 100</span>
                </div>
                <div className="score-hero-label">Decision Profile · A mirror of your decision style</div>
              </div>

              <div className="attr-mini-grid">
                {ATTRS.map((a) => (
                  <div className="attr-mini" key={a.key}>
                    <span className="attr-mini-name">{a.label}</span>
                    <span className="attr-mini-val" style={{ color: a.color }}>
                      {state.attributes[a.key]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Relationships */}
          <div className="final-relationships-block">
            <div className="eyebrow gold">Character Relationships Standing</div>
            <div className="rel-grid">
              {Object.entries(state.relationships || {}).map(([charId, val]) => {
                const c = CHARACTERS[charId] || { name: charId }
                return (
                  <div className="rel-card" key={charId}>
                    <CharacterPortrait characterId={charId} size={42} emotion="calm" />
                    <div className="rel-info">
                      <span className="rel-name">{c.name}</span>
                      <span className="rel-val">{val} / 100</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {node.chapterInsight && <InsightPanel insight={node.chapterInsight} />}

        <section className="panel fade-up">
          <h3 className="panel-title">Achievements Recorded</h3>
          <div className="ach-grid compact">
            {['duty_bound', 'balanced_mind', 'strategic_thinker', 'compassionate_leader'].map((id) => {
              const a = ACHIEVEMENT_DEFS.find((x) => x.id === id)
              const has = unlockedIds.includes(id)
              return (
                <div className={`ach-card ${has ? 'unlocked' : ''}`} key={id} title={a.desc}>
                  <span className="ach-icon">
                    <Icon name={a.icon} size={18} />
                  </span>
                  <div>
                    <div className="ach-title">{a.title}</div>
                    <div className="ach-desc">{a.desc}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        <div className="teaser-row fade-up">
          <div className="teaser-head">The Chronicles Continue</div>
          {lockedChapters.map((c) => (
            <div className="teaser-card" key={c.id}>
              <Icon name="lock" size={13} />
              <div>
                <strong>{c.character}</strong> — {c.theme}
              </div>
            </div>
          ))}
        </div>

        <div className="btn-row wrap fade-up">
          <button className="btn gold" onClick={() => go('dashboard')}>
            View My Dharma Profile <Icon name="arrow" size={15} />
          </button>
          <button className="btn ghost" onClick={() => go('modern')}>
            Play Modern Dilemmas
          </button>
          <button className="btn ghost" onClick={replay}>
            Replay Chapter
          </button>
          <button className="btn ghost" onClick={() => go('menu')}>
            Return to Court
          </button>
        </div>
      </div>
    </div>
  )
}
