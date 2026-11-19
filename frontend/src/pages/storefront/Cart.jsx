import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { useStore } from '../../context/StoreContext'
import { Img } from '../../components/ui'
import { mad } from '../../utils/format'

export function Summary() {
  const { subtotal, discount, shipping, total } = useStore()
  return <div className="space-y-2 text-sm"><div className="flex justify-between"><span>Sous-total</span><span>{mad(subtotal)}</span></div>
    {discount > 0 && <div className="flex justify-between text-wine"><span>Réduction</span><span>-{mad(discount)}</span></div>}
    <div className="flex justify-between"><span>Livraison</span><span>{shipping ? mad(shipping) : 'Offerte'}</span></div>
    <div className="flex justify-between border-t border-line pt-3 font-serif text-2xl"><span>Total</span><span>{mad(total)}</span></div></div>
}
export default function Cart() {
  const { cart, setQty, applyCoupon } = useStore(); const [code, setCode] = useState('')
  if (!cart.length) return <div className="container-x py-32 text-center"><h1 className="text-4xl">Votre panier est vide</h1><Link to="/boutique" className="btn-primary mt-8">Continuer vos achats</Link></div>
  return (
    <div className="container-x py-12"><h1 className="mb-10 text-4xl">Panier</h1>
      <div className="grid gap-10 md:grid-cols-[1fr_360px]">
        <ul className="divide-y divide-line">{cart.map((l) => <li key={l.key} className="flex gap-5 py-5">
          <Img src={l.product.img} alt="" className="h-28 w-24 shrink-0" />
          <div className="flex-1"><Link to={`/produit/${l.id}`} className="font-semibold">{l.product.name}</Link><p className="text-xs text-mute">{l.variant}</p><p className="mt-1 text-wine">{mad(l.product.price)}</p>
            <div className="mt-3 flex items-center gap-4"><div className="flex items-center border border-line"><button aria-label="Moins" className="p-2" onClick={() => setQty(l.key, l.qty - 1)}><Minus size={13} /></button><span className="w-8 text-center text-sm">{l.qty}</span><button aria-label="Plus" className="p-2" onClick={() => setQty(l.key, l.qty + 1)}><Plus size={13} /></button></div>
              <button aria-label="Supprimer" onClick={() => setQty(l.key, 0)}><Trash2 size={16} /></button></div></div>
          <p className="font-bold">{mad(l.product.price * l.qty)}</p></li>)}</ul>
        <aside className="h-fit space-y-5 bg-white p-6">
          <div className="flex"><input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Code promo" aria-label="Code promo" className="input" /><button onClick={() => applyCoupon(code)} className="btn-outline">OK</button></div>
          <Summary /><Link to="/paiement" className="btn-primary w-full">Passer la commande</Link></aside></div></div>
  )
}
