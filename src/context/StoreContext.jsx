import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import useCollection from '../hooks/useCollection'
import { COUPONS, FREE_SHIPPING, uid } from '../utils/format'
import { PRODUCTS, ORDERS } from '../data/seed'

const Ctx = createContext(null)
export const useStore = () => useContext(Ctx)

const read = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d } catch { return d } }

export function StoreProvider({ children }) {
  const products = useCollection('dp_products', PRODUCTS)
  const orders = useCollection('dp_orders', ORDERS)
  const [cart, setCart] = useState(() => read('dp_cart', []))
  const [wishlist, setWishlist] = useState(() => read('dp_wish', []))
  const [user, setUser] = useState(() => read('dp_user', null))
  const [coupon, setCoupon] = useState(null)
  const [drawer, setDrawer] = useState(false)
  const [toasts, setToasts] = useState([])

  const persist = (k, v, set) => { set(v); localStorage.setItem(k, JSON.stringify(v)) }
  const toast = useCallback((msg, type = 'ok') => {
    const id = uid('t'); setToasts((t) => [...t, { id, msg, type }])
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200)
  }, [])

  const addToCart = (p, variant, qty = 1) => {
    const key = `${p.id}|${variant || ''}`
    const next = cart.some((i) => i.key === key)
      ? cart.map((i) => (i.key === key ? { ...i, qty: Math.min(i.qty + qty, 10) } : i))
      : [...cart, { key, id: p.id, variant, qty }]
    persist('dp_cart', next, setCart); setDrawer(true); toast(`${p.name} ajouté au panier`)
  }
  const setQty = (key, qty) => persist('dp_cart', qty < 1 ? cart.filter((i) => i.key !== key) : cart.map((i) => (i.key === key ? { ...i, qty: Math.min(qty, 10) } : i)), setCart)
  const clearCart = () => { persist('dp_cart', [], setCart); setCoupon(null) }
  const toggleWish = (p) => {
    const has = wishlist.includes(p.id)
    persist('dp_wish', has ? wishlist.filter((x) => x !== p.id) : [...wishlist, p.id], setWishlist)
    toast(has ? 'Retiré de vos favoris' : 'Ajouté à vos favoris')
  }
  const applyCoupon = (code) => {
    const c = code.trim().toUpperCase()
    const found = COUPONS[c] ?? (read('dp_coupons', []).find((x) => x.code === c && x.active === 'Oui')?.discount)
    if (found) { setCoupon({ code: c, pct: found }); toast(`Code ${c} appliqué (-${found} %)`) } else toast('Code promo invalide', 'err')
  }
  const login = (u) => persist('dp_user', u, setUser)
  const logout = () => { persist('dp_user', null, setUser); toast('À bientôt !') }

  const lines = useMemo(() => cart.map((i) => ({ ...i, product: products.items.find((p) => p.id === i.id) })).filter((l) => l.product), [cart, products.items])
  const subtotal = lines.reduce((s, l) => s + l.product.price * l.qty, 0)
  const discount = coupon ? Math.round((subtotal * coupon.pct) / 100) : 0
  const shipping = subtotal - discount >= FREE_SHIPPING || !subtotal ? 0 : 35
  const total = subtotal - discount + shipping
  const count = cart.reduce((s, i) => s + i.qty, 0)

  const value = { products, orders, cart: lines, count, subtotal, discount, shipping, total, coupon, applyCoupon, addToCart, setQty, clearCart,
    wishlist, toggleWish, user, login, logout, drawer, setDrawer, toasts, toast }
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}
