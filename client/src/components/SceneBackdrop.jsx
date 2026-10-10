// ============================================================
// DHARMA DECISION — Scene Backdrop
// Layered SVG composition system with parallax, particles,
// lighting, and video/image fallback.
// ============================================================

import { useEffect, useRef, useMemo, useState } from 'react'
import { BACKDROP_PRESETS } from '../game/sceneData'

export const BACKDROP_IMAGE_MAP = {
  kurukshetra_dawn: '/assets/scenes/kurukshetra-dawn.jpg',
  battlefield_dawn: '/assets/scenes/kurukshetra-dawn.jpg',
  battlefield_dawn_wide: '/assets/scenes/kurukshetra-dawn.jpg',
  between_armies: '/assets/scenes/chariot-between-armies.jpg',
  between_armies_close: '/assets/scenes/chariot-between-armies.jpg',
  chariot_interior: '/assets/scenes/chariot-between-armies.jpg',
  arjuna_pov_generals: '/assets/scenes/arjuna-seeing-elders.jpg',
  chariot_sorrow: '/assets/scenes/arjuna-sorrow-despair.jpg',
  arjuna_despair: '/assets/scenes/arjuna-sorrow-despair.jpg',
  counsel_night: '/assets/scenes/krishna-counsel.jpg',
  arjuna_resolve: '/assets/scenes/arjuna-resolve.jpg',
  war_council_tent: '/assets/scenes/war-council-tent.jpg',
  hastinapura_court: '/assets/scenes/hastinapura-court.jpg',
  peace_envoy: '/assets/scenes/hastinapura-court.jpg',
  tenth_dawn: '/assets/scenes/bhishma-arrow-bed.jpg',
  arrow_bed: '/assets/scenes/bhishma-arrow-bed.jpg',
  arrow_bed_dawn: '/assets/scenes/bhishma-arrow-bed.jpg',
  battlefield_dusk: '/assets/scenes/battlefield-aftermath.jpg',
  aftermath_sunset: '/assets/scenes/battlefield-aftermath.jpg',
  // Modern Dilemmas — 8 Distinct Scenarios
  mod_empty_seat: '/assets/scenes/modern-empty-seat.jpg',
  mod_purchased_essay: '/assets/scenes/modern-purchased-essay.jpg',
  mod_viral_jest: '/assets/scenes/modern-viral-jest.jpg',
  mod_missed_milestone: '/assets/scenes/modern-missed-milestone.jpg',
  mod_inflated_invoice: '/assets/scenes/modern-inflated-invoice.jpg',
  mod_confession_call: '/assets/scenes/modern-confession-call.jpg',
  mod_storm_call: '/assets/scenes/modern-storm-call.jpg',
  mod_senior_tradition: '/assets/scenes/modern-senior-tradition.jpg',
  campus_night: '/assets/scenes/modern-empty-seat.jpg',
  library_tense: '/assets/scenes/modern-purchased-essay.jpg',
  college_corridor: '/assets/scenes/modern-senior-tradition.jpg',
  office_meeting: '/assets/scenes/modern-missed-milestone.jpg',
  dorm_room: '/assets/scenes/modern-viral-jest.jpg',
  exam_hall: '/assets/scenes/modern-purchased-essay.jpg',
}

// ---------- SVG LAYER RENDERERS ----------

function SkyLayer({ variant = 'dawn' }) {
  const skies = {
    dawn: (
      <linearGradient id="sky-g" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#120c24" />
        <stop offset="35%" stopColor="#2c1a3b" />
        <stop offset="60%" stopColor="#6e3124" />
        <stop offset="80%" stopColor="#a85223" />
        <stop offset="100%" stopColor="#d48c3b" />
      </linearGradient>
    ),
    dawn_late: (
      <linearGradient id="sky-g" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#1a1230" />
        <stop offset="40%" stopColor="#4a2838" />
        <stop offset="70%" stopColor="#8a4b2d" />
        <stop offset="100%" stopColor="#c48040" />
      </linearGradient>
    ),
    dawn_warm: (
      <linearGradient id="sky-g" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#1e1430" />
        <stop offset="50%" stopColor="#6e3124" />
        <stop offset="100%" stopColor="#d49030" />
      </linearGradient>
    ),
    dawn_pale: (
      <linearGradient id="sky-g" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#1a1832" />
        <stop offset="40%" stopColor="#3a2845" />
        <stop offset="70%" stopColor="#886a50" />
        <stop offset="100%" stopColor="#c4a870" />
      </linearGradient>
    ),
    dusk: (
      <linearGradient id="sky-g" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#0a0615" />
        <stop offset="30%" stopColor="#2a1228" />
        <stop offset="60%" stopColor="#6a2218" />
        <stop offset="80%" stopColor="#a83820" />
        <stop offset="100%" stopColor="#4a2010" />
      </linearGradient>
    ),
    night: (
      <linearGradient id="sky-g" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#04060f" />
        <stop offset="60%" stopColor="#0c1228" />
        <stop offset="100%" stopColor="#1f1832" />
      </linearGradient>
    ),
    sunset: (
      <linearGradient id="sky-g" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#0e0816" />
        <stop offset="25%" stopColor="#3a1520" />
        <stop offset="50%" stopColor="#8a3018" />
        <stop offset="75%" stopColor="#d06828" />
        <stop offset="100%" stopColor="#daa040" />
      </linearGradient>
    ),
    overcast: (
      <linearGradient id="sky-g" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#1a1a28" />
        <stop offset="50%" stopColor="#2a2a38" />
        <stop offset="100%" stopColor="#3a3530" />
      </linearGradient>
    ),
    interior: (
      <linearGradient id="sky-g" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#151930" />
        <stop offset="50%" stopColor="#222b4d" />
        <stop offset="100%" stopColor="#101324" />
      </linearGradient>
    ),
    // Modern
    city_night: (
      <linearGradient id="sky-g" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#0a0c18" />
        <stop offset="50%" stopColor="#151828" />
        <stop offset="100%" stopColor="#1a1e30" />
      </linearGradient>
    ),
    interior_modern: (
      <linearGradient id="sky-g" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#e8e4dc" />
        <stop offset="100%" stopColor="#d0ccc0" />
      </linearGradient>
    ),
  }
  return <>{skies[variant] || skies.dawn}</>
}

