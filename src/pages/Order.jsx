import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Icon, PageBand, useDocTitle, usePageTheme } from '../components/ui'
import { rs } from '../data/shop'
import { useShop } from '../context/ShopContext'
import { NotFound } from './Info'

function Tracker({ order }) {
  const [, tick] = useState(0)
  useEffect(() => {
    const t = setInterval(() => tick((n) => n + 1), 4000)
    return () => clearInterval(t)
  }, [])

  const steps = order.method === 'pickup'
    ? ['Order received', 'Baking and glazing', 'Ready for pickup', 'Collected']
    : ['Order received', 'Baking and glazing', 'Out for delivery', 'Delivered']
  const m = (Date.now() - order.at) / 60000
  const cur = m < 0.5 ? 0 : m < 2 ? 1 : m < 4 ? 2 : 3

  return (
    <ol className="track">
      {steps.map((s, k) => {
        const done = k < cur || cur === 3
        return (
          <li key={s} className={done ? 'done' : k === cur ? 'now' : ''} aria-current={k === cur ? 'step' : undefined}>
            <span className="dot">{done ? <Icon.Check /> : null}</span>
            <span>{s}</span>
          </li>
        )
      })}
    </ol>
  )
}

export default function Order() {
  const { id } = useParams()
  const { orders } = useShop()
  const o = orders.find((x) => x.id === id)
  return o ? <OrderView o={o} /> : <NotFound />
}

function OrderView({ o }) {
  usePageTheme('pistachio-zig')
  useDocTitle(`Order ${o.id}`)
  return (
    <>
      <PageBand title="Order placed" sub={<>Thanks, {o.name.split(' ')[0]}. Order <b>{o.id}</b> is in the queue.</>} deco="pistachio-zig" />
      <section className="wrap section pt-s">
        <div className="ok-panel">
          <Tracker order={o} />
          <p className="note">This tracker moves quickly so you can see how it works.</p>
          <ul className="mt-m">
            {o.items.map((l, k) => <li className="srow" key={k}><span>{l.qty}× {l.name}</span><span>{rs(l.price * l.qty)}</span></li>)}
            <li className="srow total"><span>Total, pay on {o.method === 'pickup' ? 'collection' : 'delivery'}</span><span>{rs(o.total)}</span></li>
          </ul>
          <p className="mt-m">
            {o.method === 'pickup' ? <>Collect from <b>{o.branch}</b></> : <>Delivering to <b>{o.address}</b></>}. Time: {o.slot}.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 24 }}>
            <Link className="btn btn-solid" to="/menu">Order more</Link>
            <Link className="btn btn-line" to="/account">All my orders</Link>
          </div>
        </div>
      </section>
    </>
  )
}
