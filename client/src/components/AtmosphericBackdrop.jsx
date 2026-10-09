export function AtmosphericBackdrop({ sceneKey = 'kurukshetra_dawn', className = '' }) {
  return (
    <div className={`scene-backdrop scene-bg-${sceneKey} ${className}`}>
      <svg
        viewBox="0 0 1200 680"
        className="scene-backdrop-svg"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          {/* Dawn sky gradient */}
          <linearGradient id="sky-dawn" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#120c24" />
            <stop offset="35%" stopColor="#2c1a3b" />
            <stop offset="60%" stopColor="#6e3124" />
            <stop offset="80%" stopColor="#a85223" />
            <stop offset="100%" stopColor="#d48c3b" />
          </linearGradient>

          {/* Night war council sky */}
          <linearGradient id="sky-night" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#04060f" />
            <stop offset="60%" stopColor="#0c1228" />
            <stop offset="100%" stopColor="#1f1832" />
          </linearGradient>

          {/* Hastinapura court interior */}
          <linearGradient id="court-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#151930" />
            <stop offset="50%" stopColor="#222b4d" />
            <stop offset="100%" stopColor="#101324" />
          </linearGradient>

          {/* Golden sun haze */}
          <radialGradient id="sun-haze" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffea9f" stopOpacity="0.95" />
            <stop offset="25%" stopColor="#e59834" stopOpacity="0.6" />
            <stop offset="60%" stopColor="#c24c1e" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>

          {/* Ground / plain gradients */}
          <linearGradient id="ground-dawn" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3d2212" />
            <stop offset="40%" stopColor="#23130c" />
            <stop offset="100%" stopColor="#0d0806" />
          </linearGradient>

          {/* Tent cloth gradient */}
          <linearGradient id="tent-roof" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3c1e13" />
            <stop offset="50%" stopColor="#5a2b1b" />
            <stop offset="100%" stopColor="#28130a" />
          </linearGradient>
        </defs>

        {/* ----------------- SCENE: KURUKSHETRA DAWN / BETWEEN ARMIES / CHARIOT SORROW ----------------- */}
        {sceneKey.startsWith('kurukshetra') || sceneKey === 'between_armies' || sceneKey === 'chariot_sorrow' || sceneKey === 'arrow_bed_dawn' ? (
          <g className="art-kurukshetra">
            {/* Sky */}
            <rect x="0" y="0" width="1200" height="460" fill="url(#sky-dawn)" />

            {/* Rising Sun */}
            <circle cx="600" cy="310" r="140" fill="url(#sun-haze)" />
            <circle cx="600" cy="310" r="42" fill="#fff5d1" opacity="0.9" />

            {/* Distant Mountains / Horizon Haze */}
            <path
              d="M0 380 Q200 350 400 375 T800 365 T1200 378 L1200 460 L0 460 Z"
              fill="#3a1c1d"
              opacity="0.75"
            />

            {/* Distant Army silhouettes on left (Pandavas) */}
            <g fill="#211014" opacity="0.8">
              {/* Banners & spears */}
              {[40, 85, 130, 175, 215, 260, 310, 355, 400, 440].map((x, i) => (
                <g key={`l-flag-${i}`}>
                  <line x1={x} y1="380" x2={x} y2={320 - (i % 3) * 15} stroke="#211014" strokeWidth="2.5" />
                  <polygon
                    points={`${x},${320 - (i % 3) * 15} ${x + 22},${328 - (i % 3) * 15} ${x},${336 - (i % 3) * 15}`}
                    fill="#3b1d24"
                  />
                </g>
              ))}
              {/* Elephant silhouettes */}
              <ellipse cx="140" cy="376" rx="32" ry="22" />
              <circle cx="118" cy="368" r="14" />
              <path d="M112 370 Q106 390 102 396" stroke="#211014" strokeWidth="6" fill="none" />
              <ellipse cx="280" cy="374" rx="28" ry="20" />
            </g>

            {/* Distant Army silhouettes on right (Kauravas) */}
            <g fill="#211014" opacity="0.8">
              {[760, 805, 850, 895, 940, 985, 1030, 1075, 1120, 1165].map((x, i) => (
                <g key={`r-flag-${i}`}>
                  <line x1={x} y1="380" x2={x} y2={320 - (i % 4) * 12} stroke="#211014" strokeWidth="2.5" />
                  <polygon
                    points={`${x},${320 - (i % 4) * 12} ${x - 22},${328 - (i % 4) * 12} ${x},${336 - (i % 4) * 12}`}
                    fill="#3b1d24"
                  />
                </g>
              ))}
              <ellipse cx="920" cy="376" rx="34" ry="22" />
              <circle cx="946" cy="368" r="14" />
              <path d="M950 370 Q958 390 962 396" stroke="#211014" strokeWidth="6" fill="none" />
              <ellipse cx="1060" cy="374" rx="30" ry="20" />
            </g>

            {/* Battlefield Ground */}
            <path d="M0 380 Q600 370 1200 380 L1200 680 L0 680 Z" fill="url(#ground-dawn)" />

            {/* Center Chariot (Arjuna & Krishna) */}
            <g className="chariot-silhouette" transform="translate(480, 290)">
              {/* Chariot base & wheels */}
              <ellipse cx="120" cy="180" rx="32" ry="32" fill="none" stroke="#28160f" strokeWidth="5" />
              <circle cx="120" cy="180" r="8" fill="#d3a94f" />
              {/* Chariot cab */}
              <path
                d="M70 180 L80 120 Q120 100 160 120 L170 180 Z"
                fill="#3a1e14"
                stroke="#d3a94f"
                strokeWidth="2.5"
              />
              {/* Hanuman banner staff rising high */}
              <line x1="90" y1="120" x2="90" y2="20" stroke="#d3a94f" strokeWidth="3" />
              <polygon points="90,20 145,35 90,50" fill="#a83222" opacity="0.9" />
              {/* Krishna driving steeds (seated front) */}
              <circle cx="150" cy="120" r="14" fill="#1b2a40" />
              <path d="M148 106 L154 96 L150 106" stroke="#6fbfae" strokeWidth="2.5" />
              {/* Arjuna standing or bowed (rear) */}
              <circle cx="105" cy="116" r="13" fill="#2d211a" />
              <line x1="96" y1="110" x2="114" y2="128" stroke="#d3a94f" strokeWidth="3" />
              {/* Chariot horses silhouette */}
              <path
                d="M170 170 Q210 135 240 145 Q260 125 280 135 L275 180 Z"
                fill="#201511"
              />
            </g>

            {/* Dust haze overlay */}
            <rect x="0" y="360" width="1200" height="320" fill="#c47a32" opacity="0.12" />
          </g>
        ) : sceneKey === 'hastinapura_court' ? (
          /* ----------------- SCENE: HASTINAPURA ROYAL COURT ----------------- */
          <g className="art-hastinapura">
            <rect x="0" y="0" width="1200" height="680" fill="url(#court-grad)" />

            {/* Ornate vaulted palace arches */}
            <g stroke="#d3a94f" strokeWidth="2" fill="none" opacity="0.4">
              <path d="M100 680 V220 Q300 80 500 220 V680" />
              <path d="M700 680 V220 Q900 80 1100 220 V680" />
              <path d="M400 680 V180 Q600 40 800 180 V680" strokeWidth="3" opacity="0.6" />
            </g>

            {/* Marble pillars */}
            <rect x="80" y="160" width="40" height="520" fill="#1b213b" stroke="#7a5820" strokeWidth="2" />
            <rect x="480" y="140" width="48" height="540" fill="#1b213b" stroke="#7a5820" strokeWidth="2" />
            <rect x="672" y="140" width="48" height="540" fill="#1b213b" stroke="#7a5820" strokeWidth="2" />
            <rect x="1080" y="160" width="40" height="520" fill="#1b213b" stroke="#7a5820" strokeWidth="2" />

            {/* Golden Throne Dais in center */}
            <path d="M520 420 L680 420 L720 540 L480 540 Z" fill="#2d1b14" stroke="#d3a94f" strokeWidth="3" />
            <path d="M560 320 Q600 280 640 320 L640 420 L560 420 Z" fill="#4a2c1d" stroke="#d3a94f" strokeWidth="2.5" />
            <circle cx="600" cy="300" r="16" fill="#d3a94f" />

            {/* Braziers / oil torches */}
            <circle cx="280" cy="360" r="30" fill="#ff9933" opacity="0.25" />
            <circle cx="280" cy="360" r="8" fill="#ffe066" />
            <circle cx="920" cy="360" r="30" fill="#ff9933" opacity="0.25" />
            <circle cx="920" cy="360" r="8" fill="#ffe066" />

            {/* Floor polished reflection */}
            <rect x="0" y="520" width="1200" height="160" fill="#0c1020" opacity="0.9" />
            <line x1="0" y1="520" x2="1200" y2="520" stroke="#d3a94f" strokeWidth="2" />
          </g>
        ) : (
          /* ----------------- SCENE: WAR COUNCIL NIGHT TENT ----------------- */
          <g className="art-war-council">
            <rect x="0" y="0" width="1200" height="680" fill="url(#sky-night)" />

            {/* Royal Pavilion Tent Canopy */}
            <polygon points="600,60 1150,320 1150,680 50,680 50,320" fill="url(#tent-roof)" opacity="0.9" />
            <line x1="600" y1="60" x2="600" y2="420" stroke="#7a5820" strokeWidth="6" />

            {/* Tent drapes */}
            <path d="M50 320 Q320 280 600 320 Q880 280 1150 320" stroke="#d3a94f" strokeWidth="3" fill="none" />
            <path d="M50 340 Q320 300 600 340 Q880 300 1150 340" stroke="#a83222" strokeWidth="4" fill="none" />

            {/* Central Council Table with battle map */}
            <ellipse cx="600" cy="520" rx="260" ry="80" fill="#2d1d17" stroke="#d3a94f" strokeWidth="3" />
            <ellipse cx="600" cy="510" rx="190" ry="50" fill="#e2d4ae" opacity="0.85" />
            {/* Map markings */}
            <path d="M520 510 L680 500 M560 490 L640 525" stroke="#7a2818" strokeWidth="2" />
            <circle cx="580" cy="505" r="4" fill="#a83222" />
            <circle cx="620" cy="512" r="4" fill="#2b4870" />

            {/* Golden Oil Lamp / Chandelier glow */}
            <circle cx="600" cy="400" r="140" fill="#ffaa33" opacity="0.3" />
            <circle cx="600" cy="400" r="18" fill="#fff2a3" />
            <line x1="600" y1="200" x2="600" y2="390" stroke="#d3a94f" strokeWidth="2.5" />
          </g>
        )}

        {/* Cinematic Vignette Frame */}
        <rect
          x="0"
          y="0"
          width="1200"
          height="680"
          fill="none"
          stroke="#060a17"
          strokeWidth="18"
        />
      </svg>
    </div>
  )
}
