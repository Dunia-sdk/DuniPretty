import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal } from 'lucide-react'
import { CATEGORIES } from '../../data/seed'
import { useStore } from '../../context/StoreContext'
import ProductCard from '../../components/ProductCard'

export default function Shop() {
  const { products } = useStore()
  const [sp, setSp] = useSearchParams()
  const cat = sp.get('cat') || 'all', q = sp.get('q') || '', sort = sp.get('sort') || 'pop'
  const [max, setMax] = useState(500), [inStock, setInStock] = useState(false), [open, setOpen] = useState(false)
  const set = (k, v) => { const n = new URLSearchParams(sp); v ? n.set(k, v) : n.delete(k); setSp(n) }
  const list = useMemo(() => {
    let l = products.items.filter((p) => (cat === 'all' || p.category === cat) && p.price <= max && (!inStock || p.stock > 0) &&
      (!q || `${p.name} ${p.desc}`.toLowerCase().includes(q.toLowerCase())) && (sort !== 'promo' || p.old > 0))
    const s = { 'price-asc': (a, b) => a.price - b.price, 'price-desc': (a, b) => b.price - a.price, rating: (a, b) => b.rating - a.rating, pop: (a, b) => b.reviews - a.reviews }[sort]
    return s ? [...l].sort(s) : l
  }, [products.items, cat, q, max, inStock, sort])
  return (
    <div className="container-x py-12">
      <h1 className="text-4xl md:text-5xl">{q ? `Résultats pour « ${q} »` : 'La boutique'}</h1>
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-line py-4">
        <button className="label-caps flex items-center gap-2 md:hidden" onClick={() => setOpen(!open)}><SlidersHorizontal size={16} />Filtres</button>
        <p className="text-sm text-mute">{list.length} produit(s)</p>
        <select aria-label="Trier" value={sort} onChange={(e) => set('sort', e.target.value)} className="input !w-auto">
          <option value="pop">Popularité</option><option value="rating">Mieux notés</option><option value="price-asc">Prix croissant</option><option value="price-desc">Prix décroissant</option><option value="promo">Promotions</option></select>
      </div>
      <div className="mt-8 grid gap-10 md:grid-cols-[220px_1fr]">
        <aside className={`${open ? 'block' : 'hidden'} space-y-8 md:block`}>
          <div><p className="label-caps mb-3">Catégories</p>
            {[{ id: 'all', name: 'Tout' }, ...CATEGORIES].map((c) => <button key={c.id} onClick={() => set('cat', c.id === 'all' ? '' : c.id)} className={`block py-1.5 text-sm ${cat === c.id ? 'font-bold text-wine' : ''}`}>{c.name}</button>)}</div>
          <div><p className="label-caps mb-3">Prix max : {max} DH</p><input type="range" min="100" max="500" step="10" value={max} onChange={(e) => setMax(+e.target.value)} className="w-full accent-wine" aria-label="Prix maximum" /></div>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={inStock} onChange={(e) => setInStock(e.target.checked)} className="accent-wine" />En stock uniquement</label>
          {(q || cat !== 'all') && <button onClick={() => setSp({})} className="text-xs underline">Réinitialiser</button>}
        </aside>
        {list.length ? <div className="grid grid-cols-2 gap-5 lg:grid-cols-3">{list.map((p, i) => <ProductCard key={p.id} p={p} index={i} />)}</div>
          : <p className="py-20 text-center text-mute">Aucun produit ne correspond à votre recherche.</p>}
      </div>
    </div>
  )
}
