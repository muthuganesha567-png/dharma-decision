// Automated verification of backend endpoints & static asset integrity
import http from 'http'

function get(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = ''
      res.on('data', (c) => (data += c))
      res.on('end', () => resolve({ status: res.statusCode, data }))
    }).on('error', reject)
  })
}

function post(url, body) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify(body)
    const req = http.request(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload),
      },
    }, (res) => {
      let data = ''
      res.on('data', (c) => (data += c))
      res.on('end', () => resolve({ status: res.statusCode, data }))
    })
    req.on('error', reject)
    req.write(payload)
    req.end()
  })
}

async function run() {
  console.log('=== DHARMA DECISION VERIFICATION SUITE ===\n')
  
  // 1. Root index.html
  const root = await get('http://127.0.0.1:8000/')
  console.log(`[1] GET / status: ${root.status}, length: ${root.data.length}`)
  if (root.status !== 200 || !root.data.includes('Dharma Decision')) {
    throw new Error('Root failed')
  }

  // 2. Health API
  const health = await get('http://127.0.0.1:8000/api/health')
  console.log(`[2] GET /api/health status: ${health.status}, body: ${health.data.trim()}`)
  const healthJson = JSON.parse(health.data)
  if (!healthJson.ok) throw new Error('Health check failed')

  // 3. Chapters API
  const ch = await get('http://127.0.0.1:8000/api/data/chapters')
  console.log(`[3] GET /api/data/chapters status: ${ch.status}, length: ${ch.data.length}`)
  const chJson = JSON.parse(ch.data)
  if (!chJson.chapters || chJson.chapters.length !== 5) throw new Error('Chapters data failed')

  // 4. Modern Dilemmas API
  const modern = await get('http://127.0.0.1:8000/api/data/modern')
  console.log(`[4] GET /api/data/modern status: ${modern.status}, length: ${modern.data.length}`)
  const modernJson = JSON.parse(modern.data)
  if (!modernJson.scenarios || modernJson.scenarios.length !== 8) throw new Error('Modern data failed')

  // 5. AI Analyze API
  const ai = await post('http://127.0.0.1:8000/api/ai/analyze', {
    text: 'I choose to uphold duty above personal grief',
    scenarioId: 'arj_1',
  })
  console.log(`[5] POST /api/ai/analyze status: ${ai.status}`)
  const aiJson = JSON.parse(ai.data)
  console.log(`    AI Summary: ${aiJson.summary}`)
  if (!aiJson.summary) throw new Error('AI analysis failed')

  // 6. Save State API
  const save = await post('http://127.0.0.1:8000/api/save', {
    sessionId: 'test-session-verification',
    state: {
      score: 85,
      attributes: { fairness: 80, compassion: 85, responsibility: 90, integrity: 85, strategy: 85, awareness: 85 },
      relationships: { krishna: 88, bhishma: 72, drona: 65, yudhishthira: 78, karna: 48, draupadi: 70 },
      history: [{ scenarioId: 'arj_1', choiceId: 'A', scoreAfter: 85 }],
    },
  })
  console.log(`[6] POST /api/save status: ${save.status}, body: ${save.data.trim()}`)

  // 7. Load State API
  const load = await get('http://127.0.0.1:8000/api/save/test-session-verification')
  console.log(`[7] GET /api/save/test-session-verification status: ${load.status}`)
  const loadJson = JSON.parse(load.data)
  console.log(`    Loaded Score: ${loadJson.state?.score}, Relationships:`, loadJson.state?.relationships)
  if (loadJson.state?.score !== 85) throw new Error('State load mismatch')

  // 8. Voice API
  const voice = await post('http://127.0.0.1:8000/api/voice/speak', {
    text: 'Stand, O son of Kunti, and face your destiny.',
    characterId: 'krishna',
    emotion: 'calm',
  })
  console.log(`[8] POST /api/voice/speak status: ${voice.status}`)
  const voiceJson = JSON.parse(voice.data)
  console.log(`    Voice Engine: ${voiceJson.engine}, Character: ${voiceJson.character}`)
  if (!voiceJson.engine) throw new Error('Voice API failed')

  console.log('\n✔ ALL VERIFICATION TESTS PASSED SUCCESSFULLY!')
}

run().catch((err) => {
  console.error('✘ Verification failed:', err)
  process.exit(1)
})
