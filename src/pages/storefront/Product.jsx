import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Heart, Minus, Plus, Truck } from 'lucide-react'
import { useStore } from '../../context/StoreContext'
import { Img, Stars, SectionTitle } from '../../components/ui'
import ProductCard from '../../components/ProductCard'
import { mad } from '../../utils/format'

export default function Product() {
  const { id } = useParams(); const { products, addToCart, toggleWish, wishlist } = useStore()
  const p = products.items.find((x) => x.id === id)
  const [shade, setShade] = useState(null), [qty, setQty] = useState(1), [tab, setTab] = useState('desc'), [zoom, setZoom] = useState(false)
  if (!p) return <div className="container-x py-32 text-center"><h1 className="text-3xl">Produit introuvable</h1><Link to="/boutique" className="btn-primary mt-6">Retour à la boutique</Link></div>
  const variant = shade ?? p.shades?.[0]
  return (
    <div className="container-x py-12">
      <p className="mb-6 text-xs text-mute"><Link to="/">Accueil</Link> / <Link to="/boutique">Boutique</Link> / {p.name}</p>
      <div className="grid gap-12 md:grid-cols-2">
        <div className="cursor-zoom-in overflow-hidden" onMouseEnter={() => setZoom(true)} onMouseLeave={() => setZoom(false)}>
          <Img src={p.img} alt={p.name} className={`aspect-square [&_img]:transition-transform [&_img]:duration-700 ${zoom ? '[&_img]:scale-125' : ''}`} /></div>
        <div>
          {p.badge && <span className="label-caps bg-blush px-2 py-1 text-wine">{p.badge}</span>}
          <h1 className="mt-3 text-4xl">{p.name}</h1>
          <div className="mt-3"><Stars value={p.rating} count={p.reviews} /></div>
          <p className="mt-4 text-2xl font-bold text-wine">{mad(p.price)} {p.old > 0 && <s className="ml-2 text-base font-normal text-mute/60">{mad(p.old)}</s>}</p>
          <p className="mt-5 text-mute">{p.desc}</p>
          {p.shades && <div className="mt-6"><p className="label-caps mb-2">Variante : {variant}</p><div className="flex flex-wrap gap-2">
            {p.shades.map((s) => <button key={s} onClick={() => setShade(s)} aria-pressed={variant === s} className={`border px-4 py-2 text-sm transition ${variant === s ? 'border-wine bg-wine text-white' : 'border-line hover:border-wine'}`}>{s}</button>)}</div></div>}
          <p className={`mt-5 text-sm ${p.stock < 1 ? 'text-red-700' : p.stock < 10 ? 'text-amber-700' : 'text-green-800'}`}>{p.stock < 1 ? 'Épuisé' : p.stock < 10 ? `Plus que ${p.stock} en stock` : 'En stock'}</p>
          <div className="mt-6 flex gap-3">
            <div className="flex items-center border border-line"><button aria-label="Moins" className="p-3" onClick={() => setQty(Math.max(1, qty - 1))}><Minus size={14} /></button><span className="w-8 text-center">{qty}</span><button aria-label="Plus" className="p-3" onClick={() => setQty(Math.min(10, qty + 1))}><Plus size={14} /></button></div>
            <button disabled={p.stock < 1} onClick={() => addToCart(p, variant, qty)} className="btn-primary flex-1">Ajouter au panier</button>
            <button aria-label="Favoris" onClick={() => toggleWish(p)} className="border border-line p-3"><Heart className={wishlist.includes(p.id) ? 'fill-wine text-wine' : ''} /></button></div>
          <p className="mt-5 flex items-center gap-2 text-xs text-mute"><Truck size={16} />Livraison 24-72 h partout au Maroc · Paiement à la livraison</p>
          <div className="mt-10 flex gap-6 border-b border-line">{[['desc', 'Description'], ['ing', 'Ingrédients'], ['use', 'Utilisation']].map(([k, l]) => <button key={k} onClick={() => setTab(k)} className={`label-caps pb-3 ${tab === k ? 'border-b-2 border-wine text-wine' : ''}`}>{l}</button>)}</div>
          <p className="py-5 text-sm text-mute">{tab === 'desc' ? p.desc : tab === 'ing' ? p.ingredients : 'Appliquer matin et soir sur une peau propre. Éviter le contour des yeux sauf indication contraire.'}</p>
        </div>
      </div>
      <div className="pt-24"><SectionTitle kicker="Complétez votre rituel" title="Vous aimerez aussi" />
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">{products.items.filter((x) => x.id !== p.id && x.category === p.category).concat(products.items).filter((x, i, a) => x.id !== p.id && a.indexOf(x) === i).slice(0, 4).map((x, i) => <ProductCard key={x.id} p={x} index={i} />)}</div></div>
    </div>
  )
}