function SunHaze({ variant = 'dawn' }) {
  if (variant === 'night' || variant === 'interior' || variant === 'interior_modern' || variant === 'city_night') return null
  const cy = variant === 'dusk' || variant === 'sunset' ? 380 : variant === 'dawn_pale' ? 340 : 310
  const color1 = variant === 'dusk' || variant === 'sunset' ? '#ff6030' : '#ffea9f'
  const color2 = variant === 'dusk' || variant === 'sunset' ? '#a82010' : '#c24c1e'
  return (
    <g className="scene-layer" data-depth="0.1">
      <defs>
        <radialGradient id="sun-h" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={color1} stopOpacity="0.9" />
          <stop offset="30%" stopColor={color2} stopOpacity="0.4" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="600" cy={cy} r="140" fill="url(#sun-h)" />
      <circle cx="600" cy={cy} r="38" fill="#fff5d1" opacity="0.8" />
    </g>
  )
}

// ---------- FEATURE RENDERERS ----------

function ArmiesDistant() {
  return (
    <g className="scene-layer" data-depth="0.2" opacity="0.8">
      {/* Left army (Pandavas) */}
      <g fill="#211014">
        {[40, 90, 140, 190, 240, 290, 340, 390, 440].map((x, i) => (
          <g key={`lf-${i}`}>
            <line x1={x} y1="380" x2={x} y2={318 - (i % 3) * 14} stroke="#211014" strokeWidth="2.5" />
            <polygon points={`${x},${318 - (i % 3) * 14} ${x + 20},${326 - (i % 3) * 14} ${x},${334 - (i % 3) * 14}`} fill="#3b1d24" />
          </g>
        ))}
      </g>
      {/* Right army (Kauravas) */}
      <g fill="#211014">
        {[760, 810, 860, 910, 960, 1010, 1060, 1110, 1160].map((x, i) => (
          <g key={`rf-${i}`}>
            <line x1={x} y1="380" x2={x} y2={318 - (i % 4) * 12} stroke="#211014" strokeWidth="2.5" />
            <polygon points={`${x},${318 - (i % 4) * 12} ${x - 20},${326 - (i % 4) * 12} ${x},${334 - (i % 4) * 12}`} fill="#3b1d24" />
          </g>
        ))}
      </g>
    </g>
  )
}

function Elephants() {
  return (
    <g className="scene-layer" data-depth="0.25" fill="#211014" opacity="0.75">
      <ellipse cx="160" cy="376" rx="34" ry="24" />
      <circle cx="136" cy="366" r="15" />
      <path d="M128 368 Q120 390 114 398" stroke="#211014" strokeWidth="6" fill="none" />
      <ellipse cx="1040" cy="374" rx="32" ry="22" />
      <circle cx="1064" cy="366" r="14" />
      <path d="M1070 368 Q1078 390 1084 398" stroke="#211014" strokeWidth="6" fill="none" />
    </g>
  )
}

function ChariotCenter() {
  return (
    <g className="scene-layer chariot-silhouette" data-depth="0.4" transform="translate(480, 290)">
      <ellipse cx="120" cy="180" rx="32" ry="32" fill="none" stroke="#28160f" strokeWidth="5" />
      <circle cx="120" cy="180" r="8" fill="#d3a94f" />
      <path d="M70 180 L80 120 Q120 100 160 120 L170 180 Z" fill="#3a1e14" stroke="#d3a94f" strokeWidth="2.5" />
      <line x1="90" y1="120" x2="90" y2="20" stroke="#d3a94f" strokeWidth="3" />
      <polygon points="90,20 145,35 90,50" fill="#a83222" opacity="0.9" />
      <circle cx="150" cy="120" r="14" fill="#1b2a40" />
      <path d="M148 106 L154 96 L150 106" stroke="#6fbfae" strokeWidth="2.5" />
      <circle cx="105" cy="116" r="13" fill="#2d211a" />
      <line x1="96" y1="110" x2="114" y2="128" stroke="#d3a94f" strokeWidth="3" />
      <path d="M170 170 Q210 135 240 145 Q260 125 280 135 L275 180 Z" fill="#201511" />
    </g>
  )
}

function SoldiersCloseLeft() {
  return (
    <g className="scene-layer" data-depth="0.5" opacity="0.85">
      {[30, 80, 130, 180, 230].map((x, i) => (
        <g key={`scl-${i}`} fill="#1a0e0a">
          <ellipse cx={x} cy={395 + (i % 2) * 8} rx={18 + i * 2} ry={30 + i * 3} />
          <circle cx={x} cy={360 + (i % 2) * 5} r={10 + i} />
          <line x1={x + 5} y1={355 + (i % 2) * 5} x2={x + 5} y2={310 - i * 5} stroke="#1a0e0a" strokeWidth="2" />
        </g>
      ))}
    </g>
  )
}

function SoldiersCloseRight() {
  return (
    <g className="scene-layer" data-depth="0.5" opacity="0.85">
      {[970, 1020, 1070, 1120, 1170].map((x, i) => (
        <g key={`scr-${i}`} fill="#1a0e0a">
          <ellipse cx={x} cy={395 + (i % 2) * 8} rx={18 + i * 2} ry={30 + i * 3} />
          <circle cx={x} cy={360 + (i % 2) * 5} r={10 + i} />
          <line x1={x - 5} y1={355 + (i % 2) * 5} x2={x - 5} y2={310 - i * 5} stroke="#1a0e0a" strokeWidth="2" />
        </g>
      ))}
    </g>
  )
}

function HorsesMoving() {
  return (
    <g className="scene-layer horses-anim" data-depth="0.45" opacity="0.7">
      <path d="M520 395 Q540 370 560 380 Q575 365 590 375 L585 400 Z" fill="#201511" />
      <path d="M590 395 Q610 370 630 380 Q645 365 660 375 L655 400 Z" fill="#201511" />
    </g>
  )
}

