import { ATTRS } from '../data'
import { useEffect, useRef, useState } from 'react'

/* ------------------------------------------------------------------ icons */

const PATHS = {
  scale: (
    <>
      <path d="M12 4v15M7.5 19h9" />
      <path d="M12 6 7 8.5l1.6 4a2.9 2.9 0 0 1-5.6 0l1.6-4" />
      <path d="m12 6 5 2.5-1.6 4a2.9 2.9 0 0 0 5.6 0l-1.6-4" />
    </>
  ),
  lotus: (
    <>
      <path d="M12 20c-2.4 0-5.6-.8-7-3.2 1.6-.3 2.8-.9 3.8-2C10 16 12 17 12 17s2-1 3.2-2.2c1 1.1 2.2 1.7 3.8 2-1.4 2.4-4.6 3.2-7 3.2Z" />
      <path d="M12 16.5c-1.6-1.4-2.6-3.6-2.6-6C9.4 7.7 10.6 5 12 3c1.4 2 2.6 4.7 2.6 7.5 0 2.4-1 4.6-2.6 6Z" />
      <path d="M9.2 14.6C7 14 5 12 4.5 9.6c2 .3 3.9 1.4 5 3" />
      <path d="M14.8 14.6c2.2-.6 4.2-2.6 4.7-5-2 .3-3.9 1.4-5 3" />
    </>
  ),
  shield: <path d="M12 3l7 2.8v5.4c0 4.4-2.9 7.8-7 9.8-4.1-2-7-5.4-7-9.8V5.8Z" />,
  flame: (
    <>
      <path d="M12 3c2.2 3 4 4.6 4 7.5a4 4 0 0 1-8 0C8 7.6 9.8 6 12 3Z" />
      <path d="M6.5 17.5c1.7 1.3 3.6 2 5.5 2s3.8-.7 5.5-2" />
    </>
  ),
  bow: (
    <>
      <path d="M5 19C6.5 11.5 12 5.5 19.5 3.5" />
      <path d="M5 19C13 17.5 17.5 13 19.5 3.5" />
      <path d="m5 19 14.5-15.5M17.5 4h2.5v2.5" />
    </>
  ),
  eye: (
    <>
      <path d="M2.5 12S6 6 12 6s9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
      <circle cx="12" cy="12" r="2.6" />
    </>
  ),
  star: (
    <path d="m12 3.5 2.5 5.2 5.7.7-4.2 3.9 1.1 5.6L12 16.2l-5.1 2.7 1.1-5.6-4.2-3.9 5.7-.7Z" />
  ),
  scroll: (
    <>
      <path d="M7 3.5h10.5a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-13a2 2 0 0 1 2-2Z" />
      <path d="M8.5 8h7M8.5 12h7M8.5 16h4.5" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m15.5 8.5-2 5-5 2 2-5Z" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8.5" r="3" />
      <path d="M3.5 19c.7-3 2.8-4.5 5.5-4.5s4.8 1.5 5.5 4.5" />
      <circle cx="16.5" cy="9.5" r="2.4" />
      <path d="M15.5 14.6c2.6.1 4.4 1.5 5 4.4" />
    </>
  ),
  book: (
    <>
      <path d="M12 6.5C10.5 5 8.5 4.5 5.5 4.5v14c3 0 5 .5 6.5 2 1.5-1.5 3.5-2 6.5-2v-14c-3 0-5 .5-6.5 2Z" />
      <path d="M12 6.5v14" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c-5.5 5-5.5 12 0 17 5.5-5 5.5-12 0-17Z" />
    </>
  ),
  crown: <path d="m4 17.5-1-9.5 5 3 4-6.5 4 6.5 5-3-1 9.5Zm0 2.5h16" />,
  briefcase: (
    <>
      <rect x="3.5" y="8" width="17" height="11.5" rx="1.5" />
      <path d="M9 8V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V8M3.5 13h17" />
    </>
  ),
  heart: <path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.3 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10Z" />,
  alert: (
    <>
      <path d="M12 3.5 21 19.5H3Z" />
      <path d="M12 10v4M12 16.8v.4" />
    </>
  ),
  grad: (
    <>
      <path d="m2.5 9.5 9.5-4.5 9.5 4.5-9.5 4.5Z" />
      <path d="M6.5 11.5V16c0 1.4 2.5 2.8 5.5 2.8s5.5-1.4 5.5-2.8v-4.5" />
      <path d="M21.5 9.5V15" />
    </>
  ),
  lock: (
    <>
      <rect x="5.5" y="10.5" width="13" height="9.5" rx="1.5" />
      <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" />
    </>
  ),
  home: <path d="m4 11 8-7.5L20 11M6.5 9.8V20h11V9.8" />,
  sound: (
    <>
      <path d="M4 9.5v5h3.5L12 19V5L7.5 9.5Z" />
      <path d="M15.5 9a4.2 4.2 0 0 1 0 6M18 6.5a8 8 0 0 1 0 11" />
    </>
  ),
  mute: (
    <>
      <path d="M4 9.5v5h3.5L12 19V5L7.5 9.5Z" />
      <path d="m16 9.5 5 5M21 9.5l-5 5" />
    </>
  ),
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  arrow: <path d="M4 12h15M13.5 5.5 20 12l-6.5 6.5" />,
  spark: <path d="M12 3v5M12 16v5M3 12h5M16 12h5M6 6l3 3M15 15l3 3M18 6l-3 3M9 15l-3 3" />,
  sword: <path d="m5 19 10.5-10.5M14 4h6v6M14 4 4 14l2.5 2.5M16.5 16.5 20 20" />,
}

