import { useState } from 'react'
import { Link } from 'react-router-dom'
import Donut from '../components/Donut'
import { AddButton, FavButton, PageBand, useDocTitle, usePageTheme } from '../components/ui'
import { CATEGORIES, D, DONUTS, rs } from '../data/shop'
import { useShop } from '../context/ShopContext'

export default function Menu() {
  const { theme } = useShop()
  const [cat, setCat] = useState('All')
  usePageTheme(theme)
  useDocTitle('Menu')
  const list = DONUTS.filter((d) => cat === 'All' || d.cat === cat)

  return (
    <>
      <PageBand title="Menu" sub="Ten flavours, baked in small batches. Tap a name to see what goes into it." deco={theme} />
      <section className="wrap section pt-s">
        <div className="filters" role="group" aria-label="Filter by type">
          {CATEGORIES.map((c) => (
            <button key={c} type="button" className="fchip" aria-pressed={cat === c} onClick={() => setCat(c)}>{c}</button>
          ))}
        </div>
        <ul>
          {list.map((d) => (
            <li className="menu-row" key={d.id}>
              <Link className="md" to={`/donut/${d.id}`} tabIndex={-1} aria-hidden="true"><Donut donut={D[d.id]} /></Link>
              <div>
                <div className="nameline">
                  <Link to={`/donut/${d.id}`}>{d.name}{d.tag && <span className="tag">{d.tag}</span>}</Link>
                  <span className="dots" aria-hidden="true" />
                  <span className="price">{rs(d.price)}</span>
                </div>
                <p>{d.blurb}</p>
              </div>
              <div className="mact"><FavButton id={d.id} /><AddButton id={d.id} /></div>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
