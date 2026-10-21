import { useEffect, useRef, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { rs } from '../data/shop'
import { useShop } from '../context/ShopContext'
import { CartLines, Icon } from './ui'

const NAV = [
  ['/', 'Home'],
  ['/menu', 'Menu'],
  ['/shop', 'Shop'],
  ['/contact', 'Contact'],
]

function Header() {
  const { count, user, openDrawer } = useShop()
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)

  useEffect(() => setOpen(false), [pathname])

  const isActive = (to) => (to === '/' ? pathname === '/' : pathname === to || (to === '/menu' && pathname.startsWith('/donut/')))

  return (
    <header className="site-header">
      <Link className="brand script" to="/">Donuts</Link>
      <div className="hright">
        <nav id="nav" className={`nav${open ? ' open' : ''}`} aria-label="Main">
          <ul>
            {NAV.map(([to, label]) => (
              <li key={to}>
                <Link className="pill" to={to} aria-current={isActive(to) ? 'page' : undefined}>{label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <button type="button" className="icon-btn" onClick={openDrawer} aria-label={`Open cart, ${count} item${count === 1 ? '' : 's'}`}>
          <Icon.Cart />
          <span className="badge" data-n={count}>{count}</span>
        </button>
        <Link className="icon-btn" to={user ? '/account' : '/signin'} aria-label={user ? `Account, ${user.name}` : 'Sign in'}><Icon.User /></Link>
        <button type="button" className="icon-btn navtoggle" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="nav" aria-label="Menu">
          <Icon.Menu />
        </button>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="fgrid">
          <div>
            <p className="brandf script">Donuts</p>
            <p style={{ marginTop: 10, maxWidth: '30ch', opacity: 0.85 }}>Soft dough, real glazes, baked in small batches every morning.</p>
          </div>
          <div><h3>Shop</h3><ul><li><Link to="/menu">Menu</Link></li><li><Link to="/shop">Boxes</Link></li><li><Link to="/cart">Cart</Link></li></ul></div>
          <div><h3>About</h3><ul><li><Link to="/story">Our story</Link></li><li><Link to="/locations">Locations</Link></li><li><Link to="/faq">FAQ</Link></li></ul></div>
          <div><h3>Help</h3><ul><li><Link to="/contact">Contact</Link></li><li><Link to="/account">Your orders</Link></li><li><Link to="/signin">Sign in</Link></li></ul></div>
        </div>
        <p className="fbot">© {new Date().getFullYear()} Donuts. All donuts are baked fresh each day.</p>
      </div>
    </footer>
  )
}

function CartDrawer() {
  const { drawerOpen, closeDrawer, cart, subtotal } = useShop()
  const ref = useRef(null)
  const closeRef = useRef(null)
  const lastFocus = useRef(null)
  const { pathname } = useLocation()

  /* keep the drawer out of the tab order and screen readers while closed */
  useEffect(() => { if (ref.current) ref.current.inert = !drawerOpen }, [drawerOpen])

  useEffect(() => {
    if (drawerOpen) {
      lastFocus.current = document.activeElement
      const t = setTimeout(() => closeRef.current?.focus(), 60)
      return () => clearTimeout(t)
    }
    if (lastFocus.current && document.contains(lastFocus.current)) lastFocus.current.focus({ preventScroll: true })
  }, [drawerOpen])

  useEffect(() => { closeDrawer() }, [pathname]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div className={`scrim${drawerOpen ? ' open' : ''}`} onClick={closeDrawer} />
      <aside ref={ref} className={`drawer${drawerOpen ? ' open' : ''}`} role="dialog" aria-modal="true" aria-label="Your cart" aria-hidden={!drawerOpen}>
        <header>
          <h2 className="script">Your cart</h2>
          <button ref={closeRef} type="button" className="close" onClick={closeDrawer} aria-label="Close cart"><Icon.Close /></button>
        </header>
        <div className="dbody">
          {cart.length ? <CartLines /> : (
            <div className="empty">
              <p>Your cart is empty.</p>
              <Link className="btn btn-solid btn-sm" to="/menu">Browse the menu</Link>
            </div>
          )}
        </div>
        {cart.length > 0 && (
          <div className="dfoot">
            <div className="srow total" style={{ border: 0, margin: 0, padding: 0 }}><span>Subtotal</span><span>{rs(subtotal)}</span></div>
            <Link className="btn btn-solid" to="/checkout">Checkout</Link>
            <Link className="btn btn-line" to="/cart">View cart</Link>
          </div>
        )}
      </aside>
    </>
  )
}

function Toast() {
  const { toast } = useShop()
  return <div className={`toast${toast ? ' show' : ''}`} role="status" aria-live="polite">{toast}</div>
}

export default function Layout() {
  const { pathname } = useLocation()
  const { closeDrawer } = useShop()
  const mainRef = useRef(null)
  const first = useRef(true)

  /* new page: scroll to top and move focus to the content (skipped on first load) */
  useEffect(() => {
    if (first.current) { first.current = false; return }
    window.scrollTo(0, 0)
    mainRef.current?.focus({ preventScroll: true })
  }, [pathname])

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') closeDrawer() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [closeDrawer])

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Header />
      <main id="main" ref={mainRef} tabIndex={-1}><Outlet /></main>
      <Footer />
      <CartDrawer />
      <Toast />
    </>
  )
}
