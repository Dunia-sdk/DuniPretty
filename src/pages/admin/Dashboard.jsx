import { useStore } from '../../context/StoreContext'
import { CATEGORIES } from '../../data/seed'
import { mad } from '../../utils/format'

const DAYS = [3200, 4100, 3800, 5200, 4700, 6100, 5900, 7200, 6600, 8100, 7700, 9300]
export default function Dashboard() {
  const { orders, products } = useStore()
  const revenue = orders.items.filter((o) => o.status !== 'Annulée').reduce((s, o) => s + o.total, 0)
  const kpis = [['Chiffre d’affaires', mad(revenue + 61000)], ['Commandes', orders.items.length + 238], ['Produits', products.items.length], ['Stock faible', products.items.filter((p) => p.stock < 10).length]]
  const max = Math.max(...DAYS), pts = DAYS.map((v, i) => `${(i / (DAYS.length - 1)) * 560 + 20},${170 - (v / max) * 140}`).join(' ')
  const cats = CATEGORIES.map((c) => ({ n: c.name, v: products.items.filter((p) => p.category === c.id).reduce((s, p) => s + p.reviews * p.price / 100, 0) })), cm = Math.max(...cats.map((c) => c.v), 1)
  return <div><h1 className="mb-6 text-3xl">Tableau de bord</h1>
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{kpis.map(([l, v]) => <div key={l} className="bg-white p-5"><p className="label-caps text-mute">{l}</p><p className="mt-2 font-serif text-3xl text-burgundy">{v}</p></div>)}</div>
    <div className="mt-6 grid gap-6 lg:grid-cols-2">
      <div className="bg-white p-5"><p className="label-caps mb-3">Ventes (12 derniers mois, k DH)</p><svg viewBox="0 0 600 190" role="img" aria-label="Courbe des ventes"><polyline fill="none" stroke="#8c4753" strokeWidth="3" points={pts} />{DAYS.map((v, i) => <circle key={i} cx={(i / 11) * 560 + 20} cy={170 - (v / max) * 140} r="4" fill="#a95f6a" />)}</svg></div>
      <div className="bg-white p-5"><p className="label-caps mb-3">Ventes par catégorie</p>{cats.map((c) => <div key={c.n} className="mb-2 flex items-center gap-3 text-xs"><span className="w-24">{c.n}</span><div className="h-3 flex-1 bg-cream"><div className="h-3 bg-rose" style={{ width: `${(c.v / cm) * 100}%` }} /></div></div>)}</div></div>
    <div className="mt-6 bg-white p-5"><p className="label-caps mb-3">Dernières commandes</p>{orders.items.slice(0, 5).map((o) => <div key={o.id} className="flex justify-between border-b border-line/50 py-2 text-sm"><span>{o.id} · {o.customer}</span><span>{mad(o.total)} · {o.status}</span></div>)}</div></div>
}