export function Icon({ name, size = 18, stroke = 1.6, className = '', style }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {PATHS[name] || PATHS.spark}
    </svg>
  )
}

/* ------------------------------------------------------- ornamental chakra */

export function Chakra({ size = 720, className = '', style }) {
  const spokes = Array.from({ length: 24 }, (_, i) => (i * 360) / 24)
  return (
    <svg
      className={`chakra ${className}`}
      style={style}
      width={size}
      height={size}
      viewBox="0 0 200 200"
      aria-hidden="true"
    >
      <circle cx="100" cy="100" r="97" fill="none" stroke="currentColor" strokeWidth="1" />
      <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="0.5" />
      <circle cx="100" cy="100" r="26" fill="none" stroke="currentColor" strokeWidth="1" />
      <circle cx="100" cy="100" r="8" fill="currentColor" />
      {spokes.map((deg) => (
        <line
          key={deg}
          x1="100"
          y1="100"
          x2="100"
          y2="12"
          stroke="currentColor"
          strokeWidth="0.7"
          transform={`rotate(${deg} 100 100)`}
        />
      ))}
    </svg>
  )
}

/* --------------------------------------------------------- skyline motif */

export function Skyline({ variant = 'court' }) {
  const items = []
  if (variant === 'battle') {
    for (let i = 0; i < 46; i++) {
      const x = 15 + i * 31
      const h = 55 + ((i * 7919) % 60)
      const banner = i % 3 === 0
      items.push(
        <g key={i}>
          <line x1={x} y1={220} x2={x + ((i % 5) - 2)} y2={220 - h} />
          {banner && (
            <path
              d={`M${x + ((i % 5) - 2)} ${220 - h} l16 5 -16 6 Z`}
              fill="currentColor"
              stroke="none"
            />
          )}
        </g>
      )
    }
  } else {
    for (let i = 0; i < 14; i++) {
      const x = 10 + i * 100
      const w = 34 + ((i * 31) % 26)
      const h = 60 + ((i * 577) % 100)
      const steps = 2 + (i % 3)
      let d = `M${x} 220 V${220 - h}`
      for (let s = 0; s < steps; s++) {
        const yy = 220 - h + (h / steps) * s
        d += ` h${w + 10} v-${h / steps / 2} h-${w - 8}`
      }
      d += ` h${w} V220 Z`
      items.push(<path key={i} d={d} fill="currentColor" stroke="none" opacity={0.9} />)
    }
  }
  return (
    <svg
      className={`skyline skyline-${variant}`}
      viewBox="0 0 1440 220"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
    >
      <line x1="0" y1="220" x2="1440" y2="220" strokeWidth="2" stroke="currentColor" />
      {items}
    </svg>
  )
}

/* ------------------------------------------------------------- particles */

