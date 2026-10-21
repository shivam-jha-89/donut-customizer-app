import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CartLines, PageBand, useDocTitle, usePageTheme } from '../components/ui'
import { rs } from '../data/shop'
import { useShop } from '../context/ShopContext'

export function EmptyCart() {
  return (
    <section className="wrap section">
      <div className="empty">
        <h2 className="script">Nothing in here yet</h2>
        <p>Add a few donuts and they will show up here.</p>
        <Link className="btn btn-solid" to="/menu">Browse the menu</Link>
      </div>
    </section>
  )
}

export default function Cart() {
  const { cart, count, subtotal, discount, after, fee, promo, applyPromo } = useShop()
  const [code, setCode] = useState(promo || '')
  const [msg, setMsg] = useState('')
  usePageTheme('choco-dream')
  useDocTitle('Your cart')

  const delivery = fee(false)
  return (
    <>
      <PageBand title="Your cart" sub={cart.length ? `${count} item${count > 1 ? 's' : ''} ready to go in the oven.` : ''} deco="choco-dream" />
      {!cart.length ? <EmptyCart /> : (
        <section className="wrap section pt-s">
          <div className="two">
            <CartLines />
            <aside className="summary">
              <h2>Order summary</h2>
              <div className="srow"><span>Subtotal</span><span>{rs(subtotal)}</span></div>
              {discount > 0 && <div className="srow ok"><span>Code {promo}</span><span>−{rs(discount)}</span></div>}
              <div className="srow"><span>Delivery</span><span>{delivery ? rs(delivery) : 'Free'}</span></div>
              <form className="promo" onSubmit={(e) => { e.preventDefault(); setMsg(applyPromo(code).msg) }}>
                <label className="sr" htmlFor="promo">Promo code</label>
                <input id="promo" placeholder="Promo code" value={code} onChange={(e) => setCode(e.target.value)} />
                <button type="submit" className="btn btn-line btn-sm">Apply</button>
              </form>
              <p className="note" role="status">{msg}</p>
              <div className="srow total"><span>Total</span><span>{rs(after + delivery)}</span></div>
              <p className="note">Pickup orders have no delivery fee. You choose at checkout.</p>
              <Link className="btn btn-solid full mt-m" to="/checkout">Go to checkout</Link>
            </aside>
          </div>
        </section>
      )}
    </>
  )
}
