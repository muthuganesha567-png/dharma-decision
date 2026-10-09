import { ATTRS } from '../data'
import { Icon, LotusDivider } from '../components/ui'

const LOOP = [
  ['Cinematic Scene', 'Enter the ancient world — behold Kurukshetra at dawn, royal council chambers, or nocturnal battle tents.'],
  ['Character Dialogue', 'Engage directly with legendary figures — Krishna, Bhishma, Drona, Yudhishthira — through animated dialogue beats.'],
  ['Player Decision', 'Weigh difficult tradeoffs across four illustrated royal choices, or write your own answer in free text.'],
  ['Branching Consequence', 'Experience immediate narrative repercussions: character reactions, attribute shifts, and relationship impacts.'],
  ['Wisdom & Counsel', 'Study authentic strategic principles from the epic alongside Krishna’s Counsel ethical analysis.'],
  ['Ending & Dharma Profile', 'Reach one of several distinct branch endings and receive your holistic Dharma Decision Profile.']
]

export default function HowTo({ go }) {
  return (
    <div className="page narrow">
      <div className="page-head">
        <div className="page-kicker">Rules of Engagement</div>
        <h2 className="page-title">How to Play Dharma Decision</h2>
        <p className="page-lede">
          Dharma Decision is an interactive narrative game, not a quiz or survey. There are no &ldquo;correct&rdquo; answers to memorize. You are placed directly inside the ethical crises of the epic, where every duty pulls against another and every choice carries an invoice.
        </p>
      </div>

      <section className="howto-section royal-manuscript">
        <h3>The Gameplay Loop</h3>
        <ol className="loop-list">
          {LOOP.map(([k, v], i) => (
            <li key={k}>
              <span className="loop-num">{i + 1}</span>
              <span className="loop-body">
                <strong>{k}</strong> — {v}
              </span>
            </li>
          ))}
        </ol>
      </section>

      <LotusDivider />

      <section className="howto-section">
        <h3>The Six Attributes</h3>
        <div className="attr-blurb-grid">
          {ATTRS.map((a) => (
            <div className="attr-blurb" key={a.key}>
              <span className="attr-blurb-icon" style={{ color: a.color }}>
                <Icon name={a.icon} size={17} />
              </span>
              <div>
                <div className="attr-blurb-name">{a.label}</div>
                <div className="attr-blurb-text">{a.blurb}</div>
              </div>
            </div>
          ))}
        </div>
        <p className="howto-note">
          Every choice moves several attributes at once — often in opposite directions. Gaining
          Strategy may cost Compassion; buying Integrity may delay the war. That tension is the
          game.
        </p>
      </section>

      <section className="howto-section">
        <h3>The Dharma Score</h3>
        <p>
          Your <strong>Dharma Decision Score (0–100)</strong> is the average of your six attributes
          under this game&rsquo;s predefined evaluation rubric. It is a mirror of your decision
          style — <em>not an objective measurement of morality</em>. Two very different leaders can
          both finish above 80, shaped differently.
        </p>
      </section>

      <section className="howto-section">
        <h3>Branching</h3>
        <p>
          In Arjuna&rsquo;s chapter, your first decision opens three different roads — the battle
          road, the counsel road, and the peace road — each with its own scene, dilemma and tone.
          All roads reconverge at the war council, and your final profile selects one of several
          endings. Other chapters will branch their own ways.
        </p>
      </section>

      <section className="howto-section">
        <h3>Free-Text Decisions</h3>
        <p>
          On any decision screen you may answer in your own words instead of picking a card. In
          this prototype your text is analyzed locally by keyword heuristics and matched to the
          nearest canonical path. In the API-connected version, an LLM reads your reasoning and
          responds with a full analysis — and the story continues from your own judgment.
        </p>
      </section>

      <section className="howto-section">
        <h3>AI Decision Analysis</h3>
        <p>
          After each decision you receive two separate things: your <strong>rubric score</strong>{' '}
          (pure game logic, visible attribute changes) and an <strong>AI explanation layer</strong>{' '}
          (why the rubric reacted as it did). In this build the AI layer is simulated by local
          rules; the backend exposes <code>/api/ai/analyze</code> as the integration point for a
          real LLM.
        </p>
      </section>

      <section className="howto-section">
        <h3>Saving</h3>
        <p>
          Progress saves automatically in your browser, and syncs to the server when the API is
          connected. You can reset everything from the My Dharma dashboard.
        </p>
        <p className="howto-note">
          The Mahabharata is a many-voiced epic; these readings are one lens for learning
          decision-making, not a definitive theological account.
        </p>
      </section>

      <div className="btn-row">
        <button className="btn gold" onClick={() => go('game', { mode: 'chapter', chapterId: 'arjuna' })}>
          Begin the journey <Icon name="arrow" size={15} />
        </button>
        <button className="btn ghost" onClick={() => go('menu')}>
          Back to court
        </button>
      </div>
    </div>
  )
}
