
import os, hashlib, json, urllib.request, urllib.error

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CACHE_DIR = os.path.join(BASE_DIR, "data", "audio_cache")
os.makedirs(CACHE_DIR, exist_ok=True)

VOICE_PROFILES = {
    "krishna": {"elevenlabs_id": "ErXwobaYiN019PkySvjV", "openai_voice": "onyx", "name": "Krishna (Divine Guide)", "timbre": "warm, calm, authoritative"},
    "arjuna": {"elevenlabs_id": "VR6AewLTigWG4xSOukaG", "openai_voice": "echo", "name": "Arjuna (Kshatriya Warrior)", "timbre": "focused, passionate, conflicted"},
    "narrator": {"elevenlabs_id": "onwK4e9ZLuTAKqWW03F9", "openai_voice": "fable", "name": "Epic Storyteller", "timbre": "deep, resonant, cinematic"},
    "bhishma": {"elevenlabs_id": "N2lVS1w4EtoT3dr4eOWO", "openai_voice": "onyx", "name": "Bhishma", "timbre": "grave, venerable"},
    "drona": {"elevenlabs_id": "IKne3meq5aSn9XLYUdCD", "openai_voice": "echo", "name": "Dronacharya", "timbre": "commanding, stern"}
}

def tts_configured() -> bool:
    return bool(os.environ.get("ELEVENLABS_API_KEY") or os.environ.get("OPENAI_API_KEY") or os.environ.get("DHARMA_TTS_API_KEY"))

def get_cache_key(text: str, character_id: str, emotion: str = None) -> str:
    payload = f"{character_id}:{emotion or 'neutral'}:{text.strip()}"
    return hashlib.sha256(payload.encode('utf-8')).hexdigest()[:16]

def get_cached_file_path(cache_key: str) -> str:
    return os.path.join(CACHE_DIR, f"{cache_key}.mp3")

def synthesize_voice(text: str, character_id: str = "narrator", emotion: str = None) -> dict:
    if not text or not text.strip():
        return {"ok": False, "error": "empty text"}
    char_key = (character_id or "narrator").lower()
    cache_key = get_cache_key(text, char_key, emotion)
    cached_file = get_cached_file_path(cache_key)
    if os.path.isfile(cached_file) and os.path.getsize(cached_file) > 1000:
        return {"ok": True, "cached": True, "audioUrl": f"/api/voice/audio/{cache_key}", "character": char_key, "engine": "neural-cache"}
    openai_key = os.environ.get("OPENAI_API_KEY") or os.environ.get("DHARMA_TTS_API_KEY")
    eleven_key = os.environ.get("ELEVENLABS_API_KEY")
    profile = VOICE_PROFILES.get(char_key, VOICE_PROFILES["narrator"])
    if eleven_key:
        voice_id = profile.get("elevenlabs_id", "onwK4e9ZLuTAKqWW33F9")
        url = f"https://api.elevenlabs.io/v1/text-to-speech/{voice_id}"
        headers = {"xi-api-key": eleven_key, "Content-Type": "application/json"}
        body = json.dumps({"text": text, "model_id": "eleven_monolingual_v1", "voice_settings": {"stability": 0.65 if emotion == "conflicted" else 0.85, "similarity_boost": 0.75}}).encode('utf-8')
        try:
            req = urllib.request.Request(url, data=body, headers=headers, method="POST")
            with urllib.request.urlopen(req, timeout=15) as resp:
                audio = resp.read()
                with open(cached_file, "wb") as f:
                    f.write(audio)
                return {"ok": True, "cached": False, "audioUrl": f"/api/voice/audio/{cache_key}", "character": char_key, "engine": "elevenlabs"}
        except Exception:
            pass
    if openai_key:
        url = "https://api.openai.com/v1/audio/speech"
        headers = {"Authorization": f"Bearer {openai_key}", "Content-Type": "application/json"}
        body = json.dumps({"model": "tts-1", "input": text, "voice": profile.get("openai_voice", "onyx")}).encode('utf-8')
        try:
            req = urllib.request.Request(url, data=body, headers=headers, method="POST")
            with urllib.request.urlopen(req, timeout=15) as resp:
                audio = resp.read()
                with open(cached_file, "wb") as f:
                    f.write(audio)
                return {"ok": True, "cached": False, "audioUrl": f"/api/voice/audio/{cache_key}", "character": char_key, "engine": "openai-tts"}
        except Exception:
            pass
    return {
        "ok": False,
        "engine": "browser-synthesis-fallback",
        "character": char_key,
        "profile": {
            "name": profile["name"],
            "timbre": profile["timbre"]
        }
    }
