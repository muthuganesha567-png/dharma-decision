import { useGame } from '../game/context'
import { LotusDivider, Icon } from '../components/ui'
import { sfx } from '../game/audio'

export default function MainMenu({ go }) {
  const { state } = useGame()
  const arjuna = state.chapters?.arjuna
  const inProgress = arjuna && arjuna.status !== 'completed' && (arjuna.path?.length || 0) > 0
  const completed = arjuna?.status === 'completed'

  const startJourney = () => {
    sfx('conch', state.muted)
    go('game', { mode: 'chapter', chapterId: 'arjuna' })
  }

  return (
    <div className="menu cinematic-menu">
      {/* Cinematic full-screen photo backdrop — real kurukshetra-dawn.jpg */}
      <div className="menu-photo-bg" aria-hidden="true">
        <img
          src="/assets/scenes/kurukshetra-dawn.jpg"
          alt=""
          className="menu-bg-img"
          draggable="false"
        />
        <div className="menu-bg-dust" />
        <div className="menu-bg-vignette" />
        <div className="menu-bg-gradient-bottom" />
      </div>

      {/* Animated ambient gold particles drifting upward */}
      <div className="menu-particles" aria-hidden="true">
        {Array.from({ length: 14 }).map((_, i) => (
          <div key={i} className="menu-particle" style={{
            left: `${(i * 7 + 5) % 100}%`,
            animationDelay: `${i * 0.55}s`,
            animationDuration: `${7 + (i % 5) * 1.5}s`,
          }} />
        ))}
      </div>

      <div className="menu-foreground fade-in">
        {/* Top kicker with ornament lines */}
        <div className="menu-kicker">
          <span className="ornament-line" />
          <span>Kurukshetra · The Field of Dharma</span>
          <span className="ornament-line" />
        </div>

        {/* Giant cinematic title */}
        <h1 className="menu-title">
          <span className="menu-title-word">Dharma</span>
          <span className="menu-title-word">Decision</span>
        </h1>

        {/* Mandatory subtitle — per spec */}
        <p className="menu-subtitle">
          AN AI-BASED ETHICAL DECISION-MAKING SIMULATOR
        </p>

        <p className="menu-tagline">
          <em>Every choice shapes your path.</em>
        </p>

        <LotusDivider />

        <div className="menu-btns royal-controls">
          <button className="royal-btn primary" onClick={startJourney}>
            <span className="rb-glow" />
            <span className="rb-inner">
              <span className="rb-icon">
                <Icon name="bow" size={20} />
              </span>
              <span className="rb-text">
                <span className="rb-title">
                  {inProgress ? 'CONTINUE JOURNEY' : 'BEGIN JOURNEY'}
                </span>
                <span className="rb-sub">
                  {completed
                    ? "Chapter I complete \u2014 Replay The Archer\u2019s Dharma"
                    : inProgress
                      ? `Chapter I \u2014 The Archer\u2019s Dharma \u00b7 ${arjuna.path.length}/4 decisions made`
                      : "Chapter I \u2014 Arjuna\u2019s Dilemma"}
                </span>
              </span>
              <Icon name="arrow" size={18} className="rb-arrow" />
            </span>
          </button>

          <button className="royal-btn" onClick={() => go('chapters')}>
            <span className="rb-inner">
              <span className="rb-icon">
                <Icon name="crown" size={18} />
              </span>
              <span className="rb-text">
                <span className="rb-title">MAHABHARATA CHRONICLES</span>
                <span className="rb-sub">Five character journeys \u00b7 Duty, loyalty, truth &amp; strategy</span>
              </span>
              <Icon name="arrow" size={16} className="rb-arrow" />
            </span>
          </button>

          <button className="royal-btn" onClick={() => go('modern')}>
            <span className="rb-inner">
              <span className="rb-icon">
                <Icon name="scale" size={18} />
              </span>
              <span className="rb-text">
                <span className="rb-title">MODERN DILEMMAS</span>
                <span className="rb-sub">Eight contemporary scenarios tested against epic principles</span>
              </span>
              <Icon name="arrow" size={16} className="rb-arrow" />
            </span>
          </button>

          <button className="royal-btn" onClick={() => go('dashboard')}>
            <span className="rb-inner">
              <span className="rb-icon">
                <Icon name="spark" size={18} />
              </span>
              <span className="rb-text">
                <span className="rb-title">MY DHARMA</span>
                <span className="rb-sub">Decision profile, radar chart, relationships &amp; achievements</span>
              </span>
              <Icon name="arrow" size={16} className="rb-arrow" />
            </span>
          </button>

          <button className="royal-btn ghost-btn" onClick={() => go('howto')}>
            <span className="rb-inner">
              <span className="rb-icon">
                <Icon name="scroll" size={17} />
              </span>
              <span className="rb-text">
                <span className="rb-title">HOW TO PLAY</span>
                <span className="rb-sub">The narrative loop, scoring rubric &amp; ethical framework</span>
              </span>
              <Icon name="arrow" size={15} className="rb-arrow" />
            </span>
          </button>
        </div>

        <div className="menu-stats-strip">
          <div className="strip-item">
            <Icon name="check" size={14} />
            <span>{new Set(state.history.map((h) => h.scenarioId)).size} dilemmas resolved</span>
          </div>
          <span className="strip-dot">&middot;</span>
          <div className="strip-item">
            <Icon name="star" size={14} />
            <span>{Object.keys(state.achievements).length} / 6 achievements unlocked</span>
          </div>
          <span className="strip-dot">&middot;</span>
          <div className="strip-item">
            <span className="strip-score-val">{state.score}</span>
            <span>Dharma Score</span>
          </div>
        </div>

        <div className="menu-footer">
          Dharma Decision: An AI-Based Ethical Decision-Making Simulator Inspired by Strategic Lessons from the Mahabharata
        </div>
      </div>
    </div>
  )
}
