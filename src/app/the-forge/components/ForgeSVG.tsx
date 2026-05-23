type Tone = 1 | 2 | 3 | 4;

function GrainFilter({ id }: { id: string }) {
  return (
    <filter id={id}>
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
      <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.13 0" />
    </filter>
  );
}

export function HeroSVG() {
  return (
    <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="hb" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#241B12" />
          <stop offset="60%" stopColor="#15110C" />
          <stop offset="100%" stopColor="#0B0A08" />
        </linearGradient>
        <radialGradient id="hl" cx="0.72" cy="0.32" r="0.55">
          <stop offset="0%" stopColor="#E6C281" stopOpacity="0.38" />
          <stop offset="60%" stopColor="#C8A05C" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hwood" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1F1812" />
          <stop offset="50%" stopColor="#2A1F15" />
          <stop offset="100%" stopColor="#1A130E" />
        </linearGradient>
        <linearGradient id="hwin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D8A968" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#D8A968" stopOpacity="0" />
        </linearGradient>
        <GrainFilter id="grain-hero" />
      </defs>
      <rect width="1600" height="900" fill="url(#hb)" />
      <rect width="1600" height="900" fill="url(#hl)" />
      <g stroke="#2A1F15" strokeWidth="1" opacity="0.6">
        {Array.from({ length: 10 }).map((_, i) => (
          <line key={i} x1={i * 180} y1="0" x2={i * 180} y2="640" />
        ))}
      </g>
      <g>
        <rect x="900" y="80" width="520" height="380" fill="#3A2A18" />
        <rect x="912" y="92" width="496" height="356" fill="url(#hwin)" />
        <line x1="1160" y1="92" x2="1160" y2="448" stroke="#5a3f23" strokeWidth="3" />
        <line x1="912" y1="270" x2="1408" y2="270" stroke="#5a3f23" strokeWidth="3" />
      </g>
      <rect x="120" y="120" width="380" height="500" fill="#0E0B07" stroke="#8a6a35" strokeWidth="3" />
      <rect x="135" y="135" width="350" height="470" fill="#161108" opacity="0.95" />
      <rect x="100" y="640" width="420" height="14" fill="#3A2A18" />
      <rect x="100" y="654" width="420" height="4" fill="#1a130e" />
      <rect x="180" y="588" width="22" height="52" fill="#3a261a" />
      <rect x="220" y="578" width="20" height="62" fill="#5a3a22" />
      <rect x="260" y="600" width="18" height="40" fill="#2a1d12" />
      <rect x="296" y="582" width="26" height="58" fill="#7a5530" />
      <rect x="340" y="596" width="20" height="44" fill="#3a2818" />
      <rect x="376" y="588" width="22" height="52" fill="#5a3a22" />
      <rect x="416" y="600" width="20" height="40" fill="#2a1d12" />
      <g transform="translate(720, 470)">
        <rect x="-160" y="320" width="320" height="40" fill="#0E0B07" />
        <rect x="-110" y="230" width="220" height="100" rx="10" fill="#0E0B07" />
        <rect x="-180" y="150" width="360" height="90" rx="14" fill="#1A1108" />
        <rect x="-180" y="150" width="360" height="8" fill="#3a2818" />
        <rect x="-150" y="-200" width="300" height="350" rx="16" fill="#1A1108" />
        <rect x="-150" y="-200" width="300" height="10" fill="#3a2818" />
        <g stroke="#3a2818" strokeWidth="1" strokeDasharray="3 5">
          <line x1="-150" y1="-50" x2="150" y2="-50" />
          <line x1="-150" y1="50" x2="150" y2="50" />
          <line x1="0" y1="-200" x2="0" y2="150" />
        </g>
        <rect x="-220" y="20" width="60" height="160" rx="10" fill="#0E0B07" />
        <rect x="160" y="20" width="60" height="160" rx="10" fill="#0E0B07" />
        <rect x="-60" y="-260" width="120" height="80" rx="14" fill="#1A1108" />
      </g>
      <rect y="780" width="1600" height="120" fill="url(#hwood)" />
      <rect width="1600" height="900" fill="#000" opacity="0.06" filter="url(#grain-hero)" />
    </svg>
  );
}

