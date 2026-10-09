"""
Dharma Decision — Flask backend
================================
Serves the built React frontend (backend/static) and provides a small API:

  GET    /api/health              service + AI connection status
  GET    /api/data/chapters       scenario data (Mahabharata chapters)
  GET    /api/data/modern         scenario data (Modern Dilemmas)
  POST   /api/save                persist player progress to SQLite
  GET    /api/save/<session_id>   load player progress
  DELETE /api/save/<session_id>   erase player progress
  POST   /api/decisions           append-only decision log (analytics)
  GET    /api/stats               aggregate decision analytics
  POST   /api/ai/analyze          AI analysis endpoint (mock/heuristic now,
                                  LLM-ready — see ai.py)

The game is fully playable offline (the React client embeds the same JSON
data and falls back to localStorage); this backend adds persistence,
analytics and the future AI integration point.
"""

import os
from flask import Flask, jsonify, request, send_from_directory
from werkzeug.exceptions import BadRequest

import db
import ai as ai_engine
import voice as voice_engine

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
STATIC_DIR = os.path.join(BASE_DIR, "static")
DATA_DIR = os.path.join(BASE_DIR, "data")

app = Flask(__name__, static_folder=STATIC_DIR, static_url_path="")
db.init_db()


# ---------------------------------------------------------------- static SPA

@app.get("/")
def index():
    resp = send_from_directory(STATIC_DIR, "index.html")
    resp.headers["Cache-Control"] = "no-cache"
    return resp


@app.get("/<path:path>")
def static_files(path):
    full = os.path.join(STATIC_DIR, path)
    if os.path.isfile(full):
        return send_from_directory(STATIC_DIR, path)
    # SPA fallback
    return index()


# ---------------------------------------------------------------------- data

@app.get("/api/data/<name>")
def get_data(name):
    safe = {"chapters", "modern"}
    if name not in safe:
        return jsonify({"error": "unknown dataset"}), 404
    return send_from_directory(DATA_DIR, f"{name}.json")


# ------------------------------------------------------------------- saves

@app.post("/api/save")
def save_state():
    payload = request.get_json(silent=True) or {}
    session_id = payload.get("sessionId")
    state = payload.get("state")
    if not session_id or state is None:
        return jsonify({"error": "sessionId and state required"}), 400
    db.save_state(session_id, state)
    return jsonify({"ok": True})


@app.get("/api/save/<session_id>")
def load_state(session_id):
    state = db.load_state(session_id)
    return jsonify({"state": state})


@app.delete("/api/save/<session_id>")
def delete_state(session_id):
    db.delete_state(session_id)
    return jsonify({"ok": True})


# -------------------------------------------------------------- decisions log

@app.post("/api/decisions")
def log_decision():
    payload = request.get_json(silent=True) or {}
    required = ("sessionId", "scenarioId")
    if any(not payload.get(k) for k in required):
        return jsonify({"error": "sessionId and scenarioId required"}), 400
    db.log_decision(
        session_id=payload["sessionId"],
        scenario_id=payload["scenarioId"],
        mode=payload.get("mode", "unknown"),
        choice_id=payload.get("choiceId"),
        free_text=payload.get("freeText"),
        deltas=payload.get("deltas"),
        score_after=payload.get("scoreAfter"),
    )
    return jsonify({"ok": True})


@app.get("/api/stats")
def stats():
    return jsonify(db.aggregate_stats())


# ----------------------------------------------------------------- AI layer

@app.post("/api/ai/analyze")
def ai_analyze():
    """
    AI decision analysis endpoint.

    Prototype: local rule-based heuristic (ai.analyze_local).
    Connected mode: set DHARMA_LLM_API_KEY (and optionally DHARMA_LLM_URL /
    DHARMA_LLM_MODEL) and this endpoint will forward the player's free-text
    decision to an LLM for a full ethical reading. See backend/ai.py for the
    integration point — no client changes are needed to switch it on.
    """
    try:
        payload = request.get_json(force=True)
    except BadRequest:
        return jsonify({"error": "invalid json"}), 400

    text = (payload.get("text") or "").strip()
    scenario_id = payload.get("scenarioId")
    choices = payload.get("choices") or []

    if ai_engine.llm_configured():
        result = ai_engine.analyze_llm(text, scenario_id, choices)
        if result is not None:
            return jsonify(result)

    return jsonify(ai_engine.analyze_local(text, choices))


# ----------------------------------------------------------------- Voice layer

@app.post("/api/voice/speak")
def voice_speak():
    """
    Voice synthesis endpoint.
    Calls neural TTS if configured (ElevenLabs / OpenAI), else returns fallback signal.
    """
    payload = request.get_json(silent=True) or {}
    text = payload.get("text", "").strip()
    character_id = payload.get("characterId", "narrator")
    emotion = payload.get("emotion")

    result = voice_engine.synthesize_voice(text, character_id, emotion)
    return jsonify(result)


@app.get("/api/voice/audio/<cache_key>")
def get_cached_audio(cache_key):
    path = voice_engine.get_cached_file_path(cache_key)
    if not os.path.isfile(path):
        return jsonify({"error": "audio not found"}), 404
    return send_from_directory(os.path.dirname(path), os.path.basename(path), mimetype="audio/mpeg")


@app.get("/api/health")
def health():
    return jsonify({
        "ok": True,
        "service": "dharma-decision",
        "version": "1.0.0",
        "ai": {
            "connected": ai_engine.llm_configured(),
            "engine": "llm" if ai_engine.llm_configured() else "rule-based-mock",
        },
        "voice": {
            "connected": voice_engine.tts_configured(),
            "engine": "neural-tts" if voice_engine.tts_configured() else "browser-speech-synthesis",
        },
    })


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    # Bind 0.0.0.0 so the app is reachable from outside the sandbox.
    app.run(host="0.0.0.0", port=port, debug=False, threaded=True)