function BhishmaBanner() {
  return (
    <g className="scene-layer" data-depth="0.15" opacity="0.6">
      <line x1="200" y1="380" x2="200" y2="240" stroke="#d9d5cb" strokeWidth="4" />
      <polygon points="200,240 260,260 200,280" fill="#d9d5cb" opacity="0.8" />
      <text x="205" y="268" fill="#3a311d" fontSize="14" fontFamily="serif" opacity="0.7">भीष्म</text>
    </g>
  )
}

function DronaBanner() {
  return (
    <g className="scene-layer" data-depth="0.15" opacity="0.6">
      <line x1="1000" y1="380" x2="1000" y2="250" stroke="#8e5332" strokeWidth="4" />
      <polygon points="1000,250 940,270 1000,290" fill="#8e5332" opacity="0.8" />
    </g>
  )
}

function KauravaFormation() {
  return (
    <g className="scene-layer" data-depth="0.2" opacity="0.5">
      {/* Dense formation lines */}
      {Array.from({ length: 15 }).map((_, i) => (
        <line key={`kf-${i}`} x1={700 + i * 35} y1="385" x2={700 + i * 35} y2={340 - (i % 3) * 10}
          stroke="#211014" strokeWidth="2" />
      ))}
    </g>
  )
}

function ChariotStill() {
  return (
    <g className="scene-layer" data-depth="0.4" transform="translate(440, 310)">
      <ellipse cx="120" cy="160" rx="30" ry="30" fill="none" stroke="#28160f" strokeWidth="4" />
      <circle cx="120" cy="160" r="7" fill="#d3a94f" />
      <path d="M75 160 L85 105 Q120 88 155 105 L165 160 Z" fill="#3a1e14" stroke="#d3a94f" strokeWidth="2" />
      <line x1="95" y1="105" x2="95" y2="10" stroke="#d3a94f" strokeWidth="2.5" />
      <polygon points="95,10 140,24 95,38" fill="#a83222" opacity="0.8" />
    </g>
  )
}

function BowLowered() {
  return (
    <g className="scene-layer" data-depth="0.45" opacity="0.8">
      {/* Gandiva on chariot floor */}
      <path d="M520 470 Q560 490 600 470" fill="none" stroke="#d3a94f" strokeWidth="3" />
      <line x1="600" y1="470" x2="570" y2="440" stroke="#d3a94f" strokeWidth="1.5" />
    </g>
  )
}

function BowRaised() {
  return (
    <g className="scene-layer" data-depth="0.45" opacity="0.9">
      <path d="M570 360 Q590 320 610 360" fill="none" stroke="#d3a94f" strokeWidth="3.5" />
      <line x1="590" y1="318" x2="590" y2="280" stroke="#d3a94f" strokeWidth="1.5" />
    </g>
  )
}

function BowDropped() {
  return (
    <g className="scene-layer" data-depth="0.45" opacity="0.7">
      <path d="M540 480 Q575 500 610 480" fill="none" stroke="#d3a94f" strokeWidth="2.5" opacity="0.6" />
    </g>
  )
}

function SilentArmies() {
  return (
    <g className="scene-layer" data-depth="0.2" opacity="0.4">
      {Array.from({ length: 20 }).map((_, i) => (
        <line key={`sa-${i}`} x1={i * 60} y1="385" x2={i * 60} y2={350 - (i % 3) * 8}
          stroke="#211014" strokeWidth="2" />
      ))}
    </g>
  )
}

function ArmyWatching() {
  return (
    <g className="scene-layer" data-depth="0.25" opacity="0.5">
      {Array.from({ length: 12 }).map((_, i) => (
        <g key={`aw-${i}`}>
          <circle cx={80 + i * 90} cy={375} r={8 + (i % 3) * 2} fill="#1a0e0a" />
          <ellipse cx={80 + i * 90} cy={395} rx={12 + i} ry={18} fill="#1a0e0a" />
        </g>
      ))}
    </g>
  )
}

function ArmyBehind() {
  return (
    <g className="scene-layer" data-depth="0.2" opacity="0.6">
      {Array.from({ length: 10 }).map((_, i) => (
        <g key={`ab-${i}`} fill="#211014">
          <line x1={100 + i * 100} y1="390" x2={100 + i * 100} y2={330 - (i % 3) * 12} stroke="#211014" strokeWidth="2.5" />
          <polygon points={`${100 + i * 100},${330 - (i % 3) * 12} ${120 + i * 100},${338 - (i % 3) * 12} ${100 + i * 100},${346 - (i % 3) * 12}`} fill="#3b1d24" />
        </g>
      ))}
    </g>
  )
}

function DistantFires() {
  return (
    <g className="scene-layer" data-depth="0.15">
      {[150, 400, 700, 950, 1100].map((x, i) => (
        <g key={`df-${i}`}>
          <circle cx={x} cy={375 + (i % 2) * 10} r={25 + i * 3} fill="#ff6030" opacity="0.15" />
          <circle cx={x} cy={375 + (i % 2) * 10} r={6} fill="#ffaa40" opacity="0.6" />
        </g>
      ))}
    </g>
  )
}

function BrokenChariots() {
  return (
    <g className="scene-layer" data-depth="0.3" opacity="0.5">
      <ellipse cx="350" cy="410" rx="25" ry="12" fill="#2a180e" />
      <line x1="360" y1="410" x2="380" y2="390" stroke="#2a180e" strokeWidth="3" />
      <ellipse cx="850" cy="420" rx="20" ry="10" fill="#2a180e" />
    </g>
  )
}

function DronaFormation() {
  return (
    <g className="scene-layer" data-depth="0.2" opacity="0.6">
      {/* Rotating battle-square pattern */}
      <path d="M400 380 L600 350 L800 380 L600 410 Z" fill="none" stroke="#3b1d24" strokeWidth="2" strokeDasharray="8 4" />
      <path d="M450 375 L600 355 L750 375 L600 395 Z" fill="none" stroke="#3b1d24" strokeWidth="1.5" strokeDasharray="6 3" />
    </g>
  )
}

