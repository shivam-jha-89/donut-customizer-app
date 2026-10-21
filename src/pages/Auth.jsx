import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Donut from '../components/Donut'
import { Field, PageBand, mailOk, useDocTitle, usePageTheme } from '../components/ui'
import { D, rs } from '../data/shop'
import { useShop } from '../context/ShopContext'

export function SignIn() {
  const { signIn, showToast } = useShop()
  const navigate = useNavigate()
  const formRef = useRef(null)
  const [up, setUp] = useState(false)
  const [errors, setErrors] = useState({})
  usePageTheme('lemon-pearl')
  useDocTitle(up ? 'Create account' : 'Sign in')

  const switchTab = (v) => { setUp(v); setErrors({}) }

  const submit = (e) => {
    e.preventDefault()
    const f = new FormData(formRef.current)
    const v = (k) => String(f.get(k) || '').trim()
    const err = {}
    if (up && !v('name')) err.name = 'Enter your name.'
    if (!mailOk(v('email'))) err.email = 'Enter an email like name@example.com.'
    if (v('password').length < 6) err.password = 'Use at least 6 characters.'
    setErrors(err)
    const first = Object.keys(err)[0]
    if (first) { formRef.current.elements[first]?.focus(); return }

    const email = v('email')
    const name = up ? v('name') : email.split('@')[0].replace(/[._-]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
    signIn({ name, email })
    showToast(up ? 'Account created' : 'Signed in')
    navigate('/account')
  }

  const bad = (k) => (errors[k] ? { className: 'bad', 'aria-invalid': true } : {})

  return (
    <>
      <PageBand title={up ? 'Join us' : 'Welcome back'} deco="lemon-pearl" />
      <section className="authwrap pt-s">
        <div className="authcard">
          <div className="tabs" role="group" aria-label="Sign in or create account">
            <button type="button" aria-pressed={!up} onClick={() => switchTab(false)}>Sign in</button>
            <button type="button" aria-pressed={up} onClick={() => switchTab(true)}>Create account</button>
          </div>
          <form ref={formRef} onSubmit={submit} noValidate key={up ? 'up' : 'in'}>
            {up && (
              <Field id="a-name" label="Your name" error={errors.name}>
                <input id="a-name" name="name" autoComplete="name" {...bad('name')} />
              </Field>
            )}
            <Field id="a-mail" label="Email" error={errors.email}>
              <input id="a-mail" name="email" type="email" autoComplete="email" {...bad('email')} />
            </Field>
            <Field id="a-pass" label="Password" error={errors.password}>
              <input id="a-pass" name="password" type="password" autoComplete={up ? 'new-password' : 'current-password'} {...bad('password')} />
            </Field>
            <button className="btn btn-solid full" type="submit">{up ? 'Create account' : 'Sign in'}</button>
          </form>
          <p className="note mt-m">Accounts are saved only in this browser. No password is stored.</p>
        </div>
      </section>
    </>
  )
}

export function Account() {
  const { user, orders, favs, theme, signOut } = useShop()
  const navigate = useNavigate()
  usePageTheme(theme)
  useDocTitle('Your account')
  const favDonuts = favs.map((id) => D[id]).filter(Boolean)

  return (
    <>
      <PageBand title={`Hi, ${user.name.split(' ')[0]}`} sub={user.email} deco={theme} />
      <section className="wrap section pt-s">
        <div className="two">
          <div>
            <h2 className="script">Your orders</h2>
            {orders.length ? (
              <ul className="orders">
                {orders.map((o) => (
                  <li key={o.id}>
                    <Link to={`/order/${o.id}`}>Order {o.id}</Link>
                    <strong>{rs(o.total)}</strong>
                    <span className="muted">{new Date(o.at).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' })} · {o.items.reduce((a, l) => a + l.qty, 0)} items</span>
                    <span className="muted" style={{ textAlign: 'right' }}>{o.method === 'pickup' ? 'Pickup' : 'Delivery'}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="empty left">
                <p>You have not ordered yet.</p>
                <Link className="btn btn-solid" to="/menu">Browse the menu</Link>
              </div>
            )}
          </div>
          <aside>
            <h2 className="script">Favourites</h2>
            {favDonuts.length ? (
              <div className="favs mt-s">
                {favDonuts.map((d) => <Link key={d.id} to={`/donut/${d.id}`}><Donut donut={d} />{d.name}</Link>)}
              </div>
            ) : <p className="muted mt-s">Tap the heart on any donut to save it here.</p>}
            <button type="button" className="btn btn-line mt-l" onClick={() => { signOut(); navigate('/') }}>Sign out</button>
          </aside>
        </div>
      </section>
    </>
  )
}
