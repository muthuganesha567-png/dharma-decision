import { useGame } from '../game/context'
import { Icon, LotusDivider } from '../components/ui'
import { MODERN } from '../data'
import { sfx } from '../game/audio'

export default function ModernHub({ go, params }) {
  const { state } = useGame()
  const done = state.modern.completed
  const remaining = MODERN.filter((s) => !done.includes(s.id))
  const allDone = remaining.length === 0
  const justCompleted = params?.completed

  const play = (scen) => {
    sfx('select', state.muted)
    go('game', { mode: 'modern', scenarioId: scen.id })
  }

  const nextToPlay = remaining[0] || null

  return (
    <div className="page modern-hub-page">
      <div className="page-head">
        <div className="page-kicker">
          <span className="ornament-line" />
          <span>Contemporary Ethical Simulator</span>
          <span className="ornament-line" />
        </div>
        <h2 className="page-title">Dharma in the Modern World</h2>
        <p className="page-lede">
          The strategic and moral principles forged at Kurukshetra applied to deadlines, academic integrity, boardroom compromises, crisis management, and loyalties.
        </p>

        <div className="modern-progress-card">
          <div className="modern-progress-label">
            <span>Resolved: {done.length} of {MODERN.length} Dilemmas</span>
            <span className="modern-progress-pct">{Math.round((done.length / MODERN.length) * 100)}%</span>
          </div>
          <div className="chapter-progress wide">
            <div
              className="chapter-progress-fill"
              style={{ width: `${(done.length / MODERN.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {justCompleted && (
        <div className="hub-banner pop-in">
          <Icon name="check" size={16} />
          <span>
            Dilemma resolved and recorded to your decision profile.{' '}
            {allDone
              ? 'All eight modern scenarios have been completed!'
              : 'The next dilemma awaits your judgment below.'}
          </span>
        </div>
      )}

      {allDone && (
        <div className="hub-banner gold pop-in">
          <Icon name="star" size={16} />
          <span>
            All eight modern dilemmas resolved. Examine how your profile settled in{' '}
            <button className="linklike" onClick={() => go('dashboard')}>
              My Dharma Profile
            </button>.
          </span>
        </div>
      )}

      {!allDone && nextToPlay && (
        <button className="royal-btn primary hub-next" onClick={() => play(nextToPlay)}>
          <span className="rb-glow" />
          <span className="rb-inner">
            <span className="rb-icon">
              <Icon name={nextToPlay.icon || 'spark'} size={20} />
            </span>
            <span className="rb-text">
              <span className="rb-title">
                {justCompleted ? 'PROCEED TO NEXT DILEMMA' : done.length ? 'CONTINUE DILEMMAS' : 'BEGIN FIRST DILEMMA'} — {nextToPlay.category}
              </span>
              <span className="rb-sub">&ldquo;{nextToPlay.title}&rdquo;</span>
            </span>
            <Icon name="arrow" size={18} className="rb-arrow" />
          </span>
        </button>
      )}

      <LotusDivider />

      <div className="modern-grid">
        {MODERN.map((s, i) => {
          const resolved = done.includes(s.id)
          return (
            <button
              key={s.id}
              className={`modern-card royal-parchment ${resolved ? 'resolved' : ''}`}
              onClick={() => play(s)}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="modern-card-top">
                <span className="cat-icon">
                  <Icon name={s.icon || 'spark'} size={18} />
                </span>
                <span className="modern-cat">{s.category}</span>
                {resolved && (
                  <span className="done-badge">
                    <Icon name="check" size={11} /> Resolved
                  </span>
                )}
              </div>

              <div className="modern-title">{s.title}</div>
              <p className="modern-teaser">{s.situation[0]}</p>

              <div className="modern-card-footer">
                <span className="modern-principle-tag">
                  <Icon name="spark" size={12} /> Epic Principle Linked
                </span>
                <span className="modern-cta">{resolved ? 'Re-examine' : 'Face it'} →</span>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
