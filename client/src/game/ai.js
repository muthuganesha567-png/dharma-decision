// Mock AI analysis layer (client-side twin of backend/ai.py).
// Rule-based today; a real LLM plugs into POST /api/ai/analyze later —
// the UI contract below stays identical.

import { ATTRS } from '../data'

const LEXICON = {
  fairness: ['fair', 'equal', 'justice', 'impartial', 'both sides', 'deserve', 'unfair', 'equally'],
  compassion: ['care', 'help', 'kind', 'empath', 'well-being', 'wellbeing', 'family', 'support', 'feel', 'mercy', 'forgive', 'compassion', 'suffer', 'hurt'],
  responsibility: ['duty', 'responsib', 'must', 'own it', 'accountab', 'commit', 'obligation', 'step up', 'my role', 'my fault'],
  integrity: ['honest', 'truth', 'integri', 'lie', 'lying', 'deceit', 'transparent', 'ethic', 'principle', 'right thing', 'admit', 'confess', 'wrong'],
  strategy: ['plan', 'strateg', 'negotiat', 'leverage', 'risk', 'advantage', 'efficient', 'long game', 'compromise', 'stakeholder', 'outcome', 'option', 'prepar'],
  awareness: ['consequence', 'later', 'long-term', 'long term', 'impact', 'second-order', 'downstream', 'ripple', 'future', 'aftermath', 'will lead to', 'could cause', 'affect'],
}

const OPENERS = [
  'Your decision profile leans toward {a} and {b}.',
  'This choice reads strongly of {a}, tempered by {b}.',
  'The rubric picks up firm {a} here, with {b} close behind.',
  'Your reasoning is anchored in {a}, supported by {b}.',
]
const CONCERNS = [
  'At the same time, it trades away some {c} — a tension worth naming before the next call.',
  'The rubric flags a possible {c} concern as the price of those gains.',
  'Expect questions about {c}: this path buys its strengths at that expense.',
]
const CLEAN = [
  'No attribute drops — a rare, even-handed call.',
  'The profile rises evenly; the rubric notes balance rather than tension.',
]

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]
const lower = (label) => label.charAt(0).toLowerCase() + label.slice(1)

/**
 * Rule-based analysis of a canonical choice.
 * `attrsAfter` = the player's attribute object after effects were applied.
 */
export function mockAiAnalysis(choice, attrsAfter) {
  const effects = choice.effects || {}
  const deltas = Object.entries(effects)
    .map(([key, v]) => ({ key, v }))
    .sort((x, y) => y.v - x.v)

  const strengths = deltas.filter((d) => d.v > 0).slice(0, 2)
  const concerns = deltas.filter((d) => d.v < 0).slice(0, 2)
  const labelOf = (key) => ATTRS.find((a) => a.key === key)?.label || key

  let summary
  if (strengths.length === 0) {
    summary =
      'This is a costly call — the rubric finds little it can reward, and the profile dips across the board. Sometimes that is the honest price of a hard road.'
  } else if (concerns.length === 0) {
    const s = strengths.map((d) => lower(labelOf(d.key)))
    summary = `${pick(OPENERS).replace('{a}', s[0]).replace('{b}', s[1] || s[0])} ${pick(CLEAN)}`
  } else {
    const s = strengths.map((d) => lower(labelOf(d.key)))
    const c = concerns.map((d) => lower(labelOf(d.key)))
    summary = `${pick(OPENERS).replace('{a}', s[0]).replace('{b}', s[1] || s[0])} ${pick(CONCERNS).replace('{c}', c[0])}`
  }

  const bars = deltas.slice(0, 4).map((d) => ({
    key: d.key,
    label: labelOf(d.key),
    value: attrsAfter[d.key] ?? 50,
    delta: d.v,
  }))

  const sNames = strengths.map((d) => labelOf(d.key))
  const cNames = concerns.map((d) => labelOf(d.key))

  const ethicalConsiderations = strengths.length
    ? `Your choice explicitly prioritizes ${sNames.join(' and ')}. It honors immediate duty and conscience, though ${cNames.length ? `it places strain on ${cNames.join(' and ')}` : 'it preserves core integrity'}. In the logic of dharma, every chosen good creates an unattended duty elsewhere.`
    : 'This path carries heavy moral compromises across multiple dimensions. The ethical burden rests on whether the outcome justifies the means.'

  const strategicConsiderations = effects.strategy && effects.strategy > 0
    ? `From a strategic perspective, this action secures immediate positioning and clarity of role. You conserve organizational momentum, though transparency and relationship trust may require subsequent repair.`
    : `Strategically, choosing restraint or indirect action forces other actors to reveal their positions. However, delaying direct action transfers initiative to the opposing council.`

  const possibleConsequences = choice.consequence
    ? `${choice.consequence} Second-order ripples will shape how allies evaluate your reliability when the next conflict arises.`
    : 'The primary consequence will be felt in how your allies and opponents reassess your resolve.'

  return {
    engine: 'rule-based-mock',
    simulated: true,
    decisionLabel: choice.label,
    summary,
    ethicalConsiderations,
    strategicConsiderations,
    possibleConsequences,
    strengths: strengths.map((d) => ({ label: labelOf(d.key), delta: d.v })),
    concerns: concerns.map((d) => ({ label: labelOf(d.key), delta: d.v })),
    bars,
  }
}

