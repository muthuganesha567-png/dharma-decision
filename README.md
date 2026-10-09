# Dharma Decision

**An AI-Based Ethical Decision-Making Simulator Inspired by Strategic Lessons from the Mahabharata**

A playable, story-driven decision game — not a quiz. You are placed inside dilemmas
from the Mahabharata (and their modern echoes), you choose, the story branches, your
decision profile shifts, and the game answers with a strategic lens from the epic.

```
Story → Decision → Consequence → Score → Mahabharata Insight → Next Scenario
```

---

## Quick start

```bash
# 1) backend + built frontend (recommended)
pip install -r requirements.txt
python3 backend/app.py            # → http://localhost:8000

# 2) frontend development mode (optional, hot reload)
cd client && npm install && npm run dev

# 3) end-to-end smoke test (drives the real bundle through the full game loop)
cd client && npm i -D jsdom && npx vite build --config vite.config.smoke.js && node smoke-test.cjs
```

The production frontend is **already built** into `backend/static/`, so `python3 backend/app.py`
is all you need. The game is also fully playable without the backend (pure client-side
with localStorage) — the backend adds SQLite persistence, a decision-log API for
analytics, and the AI integration point.

---

## What's inside

| Area | Status |
|---|---|
| **Chapter I — Arjuna** ("The Archer's Dharma") | ✅ Fully playable: 4 decisions, 3 branching mid-paths (battle / counsel / peace), convergence at the War Council, 6 possible endings |
| Mahabharata Challenge | Chapter select: Arjuna playable; Karna, Krishna, Yudhishthira, Abhimanyu teased & locked |
| **Modern Dilemmas** | ✅ 8 playable scenarios — Teamwork, Academic Integrity, Social Media, Leadership, Workplace, Friendship, Crisis Management, College |
| Free-text decisions | ✅ Type your own answer on any decision screen (local heuristic + server endpoint) |
| AI Decision Analysis | ✅ Simulated rule-based layer, clearly separated from the rubric score; LLM-ready endpoint |
| My Dharma dashboard | ✅ SVG radar chart, score, stats, decision log, achievements |
| Achievements | ✅ Balanced Mind · Strategic Thinker · Compassionate Leader · Duty Bound · Dharma Seeker (+ First Steps) |

### The six attributes

Fairness · Compassion · Responsibility · Integrity · Strategy · Consequence Awareness

Every choice moves several attributes at once, often in tension. The **Dharma Decision
Score (0–100)** is their average under the game's predefined rubric — a mirror of your
decision style, *not* an objective measure of morality (the UI says so explicitly).

---

## Architecture

```
dharma-decision/
├── client/                     React 18 + Vite (modern CSS, no UI framework)
│   └── src/
│       ├── data.js             attribute + achievement metadata; imports scenario JSON
│       ├── game/
│       │   ├── engine.js       pure logic: scoring, effects, endings, achievements
│       │   ├── context.jsx     reducer store + persistence hooks
│       │   ├── store.js        localStorage + backend sync (fails soft)
│       │   ├── ai.js           client-side mock analysis + free-text heuristics
│       │   └── audio.js        tiny WebAudio feedback synth
│       ├── components/ui.jsx   icons, background/particles, radar, panels
│       └── screens/            MainMenu · ChapterSelect · Game · ModernHub · Dashboard · HowTo
├── backend/
│   ├── app.py                  Flask: serves the SPA + JSON API
│   ├── db.py                   SQLite (saves + append-only decision log)
│   ├── ai.py                   rule-based analyzer + LLM integration point
│   ├── data/
│   │   ├── chapters.json       ALL Mahabharata scenario content (data ≠ UI)
│   │   └── modern.json         ALL modern-dilemma content
│   └── static/                 production build output (vite build)
└── requirements.txt
```

### API

| Method | Route | Purpose |
|---|---|---|
| GET | `/api/health` | service + AI connection status |
| GET | `/api/data/chapters` | chapter/scenario data |
| GET | `/api/data/modern` | modern-dilemma data |
| POST | `/api/save` | persist player state (SQLite) |
| GET / DELETE | `/api/save/<sessionId>` | load / erase player state |
| POST | `/api/decisions` | append decision to the analytics log |
| GET | `/api/stats` | aggregate decision analytics |
| POST | `/api/ai/analyze` | free-text analysis (mock now, LLM later) |

### Scenario data shape (chapters.json)

```jsonc
{
  "id": "arj_1",                      // scenario ID
  "type": "decision",                 // story | decision | ending
  "character": "...",                 // via chapter
  "narrative": ["..."],               // story beats
  "prompt": "...",                    // the dilemma
  "choices": [{
    "id": "A", "label": "...", "tag": "...",
    "effects": { "responsibility": 10, "compassion": -3, ... },
    "consequence": "...",
    "insight": { "reflection": "...", "principle": "...", "source": "..." }
  }],
  "nextByChoice": { "A": "arj_2a", "B": "arj_2b" },   // branching
  "next": "arj_3"                     // convergence
}
```

### Adding content

- **A new modern dilemma** → append one object to `backend/data/modern.json`. Done.
- **A new character chapter** → add a chapter object with `nodes` (story/decision/ending),
  set `"status": "playable"` — the Chapter Select, dashboard and achievements pick it up
  automatically. `engine.js` is chapter-agnostic; endings are data-driven conditions
  (`allAtLeast`, `minScore`, `minTrait`, `maxTrait`, `topTrait`).

### Connecting a real LLM

```bash
export DHARMA_LLM_API_KEY=sk-...
export DHARMA_LLM_URL=https://api.openai.com/v1/chat/completions   # optional
export DHARMA_LLM_MODEL=gpt-4o-mini                                # optional
```

`POST /api/ai/analyze` then uses `backend/ai.py:analyze_llm()` (strict-JSON prompt,
same response contract) and the UI badge flips from *Simulated · rule-based* to
*LLM connected*. No client changes required. The endpoint falls back to the local
heuristic on any failure.

---

## Design notes

- **Visual identity**: dark royal indigo, muted gold, aged-parchment insight panels,
  chakra + temple/battlefield skyline motifs, drifting gold particles, Eczar (display)
  + Cormorant Garamond (narrative) — fonts bundled locally via Fontsource, no CDNs.
- **Charts**: the radar/profile charts are hand-rolled animated SVG (no external chart
  library needed; Chart.js can be swapped in later without touching game logic).
- **Reduced motion** and mobile layouts are respected.
- Audio: subtle synthesized WebAudio cues (select / confirm / insight / achievement),
  mutable from the header.

## Disclaimer

The Dharma Score and attribute readings are the game's own rubric — a lens for
practicing decision-making, not a judgment of you, and not a theological authority
on the Mahabharata.
