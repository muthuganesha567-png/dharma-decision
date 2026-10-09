"""
AI analysis layer for Dharma Decision.

PROTOTYPE MODE (default)
------------------------
`analyze_local` scores a free-text decision with a small keyword heuristic
and returns a provisional attribute profile plus a summary. The React client
ships an identical heuristic so the game works fully offline.

CONNECTED MODE (future)
-----------------------
Set environment variables and the same /api/ai/analyze endpoint will use an
LLM instead — no client changes required:

    DHARMA_LLM_API_KEY   required to enable
    DHARMA_LLM_URL       e.g. https://api.openai.com/v1/chat/completions
    DHARMA_LLM_MODEL     e.g. gpt-4o-mini

`analyze_llm` below is the integration point: it builds the prompt, calls the
API, and shapes the response into the same JSON contract the UI expects
(summary, provisional attributes, matched choice, explanation fields).
"""

import json
import os
import re
import urllib.request

# ----------------------------------------------------------------- lexicon

LEXICON = {
    "fairness": [
        "fair", "equal", "justice", "impartial", "both sides", "deserve",
        "balance the", "fairness", "unfair", "equally",
    ],
    "compassion": [
        "care", "help", "kind", "empath", "well-being", "wellbeing", "family",
        "support", "feel", "mercy", "forgive", "compassion", "suffer", "hurt",
    ],
    "responsibility": [
        "duty", "responsib", "must", "own it", "accountab", "commit",
        "obligation", "step up", "my role", "my fault",
    ],
    "integrity": [
        "honest", "truth", "integri", "lie", "lying", "deceit", "transparent",
        "ethic", "principle", "right thing", "admit", "confess", "wrong",
    ],
    "strategy": [
        "plan", "strateg", "negotiat", "leverage", "risk", "advantage",
        "efficient", "long game", "compromise", "stakeholder", "outcome",
        "option", "prepar",
    ],
    "awareness": [
        "consequence", "later", "long-term", "long term", "impact",
        "second-order", "downstream", "ripple", "future", "aftermath",
        "will lead to", "could cause", "affect",
    ],
}

ATTRIBUTE_KEYS = list(LEXICON.keys())


def llm_configured() -> bool:
    return bool(os.environ.get("DHARMA_LLM_API_KEY"))


# ------------------------------------------------------------ local (mock)

def analyze_local(text: str, choices=None) -> dict:
    text_low = (text or "").lower()

    provisional = {key: 50 for key in ATTRIBUTE_KEYS}
    hits = {}
    for key, words in LEXICON.items():
        count = sum(1 for w in words if w in text_low)
        hits[key] = count
        # each distinct keyword hit nudges that attribute up
        provisional[key] = max(0, min(100, 50 + 8 * min(count, 5)))

    empty = not text_low
    ranked = sorted(hits.items(), key=lambda kv: kv[1], reverse=True)
    top = [k for k, v in ranked if v > 0][:2]

    if empty:
        summary = "No reasoning text was provided, so there is nothing to analyze yet."
    elif top:
        names = " and ".join(top)
        summary = (
            f"Your reasoning emphasizes {names}. The rubric reads this as a "
            f"{top[0]}-weighted decision, and the profile below is provisional."
        )
    else:
        summary = (
            "Your reasoning is short, so the provisional profile is near-neutral. "
            "Longer reasoning gives the rubric more to work with."
        )

    matched = match_choice(text, choices) if choices else None

    return {
        "engine": "rule-based-mock",
        "llmConnected": False,
        "simulated": True,
        "summary": summary,
        "provisional": provisional,
        "matchedChoiceId": matched,
        "note": (
            "Prototype analysis runs locally on keyword heuristics. In the "
            "connected version, an LLM analyzes your own words here and this "
            "message is replaced by a full ethical reading."
        ),
    }


def match_choice(text: str, choices):
    """Return the choice id whose wording overlaps most with the free text."""
    tokens = set(re.findall(r"[a-z']{4,}", (text or "").lower()))
    best, best_score = None, 0
    for choice in choices:
        words = set(
            re.findall(
                r"[a-z']{4,}",
                f"{choice.get('label','')} {choice.get('tag','')}".lower(),
            )
        )
        stop = {"that", "this", "with", "them", "will", "your", "have", "from"}
        score = len((words - stop) & tokens)
        if score > best_score:
            best, best_score = choice.get("id"), score
    return best if best_score >= 2 else None


# ------------------------------------------------------------ LLM (future)

LLM_SYSTEM_PROMPT = (
    "You are the analysis engine of 'Dharma Decision', an ethical "
    "decision-making simulator inspired by strategic lessons from the "
    "Mahabharata. Given a player's free-text decision, reply with STRICT JSON: "
    '{"summary": str, "provisional": {fairness, compassion, responsibility, '
    "integrity, strategy, awareness} each 0-100 integers, \"matchedChoiceId\": "
    "str-or-null, \"note\": str}. The summary should name the ethical "
    "strengths and tensions of the decision in at most three sentences, in "
    "the spirit of a strategist-mentor, never moralizing."
)


def analyze_llm(text: str, scenario_id, choices):
    """Integration point for a real LLM backend. Returns None on any failure
    so the endpoint can fall back to the local heuristic."""
    api_key = os.environ.get("DHARMA_LLM_API_KEY")
    url = os.environ.get(
        "DHARMA_LLM_URL", "https://api.openai.com/v1/chat/completions"
    )
    model = os.environ.get("DHARMA_LLM_MODEL", "gpt-4o-mini")
    if not api_key or not text:
        return None

    payload = {
        "model": model,
        "temperature": 0.4,
        "response_format": {"type": "json_object"},
        "messages": [
            {"role": "system", "content": LLM_SYSTEM_PROMPT},
            {
                "role": "user",
                "content": json.dumps(
                    {"scenarioId": scenario_id, "decision": text, "choices": choices},
                    ensure_ascii=False,
                ),
            },
        ],
    }
    req = urllib.request.Request(
        url,
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json", "Authorization": f"Bearer {api_key}"},
    )
    try:
        with urllib.request.urlopen(req, timeout=20) as resp:
            body = json.loads(resp.read().decode("utf-8"))
        content = body["choices"][0]["message"]["content"]
        parsed = json.loads(content)
        provisional = {
            k: max(0, min(100, int(v)))
            for k, v in (parsed.get("provisional") or {}).items()
            if k in ATTRIBUTE_KEYS
        }
        for k in ATTRIBUTE_KEYS:
            provisional.setdefault(k, 50)
        return {
            "engine": "llm",
            "llmConnected": True,
            "simulated": False,
            "summary": parsed.get("summary", ""),
            "provisional": provisional,
            "matchedChoiceId": parsed.get("matchedChoiceId"),
            "note": "Analyzed by a connected LLM.",
        }
    except Exception:
        return None