function Stars() {
  return (
    <g className="scene-layer" data-depth="0.05">
      {Array.from({ length: 40 }).map((_, i) => (
        <circle key={`star-${i}`}
          cx={Math.floor(((i * 73 + 17) % 1200))}
          cy={Math.floor(((i * 41 + 7) % 250))}
          r={i % 5 === 0 ? 1.5 : 0.8}
          fill="#e8e4d0"
          opacity={0.3 + (i % 4) * 0.15}
        />
      ))}
    </g>
  )
}

function HanumanBanner() {
  return (
    <g className="scene-layer" data-depth="0.35">
      <line x1="600" y1="350" x2="600" y2="200" stroke="#d3a94f" strokeWidth="3" />
      <polygon points="600,200 660,220 600,240" fill="#a83222" />
    </g>
  )
}

function TentCanopy() {
  return (
    <g className="scene-layer" data-depth="0.1">
      <defs>
        <linearGradient id="tent-r" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3c1e13" />
          <stop offset="50%" stopColor="#5a2b1b" />
          <stop offset="100%" stopColor="#28130a" />
        </linearGradient>
      </defs>
      <polygon points="600,60 1150,320 1150,680 50,680 50,320" fill="url(#tent-r)" opacity="0.9" />
      <line x1="600" y1="60" x2="600" y2="420" stroke="#7a5820" strokeWidth="6" />
    </g>
  )
}

function TentDrapes() {
  return (
    <g className="scene-layer" data-depth="0.15">
      <path d="M50 320 Q320 280 600 320 Q880 280 1150 320" stroke="#d3a94f" strokeWidth="3" fill="none" />
      <path d="M50 340 Q320 300 600 340 Q880 300 1150 340" stroke="#a83222" strokeWidth="4" fill="none" />
    </g>
  )
}

function MapTable() {
  return (
    <g className="scene-layer" data-depth="0.35">
      <ellipse cx="600" cy="520" rx="260" ry="80" fill="#2d1d17" stroke="#d3a94f" strokeWidth="3" />
      <ellipse cx="600" cy="510" rx="190" ry="50" fill="#e2d4ae" opacity="0.85" />
      <path d="M520 510 L680 500 M560 490 L640 525" stroke="#7a2818" strokeWidth="2" />
      <circle cx="580" cy="505" r="4" fill="#a83222" />
      <circle cx="620" cy="512" r="4" fill="#2b4870" />
    </g>
  )
}

function OilChandelier() {
  return (
    <g className="scene-layer" data-depth="0.3">
      <circle cx="600" cy="400" r="140" fill="#ffaa33" opacity="0.25" />
      <circle cx="600" cy="400" r="18" fill="#fff2a3" />
      <line x1="600" y1="200" x2="600" y2="390" stroke="#d3a94f" strokeWidth="2.5" />
    </g>
  )
}

function Torches() {
  return (
    <g className="scene-layer" data-depth="0.3">
      {[150, 1050].map((x, i) => (
        <g key={`torch-${i}`}>
          <line x1={x} y1="500" x2={x} y2="380" stroke="#5a3a20" strokeWidth="4" />
          <circle cx={x} cy="375" r="20" fill="#ff9933" opacity="0.3" />
          <circle cx={x} cy="375" r="6" fill="#ffe066" />
        </g>
      ))}
    </g>
  )
}

function Pillars() {
  return (
    <g className="scene-layer" data-depth="0.2">
      <rect x="80" y="160" width="40" height="520" fill="#1b213b" stroke="#7a5820" strokeWidth="2" />
      <rect x="480" y="140" width="48" height="540" fill="#1b213b" stroke="#7a5820" strokeWidth="2" />
      <rect x="672" y="140" width="48" height="540" fill="#1b213b" stroke="#7a5820" strokeWidth="2" />
      <rect x="1080" y="160" width="40" height="520" fill="#1b213b" stroke="#7a5820" strokeWidth="2" />
    </g>
  )
}

function Throne() {
  return (
    <g className="scene-layer" data-depth="0.3">
      <path d="M520 420 L680 420 L720 540 L480 540 Z" fill="#2d1b14" stroke="#d3a94f" strokeWidth="3" />
      <path d="M560 320 Q600 280 640 320 L640 420 L560 420 Z" fill="#4a2c1d" stroke="#d3a94f" strokeWidth="2.5" />
      <circle cx="600" cy="300" r="16" fill="#d3a94f" />
    </g>
  )
}

function Braziers() {
  return (
    <g className="scene-layer" data-depth="0.25">
      {[280, 920].map((x, i) => (
        <g key={`br-${i}`}>
          <circle cx={x} cy="360" r="30" fill="#ff9933" opacity="0.25" />
          <circle cx={x} cy="360" r="8" fill="#ffe066" />
        </g>
      ))}
    </g>
  )
}

function Arches() {
  return (
    <g className="scene-layer" data-depth="0.1" stroke="#d3a94f" strokeWidth="2" fill="none" opacity="0.4">
      <path d="M100 680 V220 Q300 80 500 220 V680" />
      <path d="M700 680 V220 Q900 80 1100 220 V680" />
      <path d="M400 680 V180 Q600 40 800 180 V680" strokeWidth="3" opacity="0.6" />
    </g>
  )
}

function CourtiersS() {
  return (
    <g className="scene-layer" data-depth="0.3" opacity="0.4">
      {[180, 300, 900, 1020].map((x, i) => (
        <g key={`ct-${i}`}>
          <ellipse cx={x} cy="480" rx="15" ry="30" fill="#1a1630" />
          <circle cx={x} cy="445" r="10" fill="#1a1630" />
        </g>
      ))}
    </g>
  )
}