/** Overlap-match free text against canonical choices (returns choice id or null). */
export function matchChoice(text, choices = []) {
  const tokens = new Set((text || '').toLowerCase().match(/[a-z']{4,}/g) || [])
  let best = null
  let bestScore = 0
  for (const ch of choices) {
    const words = new Set(
      `${ch.label} ${ch.tag}`.toLowerCase().match(/[a-z']{4,}/g) || []
    )
    for (const stop of ['that', 'this', 'with', 'them', 'will', 'your', 'have', 'from', 'would', 'when']) words.delete(stop)
    let score = 0
    tokens.forEach((t) => {
      if (words.has(t)) score++
    })
    if (score > bestScore) {
      best = ch
      bestScore = score
    }
  }
  return bestScore >= 2 ? best : null
}

/** Local heuristic analysis of a free-text decision. */
export function analyzeFreeText(text) {
  const low = (text || '').toLowerCase()
  const provisional = {}
  const hits = {}
  for (const [key, words] of Object.entries(LEXICON)) {
    const count = words.filter((w) => low.includes(w)).length
    hits[key] = count
    provisional[key] = Math.max(0, Math.min(100, 50 + 8 * Math.min(count, 5)))
  }
  const ranked = Object.entries(hits).sort((a, b) => b[1] - a[1])
  const top = ranked.filter(([, v]) => v > 0).slice(0, 2).map(([k]) => k)
  const labelOf = (key) => ATTRS.find((a) => a.key === key)?.label || key

  let summary
  if (!low.trim()) {
    summary = 'No reasoning text was provided, so there is nothing to analyze yet.'
  } else if (top.length) {
    summary = `Your reasoning emphasizes ${top.map(lower).join(' and ')}. The rubric reads this as a ${lower(labelOf(top[0]))}-weighted decision.`
  } else {
    summary = 'Your reasoning is short, so the provisional profile is near-neutral. Longer reasoning gives the rubric more depth to interpret.'
  }

  const ethicalConsiderations = top.length
    ? `Your written reasoning centers primarily on ${top.map((k) => labelOf(k)).join(' and ')}. In ethical terms, you seek a resolution that balances conscience with the practical demands of the moment.`
    : 'Your reasoning reflects a cautious, non-committal stance, avoiding overt harm while deferring definitive moral commitment.'

  const strategicConsiderations =
    'By crafting an unscripted response, you explore options outside predefined channels. Strategic wisdom cautions that non-standard maneuvers must still withstand scrutiny from all stakeholders.'

  const possibleConsequences =
    'An independent judgment requires you to bear personal accountability for subsequent outcomes without the protective shield of established precedent.'

  return {
    engine: 'rule-based-mock',
    simulated: true,
    decisionLabel: text ? `“${text.slice(0, 80)}${text.length > 80 ? '…' : ''}”` : 'Custom decision',
    summary,
    ethicalConsiderations,
    strategicConsiderations,
    possibleConsequences,
    provisional,
    note:
      'Krishna\u2019s Counsel in prototype mode: structured rule-based evaluation. When connected to an LLM, this analyzes your reasoning with dynamic contextual depth.',
  }
}
