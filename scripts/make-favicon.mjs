/* Builds public/favicon.svg: a simplified version of the Lemon Pearl donut (fewer details so it stays readable at 16px).
   Same shape generator as src/components/Donut.jsx. Run: node scripts/make-favicon.mjs */
import fs from 'node:fs'

const hash = (s) => { let h = 2166136261; for (const c of s) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619) } return h >>> 0 }
const rnd = (seed) => { let a = seed >>> 0; return () => { a = (a + 0x6d2b79f5) >>> 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296 } }
const blob = (r, wob, seed, n) => {
  const R = rnd(seed), p = [R() * 6.28, R() * 6.28, R() * 6.28]
  let d = ''
  for (let i = 0; i < n; i++) {
    const a = (i / n) * 6.2832
    const k = Math.sin(a * 4 + p[0]) * 0.5 + Math.sin(a * 7 + p[1]) * 0.3 + Math.sin(a * 11 + p[2]) * 0.2
    d += (i ? 'L' : 'M') + Math.round(100 + (r + wob * k) * Math.cos(a)) + ' ' + Math.round(100 + (r + wob * k) * Math.sin(a))
  }
  return d + 'Z'
}
const circ = (r) => `M${100 - r} 100a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0Z`

const seed = hash('lemon-pearl')
const R = rnd(seed + 9)
let pearls = ''
for (let i = 0; i < 9; i++) {
  const a = (i / 9) * 6.2832 + R() * 0.5, r = 52 + R() * 24
  pearls += `<circle cx="${Math.round(100 + r * Math.cos(a))}" cy="${Math.round(100 + r * Math.sin(a))}" r="${(5 + R() * 2).toFixed(1)}"/>`
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
<defs>
<radialGradient id="a" cx=".38" cy=".32" r=".8"><stop offset="0" stop-color="#f6c47c"/><stop offset=".7" stop-color="#dc9a4e"/><stop offset="1" stop-color="#b9702f"/></radialGradient>
<radialGradient id="b" cx=".35" cy=".28" r=".85"><stop offset="0" stop-color="#fff59a"/><stop offset=".55" stop-color="#fde047"/><stop offset="1" stop-color="#e5b800"/></radialGradient>
</defs>
<path fill-rule="evenodd" fill="url(#a)" d="${blob(94, 1.6, seed + 1, 72)}${circ(34)}"/>
<path fill-rule="evenodd" fill="url(#b)" d="${blob(84, 4.2, seed + 2, 72)}${blob(41, 1.8, seed + 3, 40)}"/>
<ellipse cx="62" cy="48" rx="30" ry="8" transform="rotate(-32 62 48)" fill="#fff" fill-opacity=".45"/>
<g fill="#fffdf6">${pearls}</g>
</svg>
`
fs.mkdirSync('public', { recursive: true })
fs.writeFileSync('public/favicon.svg', svg)
console.log('public/favicon.svg', svg.length, 'bytes')