function ThroneDuryodhana() {
  return (
    <g className="scene-layer" data-depth="0.3">
      <path d="M540 380 L660 380 L690 500 L510 500 Z" fill="#2d1b14" stroke="#d3a94f" strokeWidth="3" />
      <path d="M570 290 Q600 250 630 290 L630 380 L570 380 Z" fill="#4a2c1d" stroke="#d3a94f" strokeWidth="2" />
      <circle cx="600" cy="270" r="14" fill="#d3a94f" />
      {/* Duryodhana silhouette on throne */}
      <ellipse cx="600" cy="370" rx="22" ry="35" fill="#1a1630" opacity="0.7" />
      <circle cx="600" cy="332" r="13" fill="#1a1630" opacity="0.7" />
    </g>
  )
}

function GoldenChair() {
  return (
    <g className="scene-layer" data-depth="0.35" opacity="0.6">
      <rect x="350" y="440" width="40" height="60" fill="#d3a94f" opacity="0.3" rx="4" />
      <path d="M350 440 Q370 420 390 440" fill="none" stroke="#d3a94f" strokeWidth="2" />
    </g>
  )
}

function EldersSeated() {
  return (
    <g className="scene-layer" data-depth="0.3" opacity="0.5">
      {[200, 350, 850, 1000].map((x, i) => (
        <g key={`eld-${i}`}>
          <ellipse cx={x} cy="470" rx="18" ry="32" fill="#1a1630" />
          <circle cx={x} cy="434" r="11" fill="#1a1630" />
        </g>
      ))}
    </g>
  )
}

function ShikhandiColumn() {
  return (
    <g className="scene-layer" data-depth="0.35" opacity="0.7">
      {/* Line of warriors with Shikhandi at front */}
      <g fill="#2a1a12">
        <circle cx="500" cy="370" r="14" />
        <ellipse cx="500" cy="395" rx="16" ry="25" />
        <line x1="500" y1="355" x2="500" y2="310" stroke="#d3a94f" strokeWidth="2.5" />
      </g>
      {[540, 560, 580, 600].map((x, i) => (
        <g key={`sk-${i}`} fill="#1a1008" opacity="0.5">
          <circle cx={x} cy={375 + i * 2} r={10} />
          <ellipse cx={x} cy={395 + i * 2} rx={12} ry={20} />
        </g>
      ))}
    </g>
  )
}

function BhishmaBannerFar() {
  return (
    <g className="scene-layer" data-depth="0.1" opacity="0.5">
      <line x1="900" y1="390" x2="900" y2="280" stroke="#d9d5cb" strokeWidth="3" />
      <polygon points="900,280 945,295 900,310" fill="#d9d5cb" opacity="0.6" />
    </g>
  )
}

function PandavaRanks() {
  return (
    <g className="scene-layer" data-depth="0.2" opacity="0.5">
      {Array.from({ length: 8 }).map((_, i) => (
        <g key={`pr-${i}`} fill="#211014">
          <line x1={200 + i * 50} y1="395" x2={200 + i * 50} y2={345 - (i % 3) * 8} stroke="#211014" strokeWidth="2" />
        </g>
      ))}
    </g>
  )
}

function MorningMist() {
  return (
    <g className="scene-layer" data-depth="0.05" opacity="0.3">
      <rect x="0" y="340" width="1200" height="80" fill="#c4a870" opacity="0.2" />
      <ellipse cx="300" cy="370" rx="300" ry="30" fill="#c4a870" opacity="0.15" />
      <ellipse cx="900" cy="380" rx="250" ry="25" fill="#c4a870" opacity="0.12" />
    </g>
  )
}

function ArrowsInGround() {
  return (
    <g className="scene-layer" data-depth="0.3" opacity="0.7">
      {[150, 280, 420, 550, 700, 830, 980, 1100].map((x, i) => (
        <g key={`aig-${i}`}>
          <line x1={x} y1="420" x2={x + (i % 2 ? 8 : -8)} y2={380 - (i % 3) * 10}
            stroke="#5a3a20" strokeWidth="2" />
          <polygon points={`${x + (i % 2 ? 8 : -8)},${378 - (i % 3) * 10} ${x + (i % 2 ? 12 : -12)},${373 - (i % 3) * 10} ${x + (i % 2 ? 4 : -4)},${373 - (i % 3) * 10}`}
            fill="#5a3a20" />
        </g>
      ))}
    </g>
  )
}

function BrokenFlags() {
  return (
    <g className="scene-layer" data-depth="0.25" opacity="0.5">
      {[200, 600, 1000].map((x, i) => (
        <g key={`bf-${i}`}>
          <line x1={x} y1="420" x2={x + 10} y2="340" stroke="#3b1d24" strokeWidth="2.5" />
          <polygon points={`${x + 10},340 ${x + 35},350 ${x + 10},360`} fill="#3b1d24" opacity="0.4" />
        </g>
      ))}
    </g>
  )
}

function SingleChariot() {
  return (
    <g className="scene-layer" data-depth="0.4" opacity="0.6" transform="translate(500, 340)">
      <ellipse cx="80" cy="100" rx="22" ry="22" fill="none" stroke="#28160f" strokeWidth="3" />
      <path d="M50 100 L58 60 Q80 48 102 60 L110 100 Z" fill="#3a1e14" stroke="#d3a94f" strokeWidth="1.5" />
    </g>
  )
}

function BhishmaArrowBed() {
  return (
    <g className="scene-layer" data-depth="0.35" opacity="0.7">
      {/* Bhishma lying on arrows */}
      <ellipse cx="600" cy="420" rx="80" ry="20" fill="#2a180e" />
      {Array.from({ length: 12 }).map((_, i) => (
        <line key={`ab-${i}`} x1={530 + i * 12} y1="440" x2={530 + i * 12} y2="400"
          stroke="#5a3a20" strokeWidth="1.5" />
      ))}
      <ellipse cx="600" cy="410" rx="25" ry="12" fill="#d9d5cb" opacity="0.5" />
    </g>
  )
}

