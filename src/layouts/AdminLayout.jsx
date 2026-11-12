import { useState } from 'react'
import { NavLink, Outlet, Link } from 'react-router-dom'
import { LayoutDashboard, Package, Tags, ShoppingCart, Users, Boxes, Percent, MessageSquare, Settings, Menu, ArrowLeft } from 'lucide-react'
import { useStore } from '../context/StoreContext'
import { Toasts } from '../components/ui'

export const ADMIN_NAV = [['/admin', 'Tableau de bord', LayoutDashboard], ['/admin/produits', 'Produits', Package], ['/admin/categories', 'Catégories', Tags], ['/admin/commandes', 'Commandes', ShoppingCart],
  ['/admin/clients', 'Clients', Users], ['/admin/stock', 'Stock', Boxes], ['/admin/promotions', 'Promotions', Percent], ['/admin/avis', 'Avis', MessageSquare], ['/admin/parametres', 'Paramètres', Settings]]

export default function AdminLayout() {
  const { toasts } = useStore(); const [open, setOpen] = useState(false)
  return <div className="min-h-screen bg-cream md:flex">
    <aside className={`${open ? 'block' : 'hidden'} w-full shrink-0 bg-burgundy p-5 text-ivory md:block md:w-64`}>
      <p className="mb-8 font-serif text-2xl">DuniPretty <span className="label-caps block text-[9px] text-blush">Atelier admin</span></p>
      <nav className="space-y-1">{ADMIN_NAV.map(([to, l, I]) => <NavLink key={to} to={to} end={to === '/admin'} onClick={() => setOpen(false)} className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 text-sm transition ${isActive ? 'bg-white/15 font-semibold' : 'hover:bg-white/10'}`}><I size={17} />{l}</NavLink>)}</nav>
      <Link to="/" className="mt-8 flex items-center gap-2 text-xs text-ivory/60 hover:text-white"><ArrowLeft size={14} />Retour à la boutique</Link></aside>
    <div className="min-w-0 flex-1"><header className="flex items-center gap-3 border-b border-line bg-white px-5 py-4 md:hidden"><button aria-label="Menu" onClick={() => setOpen(!open)}><Menu /></button><b>Admin</b></header>
      <main className="p-5 md:p-10"><Outlet /></main></div><Toasts toasts={toasts} /></div>
}
