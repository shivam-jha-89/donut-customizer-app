import { useState } from 'react'
import Donut from '../components/Donut'
import { Icon, PageBand, Stepper, useDocTitle, usePageTheme } from '../components/ui'
import { BOX_COLS, BOX_PRICE, BOX_SIZES, CURATED, D, DONUTS, flattenPicks, rs } from '../data/shop'
import { useShop } from '../context/ShopContext'

const total = (picks) => Object.values(picks).reduce((a, n) => a + n, 0)

function Builder() {
  const { addBox } = useShop()
  const [size, setSize] = useState(6)
  const [picks, setPicks] = useState({})
  const n = total(picks)
  const full = n >= size
  const flat = flattenPicks(picks)

  const changeSize = (s) => {
    setSize(s)
    /* if the new box is smaller, drop the most recently added flavours first */
    setPicks((p) => {
      let over = total(p) - s
      const next = { ...p }
      for (const id of Object.keys(next).reverse()) {
        while (over > 0 && next[id] > 0) { next[id]--; over-- }
        if (!next[id]) delete next[id]
      }
      return next
    })
  }
  const bump = (id, d) => setPicks((p) => {
    const c = (p[id] || 0) + d
    if (c < 0 || (d > 0 && total(p) >= size)) return p
    const next = { ...p }
    if (c) next[id] = c; else delete next[id]
    return next
  })

  return (
    <div className="builder">
      <div>
        <h3 className="script h-sm">1. Choose a box size</h3>
        <div className="seg" role="group" aria-label="Box size">
          {BOX_SIZES.map((s) => (
            <button key={s} type="button" aria-pressed={size === s} onClick={() => changeSize(s)}>
              <b>Box of {s}</b><span>{rs(BOX_PRICE[s])}</span>
            </button>
          ))}
        </div>
        <h3 className="script h-sm">2. Pick your flavours</h3>
        <div>
          {DONUTS.map((d) => (
            <div className="pickrow" key={d.id}>
              <Donut donut={d} />
              <div><b>{d.name}</b><small>{d.cat}</small></div>
              <Stepper value={picks[d.id] || 0} label={`${d.name} in box`} minusDisabled={!(picks[d.id] > 0)} plusDisabled={full}
                onMinus={() => bump(d.id, -1)} onPlus={() => bump(d.id, 1)} />
            </div>
          ))}
        </div>
      </div>

      <aside className="boxcard" aria-label="Your box">
        <h3 className="script h-sm">Your box</h3>
        <div className="slots" style={{ '--cols': BOX_COLS[size] }}>
          {Array.from({ length: size }, (_, k) => flat[k]
            ? <div className="slot" key={k}><Donut donut={D[flat[k]]} /></div>
            : <div className="slot empty-slot" key={k} />)}
        </div>
        <div className="bsum"><span role="status">{n} of {size} picked</span><strong>{rs(BOX_PRICE[size])}</strong></div>
        <div className="bacts">
          <button type="button" className="btn btn-solid" disabled={!full} onClick={() => { addBox(size, picks); setPicks({}) }}>Add box to cart</button>
          <button type="button" className="btn btn-line btn-sm" onClick={() => setPicks({})}>Clear</button>
        </div>
        {!full && <p className="note mt-s">Pick {size - n} more to fill the box.</p>}
      </aside>
    </div>
  )
}

export default function Shop() {
  const { addBox } = useShop()
  usePageTheme('strawberry-rush')
  useDocTitle('Shop')
  return (
    <>
      <PageBand title="Shop" sub="Boxes for sharing. Fill your own or take one we have already put together." deco="strawberry-rush" />
      <section className="wrap section pt-s"><Builder /></section>
      <section className="wrap section">
        <div className="sec-head"><h2 className="script">Ready-made boxes</h2></div>
        <div className="curated">
          {CURATED.map((c) => (
            <article className="ccard" key={c.id}>
              <div className="mini" aria-hidden="true">{flattenPicks(c.picks).map((id, k) => <Donut key={k} donut={D[id]} />)}</div>
              <h3>{c.name} <span className="muted" style={{ fontWeight: 400 }}>({c.size})</span></h3>
              <p>{c.blurb}</p>
              <div className="trow">
                <span className="price">{rs(BOX_PRICE[c.size])}</span>
                <button type="button" className="btn btn-solid btn-sm" onClick={() => addBox(c.size, c.picks, c.name)}><Icon.Plus />Add box</button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
