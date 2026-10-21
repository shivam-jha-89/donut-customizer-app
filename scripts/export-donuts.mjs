/* Exports every donut as a standalone SVG into public/donuts/, using the same Donut component the site uses.
   Run:  node scripts/export-donuts.mjs
   (Edit a donut's colours in src/data/shop.js and run this again to refresh the files.) */
import { createServer } from 'vite'
import { renderToStaticMarkup } from 'react-dom/server'
import { createElement } from 'react'
import fs from 'node:fs'

const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' })
const { default: Donut } = await vite.ssrLoadModule('/src/components/Donut.jsx')
const { DONUTS } = await vite.ssrLoadModule('/src/data/shop.js')

fs.mkdirSync('public/donuts', { recursive: true })
for (const d of DONUTS) {
  const svg = renderToStaticMarkup(createElement(Donut, { donut: d })).replace('<svg ', '<svg width="1024" height="1024" ')
  fs.writeFileSync(`public/donuts/${d.id}.svg`, svg)
}
fs.writeFileSync('public/donuts/donuts.json', JSON.stringify(DONUTS.map(({ id, name, cat, price }) => ({ id, name, cat, price })), null, 2))
await vite.close()
console.log(`Exported ${DONUTS.length} donuts to public/donuts/`)
