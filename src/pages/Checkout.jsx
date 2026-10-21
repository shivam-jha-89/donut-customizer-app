import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Field, PageBand, useDocTitle, usePageTheme } from '../components/ui'
import { BRANCHES, rs } from '../data/shop'
import { useShop } from '../context/ShopContext'
import { EmptyCart } from './Cart'

const SLOTS = ['As soon as possible', '12:00 to 1:00 pm', '3:00 to 4:00 pm', '6:00 to 7:00 pm']

export default function Checkout() {
  const { cart, subtotal, discount, after, fee, promo, user, placeOrder } = useShop()
  const navigate = useNavigate()
  const formRef = useRef(null)
  const [method, setMethod] = useState('delivery')
  const [errors, setErrors] = useState({})
  usePageTheme('blueberry-sky')
  useDocTitle('Checkout')

  if (!cart.length) return (<><PageBand title="Checkout" deco="blueberry-sky" /><EmptyCart /></>)

  const delivery = fee(method === 'pickup')

  const submit = (e) => {
    e.preventDefault()
    const f = new FormData(formRef.current)
    const v = (k) => String(f.get(k) || '').trim()
    const err = {}
    if (!v('name')) err.name = 'Enter your name so we know who to hand it to.'
    if (v('phone').replace(/\D/g, '').length < 10) err.phone = 'Enter a phone number with at least 10 digits.'
    if (method === 'delivery' && !v('address')) err.address = 'Enter the address we should deliver to.'
    setErrors(err)
    const first = Object.keys(err)[0]
    if (first) { formRef.current.elements[first]?.focus(); return }

    const order = {
      id: 'D' + Date.now().toString(36).toUpperCase().slice(-5),
      at: Date.now(),
      items: cart.map((l) => ({ name: l.name, price: l.price, qty: l.qty })),
      subtotal, discount, delivery, total: after + delivery,
      method, name: v('name'), phone: v('phone'), address: v('address'), branch: v('branch'), slot: v('slot'), pay: v('pay'),
    }
    placeOrder(order)
    navigate(`/order/${order.id}`)
  }

  const bad = (k) => (errors[k] ? { className: 'bad', 'aria-invalid': true } : {})

  return (
    <>
      <PageBand title="Checkout" sub="Tell us where to send it. You pay when it arrives or when you collect." deco="blueberry-sky" />
      <section className="wrap section pt-s">
        <div className="two">
          <form ref={formRef} onSubmit={submit} noValidate>
            <fieldset className="radios">
              <legend>How do you want it?</legend>
              <label><input type="radio" name="method" value="delivery" checked={method === 'delivery'} onChange={() => setMethod('delivery')} />Delivery</label>
              <label><input type="radio" name="method" value="pickup" checked={method === 'pickup'} onChange={() => setMethod('pickup')} />Pickup from a branch</label>
            </fieldset>
            <div className="cols2">
              <Field id="ck-name" label="Full name" error={errors.name}>
                <input id="ck-name" name="name" autoComplete="name" defaultValue={user?.name || ''} {...bad('name')} />
              </Field>
              <Field id="ck-phone" label="Phone number" error={errors.phone}>
                <input id="ck-phone" name="phone" inputMode="tel" autoComplete="tel" {...bad('phone')} />
              </Field>
            </div>
            {method === 'delivery' ? (
              <Field id="ck-addr" label="Delivery address" error={errors.address}>
                <textarea id="ck-addr" name="address" style={{ minHeight: 90 }} autoComplete="street-address" {...bad('address')} />
              </Field>
            ) : (
              <Field id="ck-branch" label="Branch">
                <select id="ck-branch" name="branch">{BRANCHES.map((b) => <option key={b.name}>{b.name}</option>)}</select>
              </Field>
            )}
            <div className="cols2">
              <Field id="ck-slot" label="When">
                <select id="ck-slot" name="slot">{SLOTS.map((s) => <option key={s}>{s}</option>)}</select>
              </Field>
              <fieldset className="radios" style={{ alignContent: 'start' }}>
                <legend>Payment</legend>
                <label><input type="radio" name="pay" value="cash" defaultChecked />Cash</label>
                <label><input type="radio" name="pay" value="card" />Card machine</label>
              </fieldset>
            </div>
            <button className="btn btn-solid" type="submit">Place order</button>
          </form>

          <aside className="summary">
            <h2>Your order</h2>
            <ul>{cart.map((l) => <li className="srow" key={l.key}><span>{l.qty}× {l.name}</span><span>{rs(l.price * l.qty)}</span></li>)}</ul>
            <div className="srow" style={{ borderTop: '2px solid var(--line)', marginTop: 8, paddingTop: 12 }}><span>Subtotal</span><span>{rs(subtotal)}</span></div>
            {discount > 0 && <div className="srow ok"><span>Code {promo}</span><span>−{rs(discount)}</span></div>}
            <div className="srow"><span>Delivery</span><span>{delivery ? rs(delivery) : 'Free'}</span></div>
            <div className="srow total"><span>Total</span><span>{rs(after + delivery)}</span></div>
          </aside>
        </div>
      </section>
    </>
  )
}
