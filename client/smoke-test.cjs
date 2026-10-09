/* Dharma Decision — end-to-end smoke test via jsdom.
   Drives the real production bundle: menu → Arjuna chapter → decision →
   consequence → insight → AI panel → branching → free-text mode. */
const fs = require('fs')
const path = require('path')
const { JSDOM, VirtualConsole } = require('jsdom')

const ROOT = '/home/user/dharma-decision'
const STATIC = path.join(ROOT, 'backend', 'static')
const BUNDLE = process.env.BUNDLE || '/tmp/dharma-iife/assets'

let failures = 0
const ok = (cond, label) => {
  console.log(`${cond ? '  ✔' : '  ✘ FAIL'} ${label}`)
  if (!cond) failures++
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function main() {
  // silence jsdom "not implemented" noise except real errors
  const vc = new VirtualConsole()
  const jsErrors = []
  vc.on('jsdomError', (e) => { if (!/not implemented/i.test(e.message)) jsErrors.push(e.message) })
  vc.on('error', (m) => jsErrors.push(String(m)))

  const html = fs.readFileSync(path.join(STATIC, 'index.html'), 'utf8')
  const dom = new JSDOM(html, {
    url: 'http://localhost:8000/',
    runScripts: 'outside-only',
    pretendToBeVisual: true,
    virtualConsole: vc,
  })
  const { window } = dom
  window.fetch = () => Promise.reject(new Error('offline test'))
  window.scrollTo = () => {}

  // load IIFE bundle
  const assets = fs.readdirSync(BUNDLE).filter((f) => f.endsWith('.js'))
  const js = fs.readFileSync(path.join(BUNDLE, assets[0]), 'utf8')
  window.eval(js)

  const $ = (sel) => window.document.querySelector(sel)
  const $$ = (sel) => [...window.document.querySelectorAll(sel)]
  const text = () => window.document.body.textContent || ''
  const click = (el) => el.dispatchEvent(new window.MouseEvent('click', { bubbles: true }))
  const findBtn = (label) =>
    $$('.menu-btn, .btn, .ft-toggle').find((b) => (b.textContent || '').toLowerCase().includes(label.toLowerCase()))

  const waitFor = async (fn, label, timeout = 4000) => {
    const t0 = Date.now()
    while (Date.now() - t0 < timeout) {
      try { if (fn()) return true } catch {}
      await sleep(60)
    }
    ok(false, `timeout waiting for: ${label}`)
    return false
  }

  console.log('\n— MAIN MENU —')
  await waitFor(() => text().toLowerCase().includes('dharma decision'), 'menu title')
  ok(text().includes('Every choice has a consequence'), 'tagline present')
  for (const b of ['Start Journey', 'Mahabharata Challenge', 'Modern Dilemmas', 'My Dharma', 'How to Play'])
    ok(!!findBtn(b), `menu button: ${b}`)

  console.log('\n— START JOURNEY → STORY —')
  click(findBtn('Start Journey'))
  await waitFor(() => text().includes('Kurukshetra'), 'Arjuna story beat')
  ok(text().includes('His duty demands one path'), 'story narrative present')
  ok(!!findBtn('Continue'), 'Continue button')

  console.log('\n— DECISION 1 —')
  click(findBtn('Continue')) // story node → decision intro
  await waitFor(() => text().includes('The First Arrow'), 'decision intro')
  click(findBtn('Continue')) // intro → choices
  await waitFor(() => text().includes('What should Arjuna prioritize'), 'decision prompt')
  const cards = $$('.choice-card')
  ok(cards.length === 4, 'four choices offered')
  ok(text().includes('Prefer to decide in your own words'), 'free-text mode present')

  // choose option C (the third path) → should branch to arj_2c
  click(cards[2])
  await sleep(80)
  ok(text().includes('You are choosing'), 'confirmation appears')
  click(findBtn('Confirm decision'))
  await waitFor(() => text().includes('CONSEQUENCE') || text().includes('Consequence'), 'consequence panel')
  ok(text().includes('Mahabharata Insight'), 'insight panel shown')
  ok(text().includes('Strategic Principle'), 'strategic principle shown')
  ok(text().includes('AI DECISION ANALYSIS') || text().includes('AI Decision Analysis'), 'AI analysis panel shown')
  ok(text().includes('Simulated'), 'AI panel marked simulated')
  ok($$('.delta-chip').length >= 3, 'attribute delta chips animated in')
  ok(text().includes('Dharma Decision Score'), 'score line shown')

  console.log('\n— BRANCH C → PEACE ROAD —')
  click(findBtn('Continue the story'))
  await waitFor(() => text().includes("The Envoy"), 'branch scenario 2C reached')
  ok(text().includes('Hastinapura'), 'peace-road narrative present')

  console.log('\n— DECISION 2 (free-text mode) —')
  click(findBtn('Continue'))
  await waitFor(() => text().includes('one audience with the enemy court'), '2C prompt')
  click(findBtn('Prefer to decide in your own words'))
  await sleep(60)
  const ta = $('.ft-textarea')
  ok(!!ta, 'free-text textarea appears')
  const setValue = (el, v) => {
    const proto = Object.getPrototypeOf(el)
    Object.getOwnPropertyDescriptor(proto, 'value').set.call(el, v)
    el.dispatchEvent(new window.Event('input', { bubbles: true }))
  }
  setValue(ta, 'I will speak honestly and propose a fair compromise, and I must plan the negotiation with care.')
  click(findBtn('Analyze my decision'))
  await waitFor(() => text().includes('Prototype analysis runs locally'), 'free-text AI analysis')
  ok(/canonical path|your own road/.test(text()), 'choice matching note')
  click(findBtn('Commit this decision'))
  await waitFor(() => text().includes('in your own words'), 'free-text decision committed')

  console.log('\n— CONVERGENCE → WAR COUNCIL —')
  click(findBtn('Continue the story'))
  await waitFor(() => text().includes('The War Council'), 'convergence at war council')
  click(findBtn('Continue'))
  await waitFor(() => text().includes('half-truth to unmake'), 'war council prompt')
  click($$('.choice-card')[1]) // refuse
  await sleep(60)
  click(findBtn('Confirm decision'))
  await waitFor(() => text().includes('Strategic Principle'), 'war council consequence')

  console.log('\n— FINAL DECISION → ENDING —')
  click(findBtn('Continue the story'))
  await waitFor(() => text().includes('The Tenth Dawn'), 'final scenario')
  click(findBtn('Continue'))
  await waitFor(() => text().includes('bring down the grandsire'), 'final prompt')
  click($$('.choice-card')[2]) // beside, not behind
  await sleep(60)
  click(findBtn('Confirm decision'))
  await waitFor(() => text().includes('Strategic Principle'), 'final consequence')
  click(findBtn('See the outcome'))
  await waitFor(() => text().includes('CHAPTER COMPLETE') || text().includes('Chapter complete'), 'ending reached')
  ok($$('.radar-svg').length >= 1, 'final radar chart rendered')
  ok(text().includes('THE JOURNEY CONTINUES') || text().includes('The journey continues'), 'locked chapters teased')
  ok(text().includes('Karna'), 'Karna teaser present')

  console.log('\n— DASHBOARD —')
  click(findBtn('My Dharma dashboard'))
  await waitFor(() => text().includes('YOUR DHARMA PROFILE') || text().includes('Your Dharma Profile'), 'dashboard')
  ok($$('.radar-svg').length >= 1, 'dashboard radar rendered')
  ok(text().includes('DUTY BOUND') || text().includes('Duty Bound'), 'achievements listed')
  ok(text().includes('Decision Log'), 'decision log shown')
  ok($$('.log-item').length === 4, 'four decisions logged')

  console.log('\n— MODERN DILEMMAS —')
  click(findBtn('Modern Dilemmas'))
  await waitFor(() => text().includes('Modern Dilemmas'), 'modern hub')
  ok(text().includes('The Empty Seat'), 'teamwork scenario card')
  click(findBtn('The Empty Seat'))
  await waitFor(() => text().includes('The deadline is tomorrow'), 'modern situation text')
  click(findBtn('Continue'))
  await waitFor(() => text().includes('How do you handle the credit'), 'modern prompt')
  click($$('.choice-card')[2]) // honest middle
  await sleep(60)
  click(findBtn('Confirm decision'))
  await waitFor(() => text().includes('Strategic Principle'), 'modern consequence + insight')
  ok(text().includes('Rooted in'), 'modern principle sourced to the epic')

  console.log('\n— HOW TO PLAY + CHAPTER SELECT —')
  click($('.header-home')) // header home
  await waitFor(() => text().includes('START JOURNEY') || text().includes('Start Journey'), 'back at menu')
  click(findBtn('How to Play'))
  await waitFor(() => text().includes('The Shape of the Game'), 'how-to screen')
  ok(text().includes('not an objective measurement of morality'), 'rubric disclaimer present')
  click($('.header-home'))
  await waitFor(() => text().includes('Mahabharata Challenge'), 'back at menu again')
  click(findBtn('Mahabharata Challenge'))
  await waitFor(() => text().includes('Choose Your Journey'), 'chapter select')
  ok(text().includes('Locked'), 'locked chapters visible')
  ok(text().includes('ABHIMANYU') || text().includes('Abhimanyu'), 'all five characters present')

  if (jsErrors.length) {
    console.log('\n⚠ JS errors captured:')
    jsErrors.forEach((e) => console.log('   ', e.slice(0, 300)))
    failures += jsErrors.length
  }

  console.log(failures === 0 ? '\n★ ALL SMOKE TESTS PASSED' : `\n✘ ${failures} failure(s)`)
  process.exit(failures === 0 ? 0 : 1)
}

main().catch((e) => {
  console.error('SMOKE TEST CRASH:', e)
  process.exit(1)
})
