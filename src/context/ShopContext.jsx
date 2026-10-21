import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { D, DELIVERY_FEE, FREE_DELIVERY_FROM, PROMO_CODE, boxLine } from '../data/shop'

const KEY = 'donuts-shop-v1'
const Ctx = createContext(null)
export const useShop = () => useContext(Ctx)

function load() {
  const base = { cart: [], favs: [], user: null, orders: [], promo: null, theme: 'lemon-pearl' }
  try {
    const j = JSON.parse(localStorage.getItem(KEY) || '{}')
    for (const k of Object.keys(base)) if (j[k] !== undefined) base[k] = j[k]
  } catch (e) { /* storage unavailable: start empty */ }
  if (!D[base.theme]) base.theme = 'lemon-pearl'
  return base
}

export function ShopProvider({ children }) {
  const [state, setState] = useState(load)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [toast, setToast] = useState('')
  const toastTimer = useRef(null)

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(state)) } catch (e) { /* ignore */ }
  }, [state])

  const patch = useCallback((p) => setState((s) => ({ ...s, ...(typeof p === 'function' ? p(s) : p) })), [])

  const showToast = useCallback((msg) => {
    setToast(msg)
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(''), 2600)
  }, [])

  /* ---- cart ---- */
  const addLine = useCallback((line, open = true) => {
    patch((s) => {
      const ex = s.cart.find((l) => l.key === line.key)
      return { cart: ex ? s.cart.map((l) => (l === ex ? { ...l, qty: l.qty + line.qty } : l)) : [...s.cart, line] }
    })
    if (open) setDrawerOpen(true)
  }, [patch])

  const addDonut = useCallback((id, qty = 1) => {
    const d = D[id]
    addLine({ key: 'd:' + id, kind: 'donut', id, name: d.name, price: d.price, qty })
  }, [addLine])

  const addBox = useCallback((size, picks, name) => addLine(boxLine(size, picks, name)), [addLine])

  const changeQty = useCallback((key, delta) => {
    patch((s) => ({
      cart: s.cart.map((l) => (l.key === key ? { ...l, qty: l.qty + delta } : l)).filter((l) => l.qty > 0),
    }))
  }, [patch])

  const removeLine = useCallback((key) => patch((s) => ({ cart: s.cart.filter((l) => l.key !== key) })), [patch])

  /* ---- promo ---- */
  const applyPromo = useCallback((code) => {
    const v = (code || '').trim().toUpperCase()
    if (!v) { patch({ promo: null }); return { ok: false, msg: 'Enter a code first.' } }
    if (v === PROMO_CODE) { patch({ promo: PROMO_CODE }); return { ok: true, msg: 'Code applied. 10% off your donuts.' } }
    patch({ promo: null })
    return { ok: false, msg: 'That code is not valid. Check the spelling and try again.' }
  }, [patch])

  /* ---- favourites ---- */
  const toggleFav = useCallback((id) => {
    let on = false
    patch((s) => {
      on = !s.favs.includes(id)
      return { favs: on ? [...s.favs, id] : s.favs.filter((x) => x !== id) }
    })
    showToast(`${D[id].name} ${on ? 'saved to' : 'removed from'} favourites`)
  }, [patch, showToast])

  /* ---- account ---- */
  const signIn = useCallback((user) => patch({ user }), [patch])
  const signOut = useCallback(() => { patch({ user: null }); showToast('You are signed out') }, [patch, showToast])

  /* ---- orders ---- */
  const placeOrder = useCallback((order) => {
    patch((s) => ({ orders: [order, ...s.orders], cart: [], promo: null }))
  }, [patch])

  const setTheme = useCallback((id) => patch({ theme: id }), [patch])

  /* ---- derived totals ---- */
  const totals = useMemo(() => {
    const count = state.cart.reduce((a, l) => a + l.qty, 0)
    const subtotal = state.cart.reduce((a, l) => a + l.price * l.qty, 0)
    const discount = state.promo === PROMO_CODE ? Math.round(subtotal * 0.1) : 0
    const after = subtotal - discount
    const fee = (pickup) => (pickup || after >= FREE_DELIVERY_FROM ? 0 : DELIVERY_FEE)
    return { count, subtotal, discount, after, fee }
  }, [state.cart, state.promo])

  const value = {
    ...state, ...totals,
    drawerOpen, openDrawer: () => setDrawerOpen(true), closeDrawer: () => setDrawerOpen(false),
    toast, showToast,
    addLine, addDonut, addBox, changeQty, removeLine,
    applyPromo, toggleFav, signIn, signOut, placeOrder, setTheme,
  }
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}
