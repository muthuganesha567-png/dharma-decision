import { useState } from 'react'
import { useGame } from '../game/context'
import { Icon, LotusDivider } from '../components/ui'
import { CharacterPortrait } from '../components/CharacterPortrait'
import { CHAPTERS, JOURNEY_WAYPOINTS, CHARACTERS } from '../data'
import { sfx } from '../game/audio'

const ROMAN = { 1: 'I', 2: 'II', 3: 'III', 4: 'IV', 5: 'V' }

export default function ChapterSelect({ go }) {
  const { state, dispatch } = useGame()
  const [selectedChapter, setSelectedChapter] = useState(null)

  const enter = (ch) => {
    sfx('conch', state.muted)
    const saved = state.chapters[ch.id]
    dispatch({ type: 'startChapter', chapterId: ch.id, nodeId: saved?.currentNode || ch.startNode })
    go('game', { mode: 'chapter', chapterId: ch.id })
  }

  return (
    <div className="page chapter-chronicles-page">
      <div className="page-head">
        <div className="page-kicker">Mahabharata Chronicles</div>
        <h2 className="page-title">The Epic Journey Map</h2>
        <p className="page-lede">
          From the golden throne of Hastinapura to the bloodied dust of Kurukshetra — follow the path of destiny and test your moral resolve across five character journeys.
        </p>
      </div>

      {/* -------------------- VERTICAL / CURVED JOURNEY MAP -------------------- */}
      <section className="journey-map-section">
        <div className="journey-map-header">
          <Icon name="compass" size={17} />
          <span>The Path of Destiny</span>
        </div>

        <div className="journey-timeline">
          {JOURNEY_WAYPOINTS.map((wp, i) => {
            const isActive = wp.id === 'kurukshetra'
            const isPast = wp.status === 'past'
            return (
              <div
                key={wp.id}
                className={`journey-node ${isActive ? 'active' : ''} ${isPast ? 'past' : ''}`}
              >
                <div className="journey-node-line" />
                <div className="journey-node-marker">
                  <Icon name={wp.icon} size={15} />
                </div>
                <div className="journey-node-info">
                  <div className="journey-node-title">
                    {wp.title}
                    {isActive && <span className="active-badge">Active Realm</span>}
                  </div>
                  <div className="journey-node-subtitle">{wp.subtitle}</div>
                  <p className="journey-node-summary">{wp.summary}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <LotusDivider />

      {/* -------------------- CHARACTER CHAPTERS -------------------- */}
      <div className="chapter-cards-head">
        <h3 className="section-title">Character Chapters</h3>
        <p className="section-sub">Select a chapter to examine its philosophical principle and begin the journey.</p>
      </div>

      <div className="chapter-grid">
        {CHAPTERS.map((ch) => {
          const saved = state.chapters[ch.id]
          const locked = ch.status !== 'playable'
          const done = saved?.status === 'completed'
          const started = saved && (saved.path?.length || 0) > 0
          const progress = Math.min(1, (saved?.path?.length || 0) / (ch.decisionsRequired || 4))
          const charMeta = CHARACTERS[ch.id] || {}

          return (
            <article
              key={ch.id}
              className={`chapter-card ${locked ? 'locked' : 'playable'} ${done ? 'done' : ''} ${started ? 'in-progress' : ''}`}
              onClick={() => setSelectedChapter(ch)}
            >
              <div className="chapter-card-top">
                <CharacterPortrait characterId={ch.id} size={64} emotion="resolute" />
                <div className="chapter-header-text">
                  <div className="chapter-num">Chapter {ROMAN[ch.order]}</div>
                  <h3 className="chapter-name">{ch.character}</h3>
                  <div className="chapter-title">{ch.title}</div>
                </div>

                {locked ? (
                  <span className="lock-badge" title="Under scribal composition">
                    <Icon name="lock" size={12} /> Locked
                  </span>
                ) : done ? (
                  <span className="done-badge">
                    <Icon name="check" size={12} /> Complete
                  </span>
                ) : started ? (
                  <span className="progress-badge">{Math.round(progress * 100)}%</span>
                ) : (
                  <span className="progress-badge open">Ready</span>
                )}
              </div>

              <div className="chapter-theme-row">
                <span className="theme-label">Theme:</span> {ch.theme}
              </div>

              <p className="chapter-line">&ldquo;{ch.card?.line}&rdquo;</p>

              {locked ? (
                <div className="chapter-locked-info">
                  <p className="chapter-teaser">{ch.teaser}</p>
                  <button className="btn ghost sm" onClick={(e) => { e.stopPropagation(); setSelectedChapter(ch); }}>
                    View Lore & Principle
                  </button>
                </div>
              ) : (
                <div className="chapter-active-info">
                  <div className="chapter-progress">
                    <div className="chapter-progress-fill" style={{ width: `${progress * 100}%` }} />
                  </div>
                  <button
                    className="btn gold"
                    onClick={(e) => {
                      e.stopPropagation()
                      enter(ch)
                    }}
                  >
                    {started ? 'Resume Journey' : 'Begin Journey'}
                    <Icon name="arrow" size={15} />
                  </button>
                </div>
              )}
            </article>
          )
        })}
      </div>

      {/* -------------------- CHAPTER DETAIL MODAL / DRAWER -------------------- */}
      {selectedChapter && (
        <div className="modal-backdrop fade-in" onClick={() => setSelectedChapter(null)}>
          <div className="modal-card royal-parchment pop-in" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedChapter(null)} aria-label="Close">
              ×
            </button>

            <div className="modal-top">
              <CharacterPortrait characterId={selectedChapter.id} size={90} emotion="calm" />
              <div>
                <div className="modal-chapter-tag">
                  Chapter {ROMAN[selectedChapter.order]} · {selectedChapter.character}
                </div>
                <h3 className="modal-chapter-title">{selectedChapter.title}</h3>
                <div className="modal-chapter-theme">{selectedChapter.theme}</div>
              </div>
            </div>

            <LotusDivider />

            <div className="modal-body">
              <div className="modal-quote">
                &ldquo;{selectedChapter.card?.quote || selectedChapter.card?.line}&rdquo;
              </div>

              <div className="modal-section">
                <div className="modal-label">The Central Dilemma</div>
                <p>{selectedChapter.teaser || selectedChapter.card?.line}</p>
              </div>

              <div className="modal-section">
                <div className="modal-label">Character Principle</div>
                <p>
                  {CHARACTERS[selectedChapter.id]?.bio ||
                    'A study in duty, restraint, and the difficult art of ethical decision-making.'}
                </p>
              </div>

              {selectedChapter.status !== 'playable' ? (
                <div className="modal-locked-banner">
                  <Icon name="lock" size={15} />
                  <span>
                    This chronicle is currently being transcribed. You must first master Chapter I: Arjuna&rsquo;s Dilemma to unlock further lessons.
                  </span>
                </div>
              ) : (
                <div className="modal-action-row">
                  <button className="btn gold lg" onClick={() => enter(selectedChapter)}>
                    Enter Chapter I <Icon name="arrow" size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