function GatheredWarriors() {
  return (
    <g className="scene-layer" data-depth="0.25" opacity="0.4">
      {[400, 500, 700, 800].map((x, i) => (
        <g key={`gw-${i}`}>
          <circle cx={x} cy={380} r={10 + i} fill="#1a0e0a" />
          <ellipse cx={x} cy={400} rx={14} ry={22} fill="#1a0e0a" />
        </g>
      ))}
    </g>
  )
}

// MODERN FEATURES
function CollegeBuilding() {
  return (
    <g className="scene-layer" data-depth="0.15">
      <rect x="200" y="200" width="800" height="400" fill="#2a2830" stroke="#3a3840" strokeWidth="2" />
      {Array.from({ length: 6 }).map((_, r) =>
        Array.from({ length: 8 }).map((_, c) => (
          <rect key={`win-${r}-${c}`} x={240 + c * 95} y={230 + r * 60} width="30" height="35"
            fill={Math.random() > 0.5 ? '#4a6080' : '#252530'} opacity="0.8" rx="2" />
        ))
      )}
    </g>
  )
}

function LaptopGlow() {
  return (
    <g className="scene-layer" data-depth="0.4">
      <rect x="530" y="450" width="60" height="40" fill="#1a2a40" stroke="#4080c0" strokeWidth="1.5" rx="3" />
      <circle cx="560" cy="440" r="40" fill="#4080c0" opacity="0.08" />
    </g>
  )
}

function EmptyChair() {
  return (
    <g className="scene-layer" data-depth="0.4" opacity="0.7">
      <rect x="650" y="460" width="35" height="40" fill="#3a3530" rx="3" />
      <rect x="650" y="430" width="35" height="30" fill="#3a3530" rx="3" />
    </g>
  )
}

function WindowLights() {
  return (
    <g className="scene-layer" data-depth="0.1">
      {[100, 300, 900, 1100].map((x, i) => (
        <circle key={`wl-${i}`} cx={x} cy={250 + (i % 2) * 30} r="3" fill="#ffcc66" opacity="0.6" />
      ))}
    </g>
  )
}

function Bookshelves() {
  return (
    <g className="scene-layer" data-depth="0.15">
      {[100, 900].map((x, i) => (
        <g key={`bs-${i}`}>
          <rect x={x} y="200" width="200" height="400" fill="#3a3020" stroke="#5a4a30" strokeWidth="2" />
          {Array.from({ length: 8 }).map((_, r) => (
            <line key={`shelf-${i}-${r}`} x1={x + 5} y1={230 + r * 48} x2={x + 195} y2={230 + r * 48}
              stroke="#5a4a30" strokeWidth="2" />
          ))}
        </g>
      ))}
    </g>
  )
}

function StudyDesks() {
  return (
    <g className="scene-layer" data-depth="0.35">
      {[350, 550, 750].map((x, i) => (
        <g key={`sd-${i}`}>
          <rect x={x} y="450" width="120" height="10" fill="#5a4a30" rx="2" />
          <rect x={x + 10} y="460" width="8" height="40" fill="#5a4a30" />
          <rect x={x + 102} y="460" width="8" height="40" fill="#5a4a30" />
        </g>
      ))}
    </g>
  )
}

function ExamPapers() {
  return (
    <g className="scene-layer" data-depth="0.4" opacity="0.6">
      {[380, 580].map((x, i) => (
        <g key={`ep-${i}`}>
          <rect x={x} y="435" width="30" height="40" fill="#e8e4d0" rx="1" transform={`rotate(${i * 5 - 2} ${x + 15} 455)`} />
        </g>
      ))}
    </g>
  )
}

function ClockFeat() {
  return (
    <g className="scene-layer" data-depth="0.1" opacity="0.7">
      <circle cx="600" cy="180" r="25" fill="none" stroke="#5a5040" strokeWidth="2" />
      <line x1="600" y1="180" x2="600" y2="162" stroke="#5a5040" strokeWidth="2" />
      <line x1="600" y1="180" x2="612" y2="175" stroke="#5a5040" strokeWidth="1.5" />
    </g>
  )
}

function Lockers() {
  return (
    <g className="scene-layer" data-depth="0.2">
      {Array.from({ length: 10 }).map((_, i) => (
        <rect key={`lk-${i}`} x={80 + i * 50} y="300" width="42" height="200"
          fill="#4a4a50" stroke="#5a5a60" strokeWidth="1" rx="2" />
      ))}
    </g>
  )
}

function StudentsBg() {
  return (
    <g className="scene-layer" data-depth="0.3" opacity="0.4">
      {[700, 800, 900, 1000].map((x, i) => (
        <g key={`stb-${i}`}>
          <circle cx={x} cy={380} r={10} fill="#3a3540" />
          <ellipse cx={x} cy={405} rx={12} ry={22} fill="#3a3540" />
        </g>
      ))}
    </g>
  )
}

function NoticeBoard() {
  return (
    <g className="scene-layer" data-depth="0.15" opacity="0.6">
      <rect x="600" y="260" width="120" height="80" fill="#6a5030" stroke="#8a7050" strokeWidth="2" rx="3" />
      {[615, 645, 675, 695].map((x, i) => (
        <rect key={`nb-${i}`} x={x} y={270 + (i % 2) * 20} width="20" height="15"
          fill={['#e8e4d0', '#ffd080', '#c0e0c0', '#d0c0e0'][i]} rx="1" />
      ))}
    </g>
  )
}

function Doorways() {
  return (
    <g className="scene-layer" data-depth="0.1" opacity="0.5">
      {[200, 1000].map((x, i) => (
        <g key={`dw-${i}`}>
          <rect x={x} y="280" width="60" height="220" fill="#1a1a20" rx="3" />
          <rect x={x + 5} y="285" width="50" height="210" fill="#252530" rx="2" />
        </g>
      ))}
    </g>
  )
}

