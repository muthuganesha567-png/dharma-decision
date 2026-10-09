// Persistence: localStorage always; optional SQLite sync when the Flask
// backend is reachable. Every network call fails soft.

const KEY = 'dharma_decision_save_v1'

export function loadLocal() {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function saveLocal(state) {
  try {
    localStorage.setItem(KEY, JSON.stringify({ ...state, updatedAt: Date.now() }))
  } catch {
    /* private mode etc. */
  }
}

export function clearLocal() {
  try {
    localStorage.removeItem(KEY)
  } catch {}
}

export async function syncToServer(state) {
  try {
    await fetch('/api/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId: state.sessionId, state: { ...state, updatedAt: Date.now() } }),
    })
  } catch {
    /* offline / static mode */
  }
}

export async function pullFromServer(sessionId) {
  try {
    const res = await fetch(`/api/save/${encodeURIComponent(sessionId)}`)
    if (!res.ok) return null
    const json = await res.json()
    return json?.state || null
  } catch {
    return null
  }
}

export async function wipeServer(sessionId) {
  try {
    await fetch(`/api/save/${encodeURIComponent(sessionId)}`, { method: 'DELETE' })
  } catch {}
}

export async function logDecisionRemote(payload) {
  try {
    await fetch('/api/decisions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
  } catch {}
}
