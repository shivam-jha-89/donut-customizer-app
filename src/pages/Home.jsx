import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Donut from '../components/Donut'
import { Swoosh, usePageTheme, useDocTitle } from '../components/ui'
import { BOX_PRICE, D, DELIVERY_FEE, DONUTS, FREE_DELIVERY_FROM, HERO, PROMO_CODE, TESTIMONIALS, rs } from '../data/shop'
import { useShop } from '../context/ShopContext'
import { Icon } from '../components/ui'

const tint = (d, strong) => ({ '--tint': strong ? d.theme.band : d.theme.band2, '--tint-ink': d.theme.ink })

function Hero() {
  const { theme, setTheme, addDonut } = useShop()
  const [i, setI] = useState(Math.max(0, HERO.findIndex((h) => h.id === theme)))
  const pickRefs = useRef([])
  usePageTheme(HERO[i].id, { home: true })

  const choose = (k) => { setI(k); setTheme(HERO[k].id) }
  const onKey = (e) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    e.preventDefault()
    const k = (i + (e.key === 'ArrowRight' ? 1 : -1) + HERO.length) % HERO.length
    choose(k)
    pickRefs.current[k]?.focus()
  }
  const others = HERO.filter((_, k) => k !== i)

  return (
    <section className="hero hero--home" aria-label="Featured flavours">
      <Swoosh />
      {others.map((d, n) => <div key={d.id} className={`sat sat-${n + 1}`} aria-hidden="true"><Donut donut={d} /></div>)}
      <div className="hero-grid">
        <div className="stage" aria-hidden="true">
          {HERO.map((d, k) => (
            <div key={d.id} className={`big ${k === i ? 'is-active' : k < i ? 'is-before' : ''}`}><Donut donut={d} /></div>
          ))}
        </div>
        <div className="hero-side">
          <h1 className="title script">Donuts</h1>
          <div className="copy">
            {HERO.map((d, k) => {
              const on = k === i
              return (
                <div key={d.id} className={`copy-item${on ? ' is-active' : ''}`} aria-hidden={on ? undefined : true}>
                  <h2>{d.name}</h2>
                  <p>{d.blurb}</p>
                  <div className="price-row">
                    <span className="price">{rs(d.price)}</span>
                    <button type="button" className="btn btn-themed" tabIndex={on ? undefined : -1} onClick={() => addDonut(d.id)}><Icon.Plus />Add to cart</button>
                    <Link className="btn btn-line" tabIndex={on ? undefined : -1} to={`/donut/${d.id}`}>Details</Link>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="picker" role="group" aria-label="Choose a flavour" onKeyDown={onKey}>
            {HERO.map((d, k) => (
              <button key={d.id} ref={(el) => (pickRefs.current[k] = el)} type="button" className="pick" aria-pressed={k === i} aria-label={d.name} onClick={() => choose(k)}>
                <Donut donut={d} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  useDocTitle('Donuts | Baked fresh daily')
  const fresh = ['pistachio-zig', 'strawberry-rush', 'caramel-crunch', 'lavender-honey'].map((id) => D[id])

  return (
    <>
      <Hero />

      <section className="intro">
        <div className="wrap" style={{ padding: 0 }}>
          <p className="script lead">Rolled, proofed and glazed by hand, every morning before nine.</p>
          <Link className="link" to="/story">Read our story</Link>
        </div>
      </section>

      <section className="wrap section">
        <div className="sec-head"><h2 className="script">Fresh from today's tray</h2><Link className="link" to="/menu">See the full menu</Link></div>
        <div className="tray">
          {fresh.map((d, k) => (
            <Link key={d.id} className={`tcard t${k}`} to={`/donut/${d.id}`} style={tint(d, k === 0)}>
              <span className="tdonut" aria-hidden="true"><Donut donut={d} /></span>
              <h3>{d.name}</h3>
              <p>{d.blurb}</p>
              <span className="trow"><span className="price">{rs(d.price)}</span></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="boxband">
        <div className="wrap">
          <div className="kraft" aria-hidden="true">
            <div className="kraft-grid">{Array.from({ length: 12 }, (_, k) => <Donut key={k} donut={DONUTS[k % 10]} />)}</div>
          </div>
          <div>
            <h2 className="script">Build a box of your own</h2>
            <p>Pick 4, 6, 12 or 24 and mix any flavours. The box fills up as you choose, and boxes cost less than buying the same donuts one by one.</p>
            <p>Boxes start at {rs(BOX_PRICE[4])}.</p>
            <Link className="btn btn-cream" to="/shop">Build your box</Link>
          </div>
        </div>
      </section>

      <section className="wrap section">
        <h2 className="script">From our oven to your door</h2>
        <ol className="steps">
          <li><h3>Pick your flavours</h3><p>Order from the menu or fill a box. Mix anything with anything.</p></li>
          <li><h3>We bake and glaze</h3><p>Your order goes into the next tray, so nothing sits on a shelf waiting for you.</p></li>
          <li><h3>Collect or get it delivered</h3><p>Pick up from a branch or have it brought to your door. Delivery is {rs(DELIVERY_FEE)}, and free above {rs(FREE_DELIVERY_FROM)}.</p></li>
        </ol>
      </section>

      <section className="wrap section">
        <h2 className="script">What regulars say</h2>
        <div className="quotes">
          {TESTIMONIALS.map((q) => (
            <blockquote key={q.who}>
              <p>{q.text}</p>
              <footer><Donut donut={D[q.donut]} /><span>{q.who}</span></footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="wrap">
        <div className="cta">
          <h2 className="script">Free delivery over {rs(FREE_DELIVERY_FROM)}</h2>
          <p>Use the code {PROMO_CODE} in your cart for 10% off.</p>
          <div className="acts">
            <Link className="btn btn-themed" to="/menu">Order now</Link>
            <Link className="btn btn-line" to="/locations">Find a branch</Link>
          </div>
          <div className="deco" aria-hidden="true"><Donut donut={D['choco-dream']} /></div>
        </div>
      </section>
    </>
  )
}