// Feature lookup table
const FEATURE_MAP = {
  armies_distant: ArmiesDistant,
  flags_left: () => null, // included in armies_distant
  flags_right: () => null,
  elephants: Elephants,
  chariot_center: ChariotCenter,
  soldiers_close_left: SoldiersCloseLeft,
  soldiers_close_right: SoldiersCloseRight,
  horses_moving: HorsesMoving,
  chariot_rail: () => null, // chariot_interior shown via chariot_still
  reins: () => null,
  banner_hanuman: HanumanBanner,
  bhishma_banner: BhishmaBanner,
  drona_banner: DronaBanner,
  kaurava_formation: KauravaFormation,
  faces_distant: () => null,
  chariot_still: ChariotStill,
  bow_lowered: BowLowered,
  bow_raised: BowRaised,
  bow_dropped: BowDropped,
  silent_armies: SilentArmies,
  army_watching: ArmyWatching,
  army_behind: ArmyBehind,
  distant_fires: DistantFires,
  broken_chariots: BrokenChariots,
  drona_formation: DronaFormation,
  hanuman_banner: HanumanBanner,
  tent_canopy: TentCanopy,
  tent_roof: TentCanopy,
  tent_drapes: TentDrapes,
  oil_lamp: OilChandelier,
  oil_chandelier: OilChandelier,
  stars: Stars,
  map_table: MapTable,
  torches: Torches,
  pillars: Pillars,
  throne: Throne,
  braziers: Braziers,
  arches: Arches,
  courtiers_silhouette: CourtiersS,
  throne_duryodhana: ThroneDuryodhana,
  golden_chair: GoldenChair,
  elders_seated: EldersSeated,
  shikhandi_column: ShikhandiColumn,
  bhishma_banner_far: BhishmaBannerFar,
  pandava_ranks: PandavaRanks,
  morning_mist: MorningMist,
  arrows_in_ground: ArrowsInGround,
  broken_flags: BrokenFlags,
  single_chariot: SingleChariot,
  bhishma_arrow_bed: BhishmaArrowBed,
  gathered_warriors: GatheredWarriors,
  // Modern
  college_building: CollegeBuilding,
  laptop_glow: LaptopGlow,
  empty_chair: EmptyChair,
  window_lights: WindowLights,
  bookshelves: Bookshelves,
  study_desks: StudyDesks,
  exam_papers: ExamPapers,
  clock: ClockFeat,
  lockers: Lockers,
  students_bg: StudentsBg,
  notice_board: NoticeBoard,
  doorways: Doorways,
  // Placeholders
  rows_desks: StudyDesks,
  invigilator: () => null,
  students_heads: StudentsBg,
  conference_table: MapTable,
  whiteboard: NoticeBoard,
  chairs: () => null,
  window_city: WindowLights,
  bed: () => null,
  desk: StudyDesks,
  phone_glow: LaptopGlow,
  posters: NoticeBoard,
}

// ---------- TERRAIN RENDERERS ----------

function TerrainKurukshetra({ variant }) {
  const groundColor = variant === 'scarred' ? '#1a0e08' : '#3d2212'
  return (
    <g className="scene-layer" data-depth="0.3">
      <defs>
        <linearGradient id="ground-g" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={groundColor} />
          <stop offset="40%" stopColor="#23130c" />
          <stop offset="100%" stopColor="#0d0806" />
        </linearGradient>
      </defs>
      <path d="M0 380 Q600 370 1200 380 L1200 680 L0 680 Z" fill="url(#ground-g)" />
      <path d="M0 380 Q200 350 400 375 T800 365 T1200 378 L1200 400 L0 400 Z" fill="#3a1c1d" opacity="0.5" />
    </g>
  )
}

function TerrainInterior({ variant }) {
  const floorColor = variant === 'marble' ? '#0c1020' : '#1a1420'
  return (
    <g className="scene-layer" data-depth="0.25">
      <rect x="0" y="500" width="1200" height="180" fill={floorColor} opacity="0.9" />
      <line x1="0" y1="500" x2="1200" y2="500" stroke="#d3a94f" strokeWidth="2" />
    </g>
  )
}

function TerrainModern({ variant }) {
  const color = variant === 'corridor' ? '#2a2830' : '#252028'
  return (
    <g className="scene-layer" data-depth="0.25">
      <rect x="0" y="500" width="1200" height="180" fill={color} />
      <line x1="0" y1="500" x2="1200" y2="500" stroke="#4a4848" strokeWidth="1" />
    </g>
  )
}

// ---------- PARTICLES ----------

function DustParticles({ intensity = 0.4 }) {
  const count = Math.floor(intensity * 30)
  return (
    <g className="scene-layer particles-dust" data-depth="0.6">
      {Array.from({ length: count }).map((_, i) => (
        <circle key={`dp-${i}`}
          cx={((i * 97 + 31) % 1200)}
          cy={300 + ((i * 67 + 13) % 350)}
          r={1 + (i % 3) * 0.5}
          fill="#c4a870"
          opacity={0.1 + (i % 5) * 0.04}
          className="particle-float"
          style={{ animationDelay: `${(i * 0.7) % 8}s`, animationDuration: `${6 + (i % 4) * 2}s` }}
        />
      ))}
    </g>
  )
}

function EmberParticles({ intensity = 0.3 }) {
  const count = Math.floor(intensity * 20)
  return (
    <g className="scene-layer particles-embers" data-depth="0.55">
      {Array.from({ length: count }).map((_, i) => (
        <circle key={`ep-${i}`}
          cx={((i * 83 + 47) % 1200)}
          cy={250 + ((i * 59 + 19) % 400)}
          r={0.8 + (i % 3) * 0.4}
          fill="#ff8040"
          opacity={0.15 + (i % 4) * 0.05}
          className="particle-rise"
          style={{ animationDelay: `${(i * 0.5) % 6}s`, animationDuration: `${4 + (i % 3) * 2}s` }}
        />
      ))}
    </g>
  )
}

function FireflyParticles({ intensity = 0.3 }) {
  const count = Math.floor(intensity * 15)
  return (
    <g className="scene-layer particles-fireflies" data-depth="0.5">
      {Array.from({ length: count }).map((_, i) => (
        <circle key={`ff-${i}`}
          cx={((i * 107 + 23) % 1200)}
          cy={200 + ((i * 71 + 11) % 400)}
          r={1.2}
          fill="#ffe880"
          opacity={0.2}
          className="particle-pulse"
          style={{ animationDelay: `${(i * 1.1) % 5}s`, animationDuration: `${3 + (i % 3) * 1.5}s` }}
        />
      ))}
    </g>
  )
}

