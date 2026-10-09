import { useState } from 'react'
import { useGame } from '../game/context'
import { ATTRS, ACHIEVEMENTS, CHAPTERS, MODERN, CHARACTERS } from '../data'
import { Radar, NumberTicker, Icon, LotusDivider } from '../components/ui'
import { CharacterPortrait } from '../components/CharacterPortrait'
import { scenariosCompleted } from '../game/engine'
import { clearLocal, wipeServer } from '../game/store'
import { sfx } from '../game/audio'

export default function Dashboard({ go }) {
  const { state, dispatch } = useGame()
  const [confirmReset, setConfirmReset] = useState(false)

  const currentChapter =
    Object.entries(state.chapters).find(([, c]) => c.status === 'in_progress')?.[0] || null
  const currentChapterName = currentChapter
    ? CHAPTERS.find((c) => c.id === currentChapter)?.title
    : state.history.length
      ? 'Between journeys'
      : 'Not yet begun'

  const scores = state.history.map((h) => h.scoreAfter)
  const best = scores.length ? Math.max(...scores) : null
  const avg = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : null
  const unlocked = Object.keys(state.achievements)
  const chaptersCompletedCount = Object.values(state.chapters).filter((c) => c.status === 'completed').length

  const reset = async () => {
    await wipeServer(state.sessionId)
    clearLocal()
    dispatch({ type: 'reset' })
    setConfirmReset(false)
    sfx('page', state.muted)
  }

  return (
    <div className="page royal-manuscript-page">
      <div className="page-head">
        <div className="page-kicker">
          <span className="ornament-line" />
          <span>My Dharma · The Royal Ledger of Conscience</span>
          <span className="ornament-line" />
        </div>
        <h2 className="page-title">Your Decision Profile</h2>
        <p className="page-lede">
          A living chronicle of your moral and strategic choices across the Mahabharata and contemporary realms.
          The Dharma Score is a reflection of your decision style under the game&rsquo;s predefined rubric — not an objective measurement of morality.
        </p>
      </div>

      <div className="dash-grid">
        {/* Radar and Core Profile Panel */}
        <section className="panel royal-manuscript radar-panel">
          <div className="manuscript-seal-top">
            <Icon name="scale" size={20} />
            <span>Decision Profile</span>
          </div>

          <div className="radar-wrap">
            <Radar attrs={state.attributes} size={300} />
          </div>

          <div className="score-hero">
            <div className="score-hero-num">
              <NumberTicker value={state.score} />
              <span className="score-of">/ 100</span>
            </div>
            <div className="score-hero-label">Dharma Score</div>
            <div className="score-hero-sub">Balanced reflection across all six ethical traits</div>
          </div>

          <LotusDivider />

          <div className="attr-mini-grid">
            {ATTRS.map((a) => (
              <div className="attr-mini" key={a.key}>
                <div className="attr-mini-head">
                  <span className="attr-mini-icon" style={{ color: a.color }}>
                    <Icon name={a.icon} size={15} />
                  </span>
                  <span className="attr-mini-name">{a.label}</span>
                </div>
                <span className="attr-mini-val" style={{ color: a.color }}>
                  {state.attributes[a.key]}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Journey Statistics and Character Relationships Column */}
        <div className="dash-col">
          {/* Character Relationships Standing */}
          <section className="panel royal-manuscript">
            <div className="manuscript-seal-top">
              <Icon name="users" size={18} />
              <span>Character Relationships</span>
            </div>
            <p className="panel-sub">
              How the principal figures of the epic evaluate your loyalty, integrity, and strategic clarity.
            </p>

            <div className="rel-grid-dash">
              {Object.entries(state.relationships || {}).map(([charId, val]) => {
                const c = CHARACTERS[charId] || { name: charId, title: '' }
                return (
                  <div className="rel-dash-card" key={charId}>
                    <CharacterPortrait characterId={charId} size={50} emotion="calm" />
                    <div className="rel-dash-info">
                      <div className="rel-dash-name">{c.name}</div>
                      <div className="rel-dash-role">{c.title}</div>
                      <div className="rel-dash-track">
                        <div
                          className="rel-dash-fill"
                          style={{ width: `${val}%`, backgroundColor: c.color }}
                        />
                      </div>
                    </div>
                    <div className="rel-dash-num">{val}</div>
                  </div>
                )
              })}
            </div>
          </section>

          {/* Journey Metrics */}
          <section className="panel royal-manuscript">
            <div className="manuscript-seal-top">
              <Icon name="compass" size={18} />
              <span>Journey Records</span>
            </div>

            <div className="stat-grid">
              <div className="stat-card">
                <div className="stat-num">{scenariosCompleted(state)}</div>
                <div className="stat-label">Scenarios resolved</div>
              </div>
              <div className="stat-card">
                <div className="stat-num">{chaptersCompletedCount} / {CHAPTERS.length}</div>
                <div className="stat-label">Chapters complete</div>
              </div>
              <div className="stat-card">
                <div className="stat-num">{best ?? '—'}</div>
                <div className="stat-label">Highest score</div>
              </div>
              <div className="stat-card">
                <div className="stat-num">{avg ?? '—'}</div>
                <div className="stat-label">Average score</div>
              </div>
              <div className="stat-card">
                <div className="stat-num small">{currentChapterName}</div>
                <div className="stat-label">Active realm</div>
              </div>
              <div className="stat-card">
                <div className="stat-num">{state.modern.completed.length}/{MODERN.length}</div>
                <div className="stat-label">Modern dilemmas</div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Ancient Royal Achievements */}
      <section className="panel royal-manuscript">
        <div className="manuscript-seal-top">
          <Icon name="star" size={18} />
          <span>Royal Seals & Achievements</span>
        </div>
        <p className="panel-sub">Honors conferred for principled action under extreme pressure.</p>

        <div className="ach-grid">
          {ACHIEVEMENTS.map((a) => {
            const has = state.achievements[a.id]
            return (
              <div className={`ach-card royal-seal ${has ? 'unlocked' : ''}`} key={a.id} title={a.desc}>
                <span className="ach-icon">
                  <Icon name={a.icon} size={22} />
                </span>
                <div>
                  <div className="ach-title">{a.title}</div>
                  <div className="ach-desc">{a.desc}</div>
                  {has && <span className="ach-earned-tag">Conferred</span>}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Decision Log Ledger */}
      <section className="panel royal-manuscript">
        <div className="manuscript-seal-top">
          <Icon name="scroll" size={18} />
          <span>Chronicle of Decisions</span>
        </div>

        {state.history.length === 0 ? (
          <p className="empty-log">
            No decisions have yet been entered into the royal register. Begin your journey to write your chronicle.
          </p>
        ) : (
          <ul className="log-list">
            {[...state.history]
              .slice(-10)
              .reverse()
              .map((h, i) => (
                <li className="log-item" key={h.ts + '' + i}>
                  <span className={`log-mode ${h.mode}`}>{h.mode === 'modern' ? 'Modern' : 'Epic'}</span>
                  <span className="log-label">
                    {h.freeText ? (
                      <>
                        &ldquo;{h.freeText.slice(0, 80)}
                        {h.freeText.length > 80 ? '…' : ''}&rdquo;{' '}
                        <em className="log-ft">(Unscripted reasoning → {h.tag || h.choiceId})</em>
                      </>
                    ) : (
                      <>
                        <strong>{h.tag}:</strong> {h.label}
                      </>
                    )}
                  </span>
                  <span className="log-score">{h.scoreAfter}</span>
                </li>
              ))}
          </ul>
        )}
      </section>

      {/* Controls row */}
      <div className="btn-row space-between wrap">
        <div className="btn-row">
          <button className="btn gold" onClick={() => go('game', { mode: 'chapter', chapterId: 'arjuna' })}>
            Continue Arjuna&rsquo;s Dilemma <Icon name="arrow" size={15} />
          </button>
          <button className="btn ghost" onClick={() => go('modern')}>
            Modern Dilemmas
          </button>
          <button className="btn ghost" onClick={() => go('chapters')}>
            Chapter Map
          </button>
        </div>

        <div>
          {!confirmReset ? (
            <button className="btn ghost danger-sm" onClick={() => setConfirmReset(true)}>
              Reset Journal
            </button>
          ) : (
            <div className="confirm-reset-row">
              <span>Erase all saved progress?</span>
              <button className="btn danger sm" onClick={reset}>
                Confirm Erase
              </button>
              <button className="btn ghost sm" onClick={() => setConfirmReset(false)}>
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
