import { useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { useStore } from '../../context/StoreContext'
import { mad } from '../../utils/format'

const STEPS = ['En préparation', 'Expédiée', 'Livrée']
export default function Account() {
  const { user, logout, orders, wishlist } = useStore(); const [tab, setTab] = useState('orders')
  if (!user) return <Navigate to="/connexion" replace />
  const mine = orders.items.filter((o) => o.email === user.email || o.customer === user.name || o.email === 'salma@mail.ma')
  return <div className="container-x py-12"><div className="mb-8 flex items-center justify-between"><div><p className="label-caps text-rose">Mon sanctuaire</p><h1 className="text-4xl">Bonjour, {user.name}</h1></div><button onClick={logout} className="btn-outline">Déconnexion</button></div>
    <div className="mb-8 flex gap-6 border-b border-line">{[['orders', 'Commandes'], ['profile', 'Profil']].map(([k, l]) => <button key={k} onClick={() => setTab(k)} className={`label-caps pb-3 ${tab === k ? 'border-b-2 border-wine text-wine' : ''}`}>{l}</button>)}<Link to="/favoris" className="label-caps pb-3">Favoris ({wishlist.length})</Link></div>
    {tab === 'profile' ? <div className="max-w-md space-y-2 bg-white p-6 text-sm"><p><b>Nom :</b> {user.name}</p><p><b>E-mail :</b> {user.email}</p></div>
      : <div className="space-y-5">{mine.length ? mine.map((o) => { const idx = STEPS.indexOf(o.status)
        return <div key={o.id} className="bg-white p-6"><div className="flex flex-wrap justify-between gap-2"><b>{o.id}</b><span className="text-sm text-mute">{o.date} · {mad(o.total)} · {o.items} article(s)</span></div>
          {idx >= 0 ? <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">{STEPS.map((s, i) => <div key={s}><div className={`h-1 ${i <= idx ? 'bg-wine' : 'bg-line'}`} /><p className={`mt-1 ${i <= idx ? 'text-wine' : 'text-mute'}`}>{s}</p></div>)}</div> : <p className="mt-3 text-sm text-red-700">{o.status}</p>}</div> }) : <p className="text-mute">Aucune commande.</p>}</div>}</div>
}
