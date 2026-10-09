import { createContext, useContext, useEffect, useReducer } from 'react'
import { freshState, applyEffects, applyRelationshipEffects, computeScore, evaluateAchievements } from './engine'
import { loadLocal, saveLocal, syncToServer, pullFromServer } from './store'

const GameCtx = createContext(null)
export const useGame = () => useContext(GameCtx)

function init() {
  return loadLocal() || freshState()
}

function withAchievements(state) {
  const unlocked = evaluateAchievements(state)
  if (!unlocked.length) return state
  const now = Date.now()
  return {
    ...state,
    achievements: {
      ...state.achievements,
      ...Object.fromEntries(unlocked.map((u) => [u.id, now])),
    },
    toasts: [
      ...state.toasts,
      ...unlocked.map((u) => ({ id: `${u.id}:${now}`, title: u.title, desc: u.desc, icon: u.icon })),
    ],
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'hydrate':
      return { ...freshState(), ...action.state }

    case 'startChapter': {
      const { chapterId, nodeId, fresh } = action
      const prev = state.chapters[chapterId]
      const ch =
        fresh || !prev
          ? { status: 'in_progress', currentNode: nodeId, path: [] }
          : { ...prev, currentNode: nodeId ?? prev.currentNode }
      return { ...state, chapters: { ...state.chapters, [chapterId]: ch } }
    }

    case 'setNode': {
      const { chapterId, nodeId } = action
      const prev = state.chapters[chapterId]
      if (!prev || prev.currentNode === nodeId) return state
      return {
        ...state,
        chapters: { ...state.chapters, [chapterId]: { ...prev, currentNode: nodeId } },
      }
    }

    case 'commitDecision': {
      const { chapterId, scenarioId, mode, choice, freeText, nextNodeId } = action
      const attrs = applyEffects(state.attributes, choice.effects || {})
      const rels = applyRelationshipEffects(state.relationships, choice.relationshipEffects || {})
      const score = computeScore(attrs)
      const entry = {
        ts: Date.now(),
        mode,
        chapterId: chapterId || null,
        scenarioId,
        choiceId: choice.id,
        tag: choice.tag,
        label: choice.label,
        freeText: freeText || null,
        scoreAfter: score,
        deltas: choice.effects || {},
        relDeltas: choice.relationshipEffects || {},
      }
      let chapters = state.chapters
      if (chapterId) {
        const prev = chapters[chapterId] || { status: 'in_progress', path: [] }
        chapters = {
          ...chapters,
          [chapterId]: {
            ...prev,
            status: 'in_progress',
            currentNode: nextNodeId ?? prev.currentNode,
            path: [...(prev.path || []), choice.id],
          },
        }
      }
      const modern =
        mode === 'modern' && !state.modern.completed.includes(scenarioId)
          ? { completed: [...state.modern.completed, scenarioId] }
          : state.modern

      return withAchievements({
        ...state,
        attributes: attrs,
        relationships: rels,
        score,
        history: [...state.history, entry],
        chapters,
        modern,
      })
    }

    case 'completeChapter': {
      const prev = state.chapters[action.chapterId]
      if (!prev || prev.status === 'completed') return state
      return withAchievements({
        ...state,
        chapters: {
          ...state.chapters,
          [action.chapterId]: { ...prev, status: 'completed', completedAt: Date.now() },
        },
      })
    }

    case 'toggleMute':
      return { ...state, muted: !state.muted }

    case 'dismissToast':
      return { ...state, toasts: state.toasts.slice(1) }

    case 'reset':
      return freshState()

    default:
      return state
  }
}

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, init)

  // persist locally + best-effort server sync
  useEffect(() => {
    saveLocal(state)
    syncToServer(state)
  }, [state])

  // on first mount: if the server holds a newer snapshot, adopt it
  useEffect(() => {
    let alive = true
    pullFromServer(state.sessionId).then((server) => {
      if (alive && server && (server.updatedAt || 0) > (state.updatedAt || 0)) {
        dispatch({ type: 'hydrate', state: server })
      }
    })
    return () => {
      alive = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // achievement toasts auto-dismiss
  useEffect(() => {
    if (!state.toasts.length) return
    const t = setTimeout(() => dispatch({ type: 'dismissToast' }), 4600)
    return () => clearTimeout(t)
  }, [state.toasts])

  return <GameCtx.Provider value={{ state, dispatch }}>{children}</GameCtx.Provider>
}