export function Particles() {
  const ref = useRef(null)
  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let raf
    let W = (canvas.width = window.innerWidth)
    let H = (canvas.height = window.innerHeight)
    const N = Math.min(80, Math.floor(W / 16))
    const parts = Array.from({ length: N }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: 0.6 + Math.random() * 2,
      s: 0.12 + Math.random() * 0.35,
      ph: Math.random() * Math.PI * 2,
      a: 0.08 + Math.random() * 0.3,
    }))
    const onResize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', onResize)
    let t = 0
    const frame = () => {
      t += 0.008
      ctx.clearRect(0, 0, W, H)
      for (const p of parts) {
        p.y -= p.s
        p.x += Math.sin(t + p.ph) * 0.25
        if (p.y < -8) {
          p.y = H + 8
          p.x = Math.random() * W
        }
        const tw = 0.6 + 0.4 * Math.sin(t * 2 + p.ph * 3)
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(216,180,100,${(p.a * tw).toFixed(3)})`
        ctx.fill()
      }
      raf = requestAnimationFrame(frame)
    }
    frame()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [])
  return <canvas ref={ref} className="particles" aria-hidden="true" />
}

export function Background({ ambience = 'court' }) {
  return (
    <div className="bg" aria-hidden="true">
      <div className="bg-gradient" />
      <Chakra className="chakra-bg" />
      <Skyline variant={ambience} />
      <Particles />
      <div className="vignette" />
    </div>
  )
}

/* ------------------------------------------------------------- animation */

export function useAnimatedValue(target, duration = 750) {
  const [val, setVal] = useState(target)
  const cur = useRef(target)
  useEffect(() => {
    const from = cur.current
    const to = target
    if (from === to) return
    const t0 = performance.now()
    let raf
    const step = (t) => {
      const p = Math.min(1, (t - t0) / duration)
      const e = 1 - Math.pow(1 - p, 3)
      const v = from + (to - from) * e
      cur.current = v
      setVal(v)
      if (p < 1) raf = requestAnimationFrame(step)
      else cur.current = to
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [target, duration])
  return val
}

export function NumberTicker({ value, className = '' }) {
  const v = useAnimatedValue(value)
  return <span className={className}>{Math.round(v)}</span>
}

/* ------------------------------------------------------------ radar chart */

export function Radar({ attrs, size = 300 }) {
  const keys = ['fairness', 'compassion', 'responsibility', 'integrity', 'strategy', 'awareness']
  const labels = ['Fairness', 'Compassion', 'Responsibility', 'Integrity', 'Strategy', 'Awareness']
  const cx = size / 2
  const cy = size / 2
  const R = size * 0.33
  const labelR = size * 0.44

  const pointFor = (i, value) => {
    const ang = (Math.PI * 2 * i) / 6 - Math.PI / 2
    const r = (value / 100) * R
    return [cx + r * Math.cos(ang), cy + r * Math.sin(ang)]
  }

  const anims = keys.map((k) => useAnimatedValue(attrs[k] ?? 0, 800))
  const poly = keys.map((_, i) => pointFor(i, anims[i]).join(',')).join(' ')

  const rings = [0.25, 0.5, 0.75, 1]

  return (
    <svg className="radar-svg" width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {rings.map((f) => (
        <polygon
          key={f}
          className="radar-grid"
          points={keys.map((_, i) => pointFor(i, f * 100).join(',')).join(' ')}
        />
      ))}
      {keys.map((_, i) => {
        const [x, y] = pointFor(i, 100)
        return <line key={i} className="radar-grid" x1={cx} y1={cy} x2={x} y2={y} />
      })}
      <polygon className="radar-poly" points={poly} />
      {keys.map((k, i) => {
        const [x, y] = pointFor(i, anims[i])
        return <circle key={k} className="radar-dot" cx={x} cy={y} r="3.4" />
      })}
      {keys.map((k, i) => {
        const ang = (Math.PI * 2 * i) / 6 - Math.PI / 2
        const x = cx + labelR * Math.cos(ang)
        const y = cy + labelR * Math.sin(ang)
        return (
          <text
            key={k}
            className="radar-label"
            x={x}
            y={y}
            textAnchor={Math.abs(x - cx) < 12 ? 'middle' : x > cx ? 'start' : 'end'}
            dominantBaseline="middle"
          >
            {labels[i]}
          </text>
        )
      })}
    </svg>
  )
}

/* ----------------------------------------------------------- insight panel */

export function InsightPanel({ insight, style = 'epic', delay = 0 }) {
  const isEpic = style !== 'modern'
  return (
    <section className="parchment fade-up" style={{ animationDelay: `${delay}ms` }}>
      <div className="parchment-corner tl" />
      <div className="parchment-corner br" />
      <header className="parchment-head">
        <Icon name="spark" size={15} />
        <span>{isEpic ? 'Mahabharata Insight' : 'Strategic Principle'}</span>
      </header>
      {insight.reflection && <p className="parchment-body">{insight.reflection}</p>}
      <div className="principle-block">
        <div className="principle-label">Strategic Principle</div>
        <div className="principle-text">&ldquo;{insight.principle}&rdquo;</div>
        {insight.source && (
          <div className="principle-source">
            {isEpic ? '— ' : 'Rooted in: '}
            {insight.source}
          </div>
        )}
      </div>
      {!isEpic && (
        <div className="parchment-footnote">Principle drawn from the strategic lessons of the Mahabharata.</div>
      )}
    </section>
  )
}

/* --------------------------------------------------------------- AI panel */

export function AiPanel({ analysis, note, decisionLabel }) {
  const chosenText = decisionLabel || analysis?.decisionLabel

  return (
    <section className="counsel-panel fade-up" style={{ animationDelay: '260ms' }}>
      <header className="counsel-head">
        <div className="counsel-title-wrap">
          <Icon name="lotus" size={18} className="counsel-icon" />
          <h3 className="counsel-title">Krishna&rsquo;s Counsel</h3>
        </div>
        <span className="counsel-badge" title="Generated locally by rule-based logic in this prototype; LLM-ready">
          {analysis?.simulated ? 'Simulated · Rule-based' : 'LLM Connected'}
        </span>
      </header>

      {chosenText && (
        <div className="counsel-section counsel-decision-box">
          <div className="counsel-kicker">Your Decision</div>
          <div className="counsel-decision-text">&ldquo;{chosenText}&rdquo;</div>
        </div>
      )}

      {analysis?.ethicalConsiderations ? (
        <div className="counsel-grid">
          <div className="counsel-section">
            <div className="counsel-kicker gold">Ethical Considerations</div>
            <p className="counsel-body">{analysis.ethicalConsiderations}</p>
          </div>

          <div className="counsel-section">
            <div className="counsel-kicker gold">Strategic Considerations</div>
            <p className="counsel-body">{analysis.strategicConsiderations}</p>
          </div>

          <div className="counsel-section">
            <div className="counsel-kicker gold">Possible Consequences</div>
            <p className="counsel-body">{analysis.possibleConsequences}</p>
          </div>
        </div>
      ) : (
        <p className="counsel-summary">{analysis?.summary}</p>
      )}

      {analysis?.strengths?.length > 0 && (
        <div className="ai-rows">
          {analysis.strengths.map((s, i) => (
            <div className="ai-row good" key={`s${i}`}>
              <Icon name="check" size={13} /> Strength — {s.label} <em>+{s.delta}</em>
            </div>
          ))}
          {analysis.concerns?.map((c, i) => (
            <div className="ai-row bad" key={`c${i}`}>
              <Icon name="alert" size={13} /> Tension — {c.label} <em>{c.delta}</em>
            </div>
          ))}
        </div>
      )}

      {analysis?.bars?.length > 0 && (
        <div className="ai-bars">
          {analysis.bars.map((b, i) => {
            const meta = ATTRS.find((a) => a.key === b.key)
            return (
              <div className="ai-bar-row" key={b.key}>
                <span className="ai-bar-label">{b.label}</span>
                <div className="ai-bar-track">
                  <div
                    className="ai-bar-fill"
                    style={{ width: `${b.value}%`, background: meta?.color, animationDelay: `${i * 90}ms` }}
                  />
                </div>
                <span className="ai-bar-val">{b.value}</span>
              </div>
            )
          })}
        </div>
      )}

      <p className="counsel-note">
        {note ||
          'Krishna’s Counsel provides a strategic and ethical lens on your actions. The advice is designed to illuminate competing duties, not pass moral verdict.'}
      </p>
    </section>
  )
}

/* ------------------------------------------------------------ delta chips */

export function DeltaChip({ value, delay = 0 }) {
  if (!value) return null
  const pos = value > 0
  return (
    <span
      className={`delta-chip ${pos ? '' : 'neg'}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {pos ? `+${value}` : value}
    </span>
  )
}

export function LotusDivider() {
  return (
    <div className="lotus-divider" aria-hidden="true">
      <span className="ld-line" />
      <svg viewBox="0 0 24 14" width="26" height="15" fill="none" stroke="currentColor" strokeWidth="1.3">
        <path d="M12 2c1.2 2.4 1.2 4.6 0 7-1.2-2.4-1.2-4.6 0-7Z" />
        <path d="M6.5 4.5c.6 2.6 1.8 4.3 4 5.3M17.5 4.5c-.6 2.6-1.8 4.3-4 5.3" />
        <path d="M3 8c2 2.2 5 3.3 9 3.3S19 10.2 21 8" />
      </svg>
      <span className="ld-line" />
    </div>
  )
}
