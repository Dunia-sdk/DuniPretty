import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Heart, Menu, Search, ShoppingBag, User, X, ChevronDown } from 'lucide-react'
import { useStore } from '../context/StoreContext'
import CartDrawer from '../components/CartDrawer'
import { Toasts } from '../components/ui'
import { CATEGORIES } from '../data/seed'

const NAV = [['/', 'Accueil'], ['/boutique', 'Boutique'], ['/a-propos', 'À propos'], ['/journal', 'Journal'], ['/contact', 'Contact']]

function Header() {
  const { count, wishlist, user, setDrawer } = useStore()
  const [menu, setMenu] = useState(false), [search, setSearch] = useState(false), [q, setQ] = useState(''), [dd, setDd] = useState(false)
  const nav = useNavigate(), { pathname } = useLocation()
  useEffect(() => { setMenu(false); setSearch(false); setDd(false) }, [pathname])
  const submit = (e) => { e.preventDefault(); nav(`/boutique?q=${encodeURIComponent(q)}`); setQ('') }
  return (
    <header className="sticky top-0 z-50 border-b border-line/60 bg-ivory/90 backdrop-blur-md">
      <div className="bg-wine py-2 text-center text-[11px] tracking-wide text-white">Livraison offerte dès 500 DH · Code <b>GLOW15</b> = -15 %</div>
      <div className="container-x flex h-20 items-center justify-between">
        <button className="md:hidden" aria-label="Menu" onClick={() => setMenu(true)}><Menu /></button>
        <Link to="/" className="text-center leading-none"><span className="font-serif text-3xl font-semibold tracking-wide text-burgundy">DuniPretty</span><span className="label-caps block text-[9px] text-rose">Beauty</span></Link>
        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map(([to, label]) => (
            <div key={to} className="relative" onMouseEnter={() => to === '/boutique' && setDd(true)} onMouseLeave={() => setDd(false)}>
              <NavLink to={to} end={to === '/'} className={({ isActive }) => `label-caps relative flex items-center gap-1 py-2 ${isActive ? 'text-wine' : 'text-ink'}`}>
                {({ isActive }) => <>{label}{to === '/boutique' && <ChevronDown size={12} />}{isActive && <motion.span layoutId="nav-dot" className="absolute -bottom-0.5 left-0 h-px w-full bg-wine" />}</>}
              </NavLink>
              {to === '/boutique' && (
                <AnimatePresence>{dd && (
                  <motion.ul initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} className="absolute left-0 top-full w-52 border border-line bg-white py-2 shadow-xl">
                    {CATEGORIES.map((c) => <li key={c.id}><Link className="block px-5 py-2 text-sm hover:bg-blush/40" to={`/boutique?cat=${c.id}`}>{c.name}</Link></li>)}
                  </motion.ul>)}</AnimatePresence>)}
            </div>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <button aria-label="Recherche" onClick={() => setSearch((s) => !s)}><Search size={20} /></button>
          <Link aria-label="Favoris" to="/favoris" className="relative hidden sm:block"><Heart size={20} />{wishlist.length > 0 && <span className="absolute -right-2 -top-2 grid h-4 w-4 place-items-center rounded-full bg-wine text-[9px] text-white">{wishlist.length}</span>}</Link>
          <Link aria-label="Compte" to={user ? '/compte' : '/connexion'}><User size={20} /></Link>
          <button aria-label="Panier" className="relative" onClick={() => setDrawer(true)}><ShoppingBag size={20} />
            <AnimatePresence>{count > 0 && <motion.span key={count} initial={{ scale: 1.8 }} animate={{ scale: 1 }} className="absolute -right-2 -top-2 grid h-4 w-4 place-items-center rounded-full bg-wine text-[9px] text-white">{count}</motion.span>}</AnimatePresence></button>
        </div>
      </div>
      <AnimatePresence>{search && (
        <motion.form onSubmit={submit} initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden border-t border-line bg-white">
          <div className="container-x py-4"><input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Rechercher un sérum, une crème…" className="input" /></div></motion.form>)}</AnimatePresence>
      <AnimatePresence>{menu && (
        <motion.div className="fixed inset-0 z-[80] bg-ivory p-6 md:hidden" initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'tween', duration: 0.35 }}>
          <button aria-label="Fermer" onClick={() => setMenu(false)} className="mb-8"><X /></button>
          <ul className="space-y-6 font-serif text-3xl">{[...NAV, ['/favoris', 'Favoris'], [user ? '/compte' : '/connexion', 'Mon compte']].map(([to, l]) => <li key={to}><Link to={to}>{l}</Link></li>)}</ul>
        </motion.div>)}</AnimatePresence>
    </header>
  )
}

function Footer() {
  const { toast } = useStore(); const [email, setEmail] = useState('')
  return (
    <footer className="mt-24 bg-burgundy text-ivory/90">
      <div className="container-x grid gap-10 py-16 md:grid-cols-4">
        <div><p className="font-serif text-3xl">DuniPretty</p><p className="mt-3 text-sm text-ivory/70">Une beauté propre, efficace et luxueuse, pensée pour le Maroc.</p></div>
        <div><p className="label-caps mb-4">Boutique</p>{CATEGORIES.slice(0, 5).map((c) => <Link key={c.id} to={`/boutique?cat=${c.id}`} className="block py-1 text-sm hover:underline">{c.name}</Link>)}</div>
        <div><p className="label-caps mb-4">Aide</p>{[['/faq', 'FAQ'], ['/contact', 'Contact'], ['/compte', 'Suivre ma commande'], ['/a-propos', 'Notre laboratoire']].map(([t, l]) => <Link key={t} to={t} className="block py-1 text-sm hover:underline">{l}</Link>)}</div>
        <form onSubmit={(e) => { e.preventDefault(); if (!/\S+@\S+\.\S+/.test(email)) return toast('E-mail invalide', 'err'); toast('Merci pour votre inscription !'); setEmail('') }}>
          <p className="label-caps mb-4">Newsletter</p><div className="flex"><input value={email} onChange={(e) => setEmail(e.target.value)} aria-label="E-mail" placeholder="Votre e-mail" className="w-full bg-white/10 px-3 py-2 text-sm outline-none placeholder:text-ivory/50" />
            <button className="bg-rose px-4 text-xs font-bold uppercase">OK</button></div>
          <Link to="/admin" className="mt-6 inline-block text-xs text-ivory/50 hover:text-ivory">Espace administrateur →</Link>
        </form>
      </div>
      <p className="border-t border-white/10 py-5 text-center text-xs text-ivory/60">© 2026 DuniPretty Beauty. Paiement et authentification simulés (démo).</p>
    </footer>
  )
}

export default function StoreLayout() {
  const { pathname } = useLocation(); const { toasts } = useStore()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return (
    <div className="min-h-screen"><Header />
      <AnimatePresence mode="wait"><motion.main key={pathname} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}><Outlet /></motion.main></AnimatePresence>
      <Footer /><CartDrawer /><Toasts toasts={toasts} />
    </div>
  )
}
