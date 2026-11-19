import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import { useStore } from '../../context/StoreContext'
import { Field } from '../../components/ui'
import { Summary } from './Cart'
import { mad } from '../../utils/format'

export default function Checkout() {
  const { cart, user, total, orders, clearCart, toast, coupon, applyCoupon } = useStore(); const nav = useNavigate()
  const [step, setStep] = useState(1), [pay, setPay] = useState('cod'), [busy, setBusy] = useState(false), [errs, setErrs] = useState({}), [code, setCode] = useState('')
  const [f, setF] = useState({ name: user?.name || '', email: user?.email || '', phone: '', address: '', city: '', card: '', exp: '', cvc: '' })
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })
  if (!cart.length) return <div className="container-x py-32 text-center"><h1 className="text-3xl">Aucun article à commander</h1><Link to="/boutique" className="btn-primary mt-6">Boutique</Link></div>
  const validate = () => {
    const e = {}
    if (step === 1) {
      if (f.name.trim().length < 3) e.name = 'Nom requis'
      if (!/\S+@\S+\.\S+/.test(f.email)) e.email = 'E-mail invalide'
      if (!/^(\+212|0)[5-7]\d{8}$/.test(f.phone.replace(/\s/g, ''))) e.phone = 'Téléphone marocain invalide (ex. 0612345678)'
      if (f.address.trim().length < 5) e.address = 'Adresse requise'
      if (!f.city.trim()) e.city = 'Ville requise'
    } else if (pay === 'card') {
      if (!/^\d{16}$/.test(f.card.replace(/\s/g, ''))) e.card = '16 chiffres requis'
      if (!/^\d{2}\/\d{2}$/.test(f.exp)) e.exp = 'MM/AA'
      if (!/^\d{3}$/.test(f.cvc)) e.cvc = '3 chiffres'
    }
    setErrs(e); return !Object.keys(e).length
  }
  const next = () => validate() && setStep(step + 1)
  const place = () => {
    if (!validate()) return
    setBusy(true)
    setTimeout(() => { // simulated payment — no real gateway
      const id = `DP-${10500 + orders.items.length}`
      orders.add({ id, customer: f.name, email: f.email, date: new Date().toISOString().slice(0, 10), total, status: 'En préparation', items: cart.reduce((s, l) => s + l.qty, 0), city: f.city, lines: cart.map((l) => ({ name: l.product.name, qty: l.qty, price: l.product.price })), payment: pay })
      clearCart(); toast('Commande confirmée !'); nav(`/confirmation/${id}`)
    }, 1400)
  }
  return (
    <div className="container-x py-12"><h1 className="mb-8 text-4xl">Paiement</h1>
      <ol className="mb-10 flex gap-4 text-xs">{['Livraison', 'Paiement', 'Récapitulatif'].map((s, i) => <li key={s} className={`label-caps border-b-2 pb-2 ${step === i + 1 ? 'border-wine text-wine' : step > i + 1 ? 'border-rose' : 'border-line text-mute'}`}>{i + 1}. {s}</li>)}</ol>
      <div className="grid gap-10 md:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          {step === 1 && <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Nom complet" error={errs.name}><input className="input" value={f.name} onChange={set('name')} /></Field>
            <Field label="E-mail" error={errs.email}><input className="input" value={f.email} onChange={set('email')} /></Field>
            <Field label="Téléphone" error={errs.phone}><input className="input" value={f.phone} onChange={set('phone')} /></Field>
            <Field label="Ville" error={errs.city}><input className="input" value={f.city} onChange={set('city')} /></Field>
            <div className="sm:col-span-2"><Field label="Adresse" error={errs.address}><input className="input" value={f.address} onChange={set('address')} /></Field></div></div>}
          {step === 2 && <div className="space-y-4">
            {[['cod', 'Paiement à la livraison'], ['card', 'Carte bancaire (simulée)']].map(([k, l]) => <label key={k} className={`flex cursor-pointer items-center gap-3 border p-4 ${pay === k ? 'border-wine bg-blush/30' : 'border-line'}`}><input type="radio" className="accent-wine" checked={pay === k} onChange={() => setPay(k)} />{l}</label>)}
            {pay === 'card' && <div className="grid gap-4 sm:grid-cols-2"><div className="sm:col-span-2"><Field label="Numéro de carte" error={errs.card}><input className="input" inputMode="numeric" placeholder="4242 4242 4242 4242" value={f.card} onChange={set('card')} /></Field></div>
              <Field label="Expiration" error={errs.exp}><input className="input" placeholder="MM/AA" value={f.exp} onChange={set('exp')} /></Field><Field label="CVC" error={errs.cvc}><input className="input" value={f.cvc} onChange={set('cvc')} /></Field>
              <p className="text-xs text-mute sm:col-span-2">Démo : aucune donnée n’est envoyée ni enregistrée.</p></div>}</div>}
          {step === 3 && <div className="space-y-2 bg-white p-6 text-sm"><p><b>Livraison :</b> {f.name}, {f.address}, {f.city} · {f.phone}</p><p><b>Paiement :</b> {pay === 'cod' ? 'À la livraison' : `Carte •••• ${f.card.replace(/\s/g, '').slice(-4)}`}</p>
            {cart.map((l) => <p key={l.key}>{l.qty} × {l.product.name} — {mad(l.qty * l.product.price)}</p>)}</div>}
          <div className="flex gap-3 pt-4">{step > 1 && <button className="btn-outline" onClick={() => setStep(step - 1)}>Retour</button>}
            {step < 3 ? <button className="btn-primary" onClick={next}>Continuer</button> : <button disabled={busy} className="btn-primary" onClick={place}>{busy ? 'Traitement…' : `Payer ${mad(total)}`}</button>}</div>
        </div>
        <aside className="h-fit space-y-4 bg-white p-6">
          {!coupon && <div className="flex"><input className="input" placeholder="Code promo" aria-label="Code promo" value={code} onChange={(e) => setCode(e.target.value)} /><button className="btn-outline" onClick={() => applyCoupon(code)}>OK</button></div>}
          <Summary /></aside></div></div>
  )
}
export function Confirmation() {
  const { id } = useParams(); const { orders } = useStore(); const o = orders.items.find((x) => x.id === id)
  return <div className="container-x max-w-xl py-24 text-center"><CheckCircle2 className="mx-auto text-wine" size={56} /><h1 className="mt-4 text-4xl">Merci pour votre commande !</h1>
    <p className="mt-3 text-mute">Commande <b>{id}</b>{o ? ` · ${mad(o.total)}` : ''}. Un e-mail de confirmation sera envoyé (simulation).</p>
    <div className="mt-8 flex justify-center gap-3"><Link to="/compte" className="btn-primary">Suivre ma commande</Link><Link to="/boutique" className="btn-outline">Continuer</Link></div></div>
}
