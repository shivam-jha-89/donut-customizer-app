import { useEffect } from 'react'
import { D, rs } from '../data/shop'
import { useShop } from '../context/ShopContext'
import Donut from './Donut'

/* ---------------- icons ---------------- */
export const Icon = {
  Cart: () => <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true"><path d="M7 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm10 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM1 2v2h2l3.6 7.6-1.4 2.4A2 2 0 0 0 7 17h12v-2H7.4l1.1-2h7.5a2 2 0 0 0 1.7-1l3.6-6.5A1 1 0 0 0 20.4 4H5.2l-.9-2H1Z" /></svg>,
  User: () => <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 3.2a3.3 3.3 0 1 1 0 6.6 3.3 3.3 0 0 1 0-6.6ZM12 20a8 8 0 0 1-6.2-3c.7-1.9 3.7-2.9 6.2-2.9s5.5 1 6.2 2.9A8 8 0 0 1 12 20Z" /></svg>,
  Plus: () => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>,
  Minus: () => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true"><path d="M5 12h14" /></svg>,
  Close: () => <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>,
  Check: () => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7" /></svg>,
  Menu: () => <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" /></svg>,
  Heart: ({ filled }) => <svg viewBox="0 0 24 24" width="22" height="22" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" aria-hidden="true"><path d="M12 20.5s-8-4.9-8-11A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 8 2.5c0 6.1-8 11-8 11Z" /></svg>,
}

/* ---------------- page theme ----------------
   Sets the colour variables for the whole page from a donut's theme. */
export function usePageTheme(id, { home = false } = {}) {
  useEffect(() => {
    const t = (D[id] || D['lemon-pearl']).theme
    const r = document.documentElement.style
    r.setProperty('--band', t.band)
    r.setProperty('--band2', t.band2)
    r.setProperty('--on-band', t.ink)
    r.setProperty('--btn-bg', t.dark ? '#fff1c2' : '#3a2605')
    r.setProperty('--btn-fg', t.dark ? '#3a2605' : '#fff1c2')
    document.querySelector('meta[name=theme-color]')?.setAttribute('content', t.band)
  }, [id])
  useEffect(() => {
    document.body.classList.toggle('is-home', home)
    return () => document.body.classList.remove('is-home')
  }, [home])
}

export function useDocTitle(title) {
  useEffect(() => { document.title = title && !title.startsWith('Donuts') ? `${title} | Donuts` : title || 'Donuts' }, [title])
}

/* ---------------- decoration ---------------- */
export const Swoosh = () => (
  <svg className="swoosh" viewBox="0 0 1440 900" preserveAspectRatio="none" aria-hidden="true" focusable="false">
    <path className="soft" d="M-100 690C120 560 360 640 500 790C545 838 580 876 600 900L-100 900Z" />
    <path d="M540 0C610 140 650 300 790 400C950 515 1190 470 1440 640L1440 900L700 900C830 780 710 690 570 640C400 585 330 330 440 160C475 105 510 50 540 0Z" />
  </svg>
)

export const Wave = () => (
  <svg className="wave" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true" focusable="false">
    <path d="M0 44C220 92 470 4 720 44S1200 92 1440 34V80H0Z" />
  </svg>
)

export function PageBand({ title, sub, deco, children }) {
  return (
    <section className="page-band">
      <div className="wrap">
        <h1 className="script">{title}</h1>
        {sub ? <p>{sub}</p> : null}
        {children}
      </div>
      {deco ? <div className="deco" aria-hidden="true"><Donut donut={D[deco]} /></div> : null}
      <Wave />
    </section>
  )
}

/* ---------------- controls ---------------- */
export function Stepper({ value, onMinus, onPlus, minusDisabled, plusDisabled, label }) {
  return (
    <div className="stepper" role="group" aria-label={label}>
      <button type="button" onClick={onMinus} disabled={minusDisabled} aria-label="Fewer">{<Icon.Minus />}</button>
      <output>{value}</output>
      <button type="button" onClick={onPlus} disabled={plusDisabled} aria-label="More">{<Icon.Plus />}</button>
    </div>
  )
}

export function AddButton({ id, className = 'btn-solid btn-sm' }) {
  const { addDonut } = useShop()
  return (
    <button type="button" className={`btn ${className}`} onClick={() => addDonut(id)} aria-label={`Add ${D[id].name} to cart`}>
      <Icon.Plus />Add
    </button>
  )
}

export function FavButton({ id }) {
  const { favs, toggleFav } = useShop()
  const on = favs.includes(id)
  return (
    <button type="button" className="heart" onClick={() => toggleFav(id)} aria-pressed={on} aria-label={`Save ${D[id].name} to favourites`}>
      <Icon.Heart filled={on} />
    </button>
  )
}

/* ---------------- cart lines (cart page + drawer) ---------------- */
export function CartLines() {
  const { cart, changeQty, removeLine } = useShop()
  return (
    <ul>
      {cart.map((l) => (
        <li className="line" key={l.key}>
          <span className="md"><Donut donut={D[l.kind === 'box' ? Object.keys(l.picks)[0] : l.id]} /></span>
          <div>
            <h3>{l.name}</h3>
            {l.kind === 'box' && <small>{Object.entries(l.picks).map(([id, n]) => `${n}× ${D[id].name}`).join(', ')}</small>}
            <small>{rs(l.price)} each</small>
          </div>
          <div className="lr">
            <Stepper value={l.qty} onMinus={() => changeQty(l.key, -1)} onPlus={() => changeQty(l.key, 1)} label={`Quantity of ${l.name}`} />
            <strong>{rs(l.price * l.qty)}</strong>
            <button type="button" className="rm" onClick={() => removeLine(l.key)}>Remove</button>
          </div>
        </li>
      ))}
    </ul>
  )
}

/* ---------------- forms ---------------- */
export function Field({ id, label, error, children }) {
  return (
    <div className="fld">
      <label htmlFor={id}>{label}</label>
      {children}
      <span className="err" role={error ? 'alert' : undefined}>{error}</span>
    </div>
  )
}

export const mailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
