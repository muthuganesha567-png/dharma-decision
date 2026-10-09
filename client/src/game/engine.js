// Dharma Decision — pure game engine logic
// (no React, no IO — easy to unit test and to port server-side later)

import { ATTRS, ACHIEVEMENTS, INITIAL_RELATIONSHIPS } from '../data'

export const ATTRIBUTE_KEYS = ATTRS.map((a) => a.key)

export function freshState() {
  const sessionId =
    (typeof crypto !== 'undefined' && crypto.randomUUID?.()) ||
    `s-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
  return {
    version: 1,
    sessionId,
    startedAt: Date.now(),
    updatedAt: Date.now(),
    attributes: {
      fairness: 50,
      compassion: 50,
      responsibility: 50,
      integrity: 50,
      strategy: 50,
      awareness: 50,
    },
    relationships: { ...INITIAL_RELATIONSHIPS },
    score: 50,
    history: [], // {ts, mode, chapterId, scenarioId, choiceId, tag, label, freeText, scoreAfter, deltas, relDeltas}
    chapters: {}, // { [chapterId]: {status, currentNode, path: [choiceId]} }
    modern: { completed: [] },
    achievements: {}, // { [id]: timestamp }
    toasts: [],
    muted: false,
  }
}

export const clamp = (v) => Math.max(0, Math.min(100, Math.round(v)))

export function applyEffects(attrs, effects = {}) {
  const out = { ...attrs }
  for (const [k, v] of Object.entries(effects)) {
    if (k in out) out[k] = clamp((out[k] ?? 50) + v)
  }
  return out
}

export function applyRelationshipEffects(rels = {}, effects = {}) {
  const out = { ...INITIAL_RELATIONSHIPS, ...rels }
  for (const [k, v] of Object.entries(effects)) {
    if (k in out) out[k] = clamp((out[k] ?? 50) + v)
  }
  return out
}

export function computeScore(attrs) {
  const keys = ATTRIBUTE_KEYS
  const sum = keys.reduce((s, k) => s + (attrs[k] ?? 50), 0)
  return clamp(sum / keys.length)
}

/** Count of distinct scenarios the player has resolved (any mode). */
export function scenariosCompleted(state) {
  return new Set(state.history.map((h) => h.scenarioId)).size
}

/** Evaluate all achievements against a state; returns newly-unlocked defs. */
export function evaluateAchievements(state) {
  const unlocked = []
  for (const def of ACHIEVEMENTS) {
    if (!state.achievements[def.id]) {
      let ok = false
      try {
        ok = !!def.check(state)
      } catch {
        ok = false
      }
      if (ok) unlocked.push(def)
    }
  }
  return unlocked
}

// ------------------------------------------------------------- endings

function conditionsMatch(c, attrs, score) {
  if (!c || (Array.isArray(c) && c.length === 0)) return true
  if (c.allAtLeast && !Object.values(attrs).every((v) => v >= c.allAtLeast)) return false
  if (c.minScore && score < c.minScore) return false
  if (c.minTrait) {
    for (const [k, v] of Object.entries(c.minTrait)) if ((attrs[k] ?? 0) < v) return false
  }
  if (c.maxTrait) {
    for (const [k, v] of Object.entries(c.maxTrait)) if ((attrs[k] ?? 0) >= v) return false
  }
  if (c.topTrait) {
    const topVal = Math.max(...Object.values(attrs))
    if (attrs[c.topTrait] !== topVal) return false
  }
  return true
}

/** Pick the first ending whose conditions match the player profile. */
export function pickEnding(endings, attrs, score) {
  for (const e of endings) {
    if (conditionsMatch(e.conditions, attrs, score)) return e
  }
  return endings[endings.length - 1]
}
