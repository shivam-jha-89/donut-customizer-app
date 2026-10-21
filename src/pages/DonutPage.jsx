import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Donut from '../components/Donut'
import { FavButton, Stepper, Swoosh, Wave, useDocTitle, usePageTheme } from '../components/ui'
import { BOX_PRICE, D, DONUTS, rs } from '../data/shop'
import { useShop } from '../context/ShopContext'
import { NotFound } from './Info'

const tint = (d) => ({ '--tint': d.theme.band2, '--tint-ink': d.theme.ink })

export default function DonutPage() {
  const { id } = useParams()
  const d = D[id]
  if (!d) return <NotFound />
  return <Detail key={d.id} d={d} />
}

function Detail({ d }) {
  const { addDonut } = useShop()
  const [qty, setQty] = useState(1)
  usePageTheme(d.id)
  useDocTitle(d.name)

  const more = [...DONUTS.filter((x) => x.id !== d.id && x.cat === d.cat), ...DONUTS.filter((x) => x.id !== d.id && x.cat !== d.cat)].slice(0, 4)

  return (
    <>
      <section className="hero hero--pdp">
        <Swoosh />
        <div className="hero-grid">
          <div className="stage" aria-hidden="true"><div className="big is-active"><Donut donut={d} /></div></div>
          <div className="hero-side">
            <p className="crumbs"><Link to="/menu">Menu</Link> / {d.cat}</p>
            <h1 className="ptitle script">{d.name}</h1>
            <p style={{ maxWidth: '46ch', marginTop: 14, fontSize: '1.08rem' }}>{d.long}</p>
            <div className="chips">{d.notes.map((n) => <span className="chip" key={n}>{n}</span>)}</div>
            <div className="pdp-buy">
              <span className="price" style={{ fontSize: '1.5rem' }}>{rs(d.price)}</span>
              <Stepper value={qty} label="Quantity" minusDisabled={qty <= 1} plusDisabled={qty >= 24}
                onMinus={() => setQty((q) => Math.max(1, q - 1))} onPlus={() => setQty((q) => Math.min(24, q + 1))} />
              <button type="button" className="btn btn-themed" onClick={() => addDonut(d.id, qty)}>Add to cart</button>
              <FavButton id={d.id} />
            </div>
          </div>
        </div>
        <Wave />
      </section>

      <section className="wrap details">
        <div>
          <h2 className="script">About this donut</h2>
          <table className="facts">
            <tbody>
              <tr><th scope="row">Type</th><td>{d.cat}</td></tr>
              <tr><th scope="row">Calories</th><td>{d.kcal} kcal per donut</td></tr>
              <tr><th scope="row">Contains</th><td>{d.allergens}</td></tr>
              <tr><th scope="row">Best within</th><td>Eight hours of baking</td></tr>
            </tbody>
          </table>
        </div>
        <div>
          <h2 className="script">Take a box instead</h2>
          <p className="prose mt-s">A box of 6 costs {rs(BOX_PRICE[6])}, so each donut comes to {rs(BOX_PRICE[6] / 6)}. Mix this flavour with others and the box fills up as you go.</p>
          <Link className="btn btn-solid mt-m" to="/shop">Build a box</Link>
        </div>
      </section>

      <section className="wrap section pt-0">
        <div className="sec-head"><h2 className="script">More to try</h2></div>
        <div className="morerow">
          {more.map((m) => (
            <Link className="mcard" key={m.id} to={`/donut/${m.id}`} style={tint(m)}>
              <Donut donut={m} /><b>{m.name}</b><span>{rs(m.price)}</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