export function BarberSVG({ tone = 1 as Tone }: { tone?: Tone }) {
  const palettes = [
    { bg: '#1E1611', glow: '#C8A05C', skin: '#3a2a1c', clothes: '#0E0B07' },
    { bg: '#1B1A18', glow: '#E6C281', skin: '#2b2218', clothes: '#0d0c0a' },
    { bg: '#231A12', glow: '#B58a4a', skin: '#3b2a1d', clothes: '#120e09' },
    { bg: '#181612', glow: '#D8A968', skin: '#2e2418', clothes: '#0B0A08' },
  ];
  const p = palettes[(tone - 1) % 4];
  const grainId = `grain-barber-${tone}`;
  return (
    <svg viewBox="0 0 400 520" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id={`bg-${tone}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={p.bg} />
          <stop offset="100%" stopColor="#0B0A08" />
        </linearGradient>
        <radialGradient id={`gl-${tone}`} cx="0.7" cy="0.25" r="0.5">
          <stop offset="0%" stopColor={p.glow} stopOpacity="0.32" />
          <stop offset="100%" stopColor={p.glow} stopOpacity="0" />
        </radialGradient>
        <GrainFilter id={grainId} />
      </defs>
      <rect width="400" height="520" fill={`url(#bg-${tone})`} />
      <rect width="400" height="520" fill={`url(#gl-${tone})`} />
      <path d={`M -10 520 L -10 430 Q 60 360 130 360 L 270 360 Q 340 360 410 430 L 410 520 Z`} fill={p.clothes} />
      <path d="M 130 360 L 200 410 L 270 360 L 240 360 L 200 380 L 160 360 Z" fill="#1A1108" />
      <rect x="170" y="300" width="60" height="80" fill={p.skin} />
      <ellipse cx="200" cy="230" rx="90" ry="105" fill={p.skin} />
      <path d="M 200 130 Q 290 150 290 240 Q 290 330 200 340 Z" fill="#000" opacity="0.35" />
      {tone === 1 && (
        <path d="M 110 200 Q 120 110 200 100 Q 290 105 295 200 Q 290 170 240 160 Q 200 150 170 170 Q 130 180 110 200 Z" fill="#0E0B07" />
      )}
      {tone === 2 && (
        <g>
          <rect x="120" y="120" width="160" height="80" fill="#0E0B07" />
          <ellipse cx="200" cy="120" rx="86" ry="40" fill="#0E0B07" />
          <rect x="120" y="200" width="160" height="14" fill={p.skin} opacity="0.5" />
        </g>
      )}
      {tone === 3 && (
        <g>
          <path d="M 115 180 Q 115 100 200 95 Q 285 100 285 180 Q 270 150 200 145 Q 130 150 115 180 Z" fill="#1a1108" />
          <path d="M 130 270 Q 140 360 200 380 Q 260 360 270 270 Q 250 300 200 305 Q 150 300 130 270 Z" fill="#0E0B07" />
        </g>
      )}
      {tone === 4 && (
        <path d="M 120 195 Q 125 120 175 100 Q 200 85 210 95 Q 230 80 245 95 Q 290 110 290 195 Q 270 160 220 152 Q 170 150 145 170 Q 130 180 120 195 Z" fill="#0E0B07" />
      )}
      <path d="M 110 230 Q 115 140 200 130" stroke={p.glow} strokeWidth="1.5" fill="none" opacity="0.4" />
      <rect width="400" height="520" filter={`url(#${grainId})`} opacity="0.6" />
    </svg>
  );
}

export function TileSVG({ tone = 1 as Tone, idx = 0 }: { tone?: Tone; idx?: number }) {
  const palettes: [string, string][] = [
    ['#1F1812', '#C8A05C'],
    ['#191510', '#E6C281'],
    ['#211711', '#B58a4a'],
    ['#1A140F', '#D8A968'],
  ];
  const [bg, gold] = palettes[(tone - 1) % 4];
  const comp = idx % 6;
  const grainId = `grain-tile-${tone}-${idx}`;
  const bgId = `tbg-${tone}-${idx}`;
  const glId = `tgl-${tone}-${idx}`;
  return (
    <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id={bgId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={bg} />
          <stop offset="100%" stopColor="#0B0A08" />
        </linearGradient>
        <radialGradient id={glId} cx="0.7" cy="0.3" r="0.6">
          <stop offset="0%" stopColor={gold} stopOpacity="0.3" />
          <stop offset="100%" stopColor={gold} stopOpacity="0" />
        </radialGradient>
        <GrainFilter id={grainId} />
      </defs>
      <rect width="400" height="500" fill={`url(#${bgId})`} />
      <rect width="400" height="500" fill={`url(#${glId})`} />
      {comp === 0 && (
        <g transform="translate(60, 200)">
          <rect x="0" y="0" width="280" height="120" rx="10" fill="#0E0B07" />
          <rect x="0" y="100" width="280" height="20" fill={gold} opacity="0.25" />
          <rect x="0" y="115" width="280" height="6" fill={gold} />
          <g stroke={gold} strokeWidth="1" opacity="0.4">
            {Array.from({ length: 20 }).map((_, i) => (
              <line key={i} x1={20 + i * 12} y1="118" x2={20 + i * 12} y2="135" />
            ))}
          </g>
        </g>
      )}
      {comp === 1 && (
        <g transform="translate(80, 180) rotate(-15)">
          <rect x="0" y="0" width="220" height="14" fill="#d8c8a8" />
          <rect x="0" y="2" width="220" height="3" fill="#fff" opacity="0.5" />
          <rect x="220" y="-6" width="80" height="26" rx="4" fill="#3a2818" />
          <rect x="225" y="-2" width="68" height="18" fill="#1a1108" />
        </g>
      )}
      {comp === 2 && (
        <g>
          <ellipse cx="200" cy="280" rx="130" ry="170" fill="#1a120a" />
          <ellipse cx="200" cy="220" rx="130" ry="130" fill="#0E0B07" />
          <path d="M 70 280 Q 70 350 200 380 Q 330 350 330 280 L 330 320 Q 200 360 70 320 Z" fill="#2a1d12" opacity="0.4" />
        </g>
      )}
      {comp === 3 && (
        <g transform="translate(40, 240)">
          <rect x="0" y="80" width="320" height="6" fill="#3a2818" />
          <g>
            <rect x="20" y="20" width="60" height="60" rx="4" fill="#3a261a" />
            <rect x="20" y="20" width="60" height="14" fill={gold} opacity="0.4" />
          </g>
          <g>
            <rect x="100" y="10" width="56" height="70" rx="4" fill="#5a3a22" />
            <rect x="100" y="10" width="56" height="12" fill={gold} />
          </g>
          <g>
            <rect x="176" y="30" width="50" height="50" rx="4" fill="#2a1d12" />
          </g>
          <g>
            <rect x="246" y="14" width="58" height="66" rx="4" fill="#7a5530" />
            <rect x="246" y="14" width="58" height="14" fill={gold} opacity="0.5" />
          </g>
        </g>
      )}
      {comp === 4 && (
        <g>
          <path d="M 100 500 L 100 200 Q 110 100 200 90 Q 300 100 305 220 L 305 280 Q 300 320 270 340 L 270 400 Q 240 420 200 420 L 200 500 Z" fill="#2a1d12" />
          <path d="M 270 340 Q 260 400 220 420 Q 200 425 180 420 L 180 500 L 290 500 L 290 380 Z" fill="#0E0B07" />
          <ellipse cx="200" cy="180" rx="105" ry="90" fill="#1a1108" />
        </g>
      )}
      {comp === 5 && (
        <g>
          <rect y="340" width="400" height="160" fill="#1a1108" />
          <rect x="120" y="180" width="160" height="180" rx="8" fill="#0E0B07" />
          <rect x="80" y="340" width="240" height="14" fill="#0E0B07" />
          <rect x="50" y="80" width="80" height="180" fill="#0E0B07" stroke={gold} strokeWidth="1" opacity="0.7" />
          <rect x="270" y="80" width="80" height="180" fill="#0E0B07" stroke={gold} strokeWidth="1" opacity="0.7" />
          <g fill={gold} opacity="0.7">
            <circle cx="90" cy="60" r="4" />
            <circle cx="160" cy="50" r="4" />
            <circle cx="240" cy="50" r="4" />
            <circle cx="310" cy="60" r="4" />
          </g>
        </g>
      )}
      <rect width="400" height="500" filter={`url(#${grainId})`} opacity="0.5" />
    </svg>
  );
}

export function AvatarSVG({ tone = 1 as Tone }: { tone?: Tone }) {
  return (
    <svg viewBox="0 0 400 520" aria-hidden="true" style={{ width: '100%', height: '100%' }}>
      <BarberSVG tone={tone} />
    </svg>
  );
}

export function MapSVG() {
  return (
    <svg viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="800" height="450" fill="#16130e" />
      <g stroke="#2a2418" strokeWidth="1.2" fill="none">
        {[40, 110, 180, 240, 300, 370, 430].map((y, i) => (
          <line key={`h${i}`} x1="0" y1={y} x2="800" y2={y} />
        ))}
        {[60, 140, 220, 310, 400, 490, 580, 670, 760].map((x, i) => (
          <line key={`v${i}`} x1={x} y1="0" x2={x + 30} y2="450" />
        ))}
      </g>
      <line x1="0" y1="240" x2="800" y2="240" stroke="#C8A05C" strokeWidth="2" opacity="0.5" />
      <line x1="280" y1="0" x2="310" y2="450" stroke="#C8A05C" strokeWidth="2" opacity="0.5" />
      <path d="M 480 120 Q 540 90 600 130 Q 660 160 620 200 Q 560 230 500 200 Q 460 170 480 120 Z" fill="#1f1a13" />
      <rect x="80" y="320" width="120" height="80" fill="#1d1a14" rx="2" />
      <rect x="540" y="320" width="180" height="80" fill="#1d1a14" rx="2" />
    </svg>
  );
}