function MistParticles({ intensity = 0.5 }) {
  return (
    <g className="scene-layer particles-mist" data-depth="0.15" opacity={intensity * 0.5}>
      <ellipse cx="300" cy="380" rx="350" ry="40" fill="#c4a870" opacity="0.12" className="particle-drift" />
      <ellipse cx="900" cy="370" rx="280" ry="35" fill="#c4a870" opacity="0.1" className="particle-drift"
        style={{ animationDelay: '3s' }} />
    </g>
  )
}

const PARTICLE_MAP = {
  dust: DustParticles,
  embers: EmberParticles,
  fireflies: FireflyParticles,
  mist: MistParticles,
}

// ---------- LIGHTING OVERLAY ----------

function LightingOverlay({ variant = 'dawn_gold' }) {
  const overlays = {
    dawn_gold: <rect x="0" y="300" width="1200" height="380" fill="#c47a32" opacity="0.08" />,
    dawn_warm: <rect x="0" y="280" width="1200" height="400" fill="#d4a040" opacity="0.1" />,
    dusk_crimson: <rect x="0" y="300" width="1200" height="380" fill="#a03020" opacity="0.1" />,
    firelight: (
      <>
        <circle cx="600" cy="420" r="300" fill="#ff9030" opacity="0.06" />
        <circle cx="600" cy="420" r="150" fill="#ffb060" opacity="0.05" />
      </>
    ),
    torch_warm: (
      <>
        <circle cx="280" cy="360" r="200" fill="#ff9030" opacity="0.04" />
        <circle cx="920" cy="360" r="200" fill="#ff9030" opacity="0.04" />
      </>
    ),
    pale_gold: <rect x="0" y="300" width="1200" height="380" fill="#c4a870" opacity="0.06" />,
    sunset_deep: <rect x="0" y="280" width="1200" height="400" fill="#a04020" opacity="0.12" />,
    overcast: <rect x="0" y="0" width="1200" height="680" fill="#3a3a40" opacity="0.08" />,
    streetlamp: (
      <>
        <circle cx="600" cy="300" r="250" fill="#ffcc80" opacity="0.04" />
      </>
    ),
    fluorescent: <rect x="0" y="0" width="1200" height="680" fill="#e0e8f0" opacity="0.03" />,
    office_warm: <rect x="0" y="0" width="1200" height="680" fill="#ffe0c0" opacity="0.03" />,
    desk_lamp: <circle cx="500" cy="400" r="200" fill="#ffcc80" opacity="0.05" />,
  }
  return <g className="scene-lighting">{overlays[variant] || overlays.dawn_gold}</g>
}

// ---------- MAIN COMPONENT ----------

export function SceneBackdrop({ backdropKey, backgroundImage, className = '' }) {
  const preset = BACKDROP_PRESETS[backdropKey] || {
    sky: 'dawn',
    terrain: 'kurukshetra',
    lighting: 'dawn_gold',
    features: [],
    particles: 'dust',
    particleIntensity: 0.3,
  }

  const imageSrc = backgroundImage || BACKDROP_IMAGE_MAP[backdropKey] || null
  const [imgLoaded, setImgLoaded] = useState(false)
  const [imgFailed, setImgFailed] = useState(false)

  useEffect(() => {
    setImgLoaded(false)
    setImgFailed(false)
  }, [imageSrc])

  const terrainVariant = backdropKey?.includes('scarred') ? 'scarred' :
    backdropKey?.includes('blur') ? 'blur' : 'normal'
  const isModern = preset.sky === 'city_night' || preset.sky === 'interior_modern'
  const isInterior = preset.terrain === 'marble_floor' || preset.terrain === 'tent_floor'
  const showSvgLandscape = !imageSrc || imgFailed

  return (
    <div className={`scene-backdrop-new ${className}`}>
      {/* High-resolution photographic/cinematic scene artwork */}
      {imageSrc && !imgFailed && (
        <div className={`cinematic-bg-image-wrapper ${imgLoaded ? 'loaded' : 'loading'}`}>
          <img
            src={imageSrc}
            alt="Scene background"
            className="cinematic-bg-image"
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgFailed(true)}
          />
          <div className="cinematic-bg-overlay" />
        </div>
      )}

      {/* Atmospheric SVG layer: procedural landscape fallback + particles + lighting + vignette */}
      <svg
        viewBox="0 0 1200 680"
        className="scene-backdrop-svg"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <SkyLayer variant={preset.sky} />
        </defs>

        {/* Render procedural terrain & features as fallback if no image or error */}
        {showSvgLandscape && (
          <>
            <rect x="0" y="0" width="1200" height={isInterior ? 680 : 460} fill="url(#sky-g)" />
            {!isInterior && !isModern && <SunHaze variant={preset.sky} />}
            {!isInterior && !isModern && <TerrainKurukshetra variant={terrainVariant} />}
            {isInterior && !isModern && <TerrainInterior variant={preset.terrain} />}
            {isModern && <TerrainModern variant={preset.terrain} />}
            {preset.features.map((feat, i) => {
              const Comp = FEATURE_MAP[feat]
              return Comp ? <Comp key={`${feat}-${i}`} /> : null
            })}
          </>
        )}

        {/* Atmospheric particles layer (dust, embers, mist, fireflies) */}
        {preset.particles && (() => {
          const PComp = PARTICLE_MAP[preset.particles]
          return PComp ? <PComp intensity={preset.particleIntensity} /> : null
        })()}

        {/* Cinematic lighting overlay */}
        <LightingOverlay variant={preset.lighting} />

        {/* Vignette frame border */}
        <rect x="0" y="0" width="1200" height="680" fill="none"
          stroke="#060a17" strokeWidth="12" />
      </svg>
    </div>
  )
}

