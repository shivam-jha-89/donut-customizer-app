import { useId, useMemo } from 'react'

const hash = (s) => { let h = 2166136261; for (const c of s) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619) } return h >>> 0 }
const rnd = (seed) => {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function blob(r, wob, seed, n = 160) {
  const R = rnd(seed), p = [R() * 6.28, R() * 6.28, R() * 6.28]
  let d = ''
  for (let i = 0; i < n; i++) {
    const a = (i / n) * 6.2832
    const k = Math.sin(a * 4 + p[0]) * 0.5 + Math.sin(a * 7 + p[1]) * 0.3 + Math.sin(a * 11 + p[2]) * 0.2
    const rr = r + wob * k
    d += (i ? 'L' : 'M') + (100 + rr * Math.cos(a)).toFixed(1) + ' ' + (100 + rr * Math.sin(a)).toFixed(1)
  }
  return d + 'Z'
}
const circ = (r) => `M${100 - r} 100a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0Z`

function zigzag(rows, rot, color, w, op) {
  let p = ''
  for (let k = 0; k < rows; k++) {
    const y = 30 + k * (140 / (rows - 1)), x = k % 2 ? 20 : 180
    p += (k ? 'L' : 'M') + x + ' ' + y.toFixed(1) + ' '
  }
  return <path key="zz" d={p} transform={`rotate(${rot} 100 100)`} fill="none" stroke={color} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" strokeOpacity={op} />
}

function sprinkles(type, seed) {
  const R = rnd(seed + 9)
  const out = []
  const place = (n, fn) => {
    for (let i = 0; i < n; i++) {
      const a = R() * 6.283, r = 45 + Math.sqrt(R()) * 36
      fn(100 + r * Math.cos(a), 100 + r * Math.sin(a), i)
    }
  }
  const sticks = (n, pal) => place(n, (x, y, i) => {
    const c = pal[Math.floor(R() * pal.length)], rot = (R() * 180).toFixed(0)
    out.push(<rect key={i} x={(x - 5).toFixed(1)} y={(y - 1.4).toFixed(1)} width="10" height="2.8" rx="1.4" fill={c} transform={`rotate(${rot} ${x.toFixed(1)} ${y.toFixed(1)})`} />)
  })
  if (type === 'pearls') {
    place(26, (x, y, i) => {
      const r = 2 + R() * 1.8
      out.push(
        <g key={i}>
          <circle cx={(x + 0.8).toFixed(1)} cy={(y + 1.2).toFixed(1)} r={r.toFixed(1)} fill="#000" fillOpacity=".18" />
          <circle cx={x.toFixed(1)} cy={y.toFixed(1)} r={r.toFixed(1)} fill="#fffdf6" />
          <circle cx={(x - r * 0.3).toFixed(1)} cy={(y - r * 0.3).toFixed(1)} r={(r * 0.35).toFixed(1)} fill="#fff" />
        </g>
      )
    })
  } else if (type === 'rainbow') sticks(36, ['#ff3b6b', '#ffd23f', '#2ec4d6', '#ffffff', '#8de08f', '#ff9f43'])
  else if (type === 'mixed') sticks(36, ['#ffffff', '#5a3418', '#ff3b3b', '#ffb02e', '#8bd450'])
  else if (type === 'choc') sticks(30, ['#4a2a12', '#6b3d1c', '#3a1f0c'])
  else if (type === 'zigzag') out.push(zigzag(8, -8, '#3b2208', 3.6, 1))
  else if (type === 'drizzle') out.push(zigzag(11, 18, '#ffffff', 2.6, 0.92))
  else if (type === 'crumb') {
    place(44, (x, y, i) => {
      const c = ['#fff3d1', '#7a4818', '#e8c78d'][Math.floor(R() * 3)], w = 2 + R() * 3
      out.push(<rect key={i} x={(x - w / 2).toFixed(1)} y={(y - w / 2).toFixed(1)} width={w.toFixed(1)} height={(w * 0.8).toFixed(1)} rx="1" fill={c} transform={`rotate(${(R() * 90).toFixed(0)} ${x.toFixed(1)} ${y.toFixed(1)})`} />)
    })
  }
  return out
}

export default function Donut({ donut, bite = false }) {
  const uid = 'dn' + useId().replace(/\W/g, '')
  const g = donut.glaze
  const geo = useMemo(() => {
    const seed = hash(donut.id)
    const outer = blob(83, 4.2, seed + 2, 180)
    return {
      dough: blob(92, 1.6, seed + 1) + circ(31),
      outer,
      glaze: outer + blob(38, 1.8, seed + 3, 90),
      sprinkles: sprinkles(donut.spr, seed),
    }
  }, [donut.id, donut.spr])

  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id={uid + 'a'} cx=".38" cy=".32" r=".8">
          <stop offset="0" stopColor="#f6c47c" /><stop offset=".7" stopColor="#dc9a4e" /><stop offset="1" stopColor="#b9702f" />
        </radialGradient>
        <radialGradient id={uid + 'b'} cx=".35" cy=".28" r=".85">
          <stop offset="0" stopColor={g[0]} /><stop offset=".55" stopColor={g[1]} /><stop offset="1" stopColor={g[2]} />
        </radialGradient>
        <clipPath id={uid + 'c'}><path clipRule="evenodd" d={geo.glaze} /></clipPath>
        {bite && (
          <mask id={uid + 'm'}>
            <rect width="200" height="200" fill="#fff" />
            <circle cx="168" cy="52" r="20" fill="#000" /><circle cx="148" cy="30" r="16" fill="#000" /><circle cx="187" cy="76" r="14" fill="#000" />
          </mask>
        )}
      </defs>
      <g mask={bite ? `url(#${uid}m)` : undefined}>
        <path fillRule="evenodd" d={geo.dough} fill={`url(#${uid}a)`} />
        <circle cx="100" cy="100" r="31" fill="none" stroke="#9c5a24" strokeOpacity=".55" strokeWidth="3" />
        <path fillRule="evenodd" d={geo.glaze} fill={`url(#${uid}b)`} />
        <path d={geo.outer} fill="none" stroke={g[2]} strokeOpacity=".4" strokeWidth="1.4" />
        <g clipPath={`url(#${uid}c)`}>
          <ellipse cx="66" cy="50" rx="32" ry="8" transform="rotate(-32 66 50)" fill="#fff" fillOpacity=".38" />
          <ellipse cx="44" cy="86" rx="5" ry="15" transform="rotate(-18 44 86)" fill="#fff" fillOpacity=".22" />
          {geo.sprinkles}
        </g>
        <circle cx="100" cy="100" r="38.5" fill="none" stroke={g[2]} strokeOpacity=".45" strokeWidth="2.4" />
      </g>
    </svg>
  )
}
