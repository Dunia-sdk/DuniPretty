import { useState } from 'react'
import { Link } from 'react-router-dom'
import AdminCrud from '../../components/AdminCrud'
import { Field } from '../../components/ui'
import useCollection from '../../hooks/useCollection'
import { useStore } from '../../context/StoreContext'
import { CATEGORIES, CUSTOMERS, COUPON_SEED, REVIEW_SEED } from '../../data/seed'
import { mad } from '../../utils/format'

const catOpts = CATEGORIES.map((c) => c.id)
const STATUS = ['En préparation', 'Expédiée', 'Livrée', 'Annulée']
const Badge = ({ s }) => <span className={`px-2 py-1 text-xs ${/Livr|Publi|Oui/.test(s) ? 'bg-green-100 text-green-900' : /Annul|Non/.test(s) ? 'bg-red-100 text-red-900' : 'bg-blush text-wine'}`}>{s}</span>

export function Products() {
  const { products } = useStore()
  return <AdminCrud title="Produits" coll={products} newItem={{ category: 'skincare', stock: 0, rating: 4.5, reviews: 0, old: 0, img: '' }}
    columns={[{ key: 'name', label: 'Nom' }, { key: 'category', label: 'Catégorie' }, { key: 'price', label: 'Prix', render: (r) => mad(r.price) }, { key: 'stock', label: 'Stock' }]}
    fields={[{ key: 'name', label: 'Nom', required: true }, { key: 'category', label: 'Catégorie', options: catOpts }, { key: 'price', label: 'Prix (DH)', type: 'number', required: true }, { key: 'old', label: 'Ancien prix (DH)', type: 'number' },
      { key: 'stock', label: 'Stock', type: 'number', required: true }, { key: 'img', label: 'URL image' }, { key: 'desc', label: 'Description', type: 'textarea', required: true }]} />
}
export function Categories() {
  const coll = useCollection('dp_categories', CATEGORIES)
  return <AdminCrud title="Catégories" coll={coll} columns={[{ key: 'name', label: 'Nom' }, { key: 'blurb', label: 'Description' }]} fields={[{ key: 'name', label: 'Nom', required: true }, { key: 'blurb', label: 'Description' }, { key: 'image', label: 'URL image' }]} />
}
export function OrdersAdmin() {
  const { orders } = useStore()
  return <AdminCrud title="Commandes" coll={orders} canAdd={false} columns={[{ key: 'id', label: 'N°' }, { key: 'customer', label: 'Client' }, { key: 'date', label: 'Date' }, { key: 'total', label: 'Total', render: (r) => mad(r.total) }, { key: 'status', label: 'Statut', render: (r) => <Badge s={r.status} /> }]}
    fields={[{ key: 'status', label: 'Statut', options: STATUS }]} />
}
export function Customers() {
  const coll = useCollection('dp_customers', CUSTOMERS)
  return <AdminCrud title="Clients" coll={coll} columns={[{ key: 'name', label: 'Nom' }, { key: 'email', label: 'E-mail' }, { key: 'city', label: 'Ville' }, { key: 'orders', label: 'Commandes' }, { key: 'spent', label: 'Dépensé', render: (r) => mad(r.spent) }]}
    fields={[{ key: 'name', label: 'Nom', required: true }, { key: 'email', label: 'E-mail', required: true }, { key: 'city', label: 'Ville' }]} newItem={{ orders: 0, spent: 0 }} />
}
export function Inventory() {
  const { products } = useStore()
  return <AdminCrud title="Stock" coll={products} canAdd={false} canDelete={false} columns={[{ key: 'name', label: 'Produit' }, { key: 'stock', label: 'Quantité' },
    { key: 'lvl', label: 'État', render: (r) => <Badge s={r.stock < 1 ? 'Non' : r.stock < 10 ? 'Faible' : 'Oui'} /> }]} fields={[{ key: 'stock', label: 'Quantité en stock', type: 'number', required: true }]} />
}
export function Promotions() {
  const coll = useCollection('dp_coupons', COUPON_SEED)
  return <AdminCrud title="Promotions & coupons" coll={coll} newItem={{ active: 'Oui', uses: 0 }} columns={[{ key: 'code', label: 'Code' }, { key: 'discount', label: 'Remise', render: (r) => `${r.discount} %` }, { key: 'active', label: 'Actif', render: (r) => <Badge s={r.active} /> }, { key: 'uses', label: 'Utilisations' }]}
    fields={[{ key: 'code', label: 'Code', required: true }, { key: 'discount', label: 'Remise (%)', type: 'number', required: true }, { key: 'active', label: 'Actif', options: ['Oui', 'Non'] }]} />
}
export function Reviews() {
  const coll = useCollection('dp_reviews', REVIEW_SEED)
  return <AdminCrud title="Avis clients" coll={coll} canAdd={false} columns={[{ key: 'product', label: 'Produit' }, { key: 'author', label: 'Auteur' }, { key: 'rating', label: 'Note', render: (r) => `${r.rating}/5` }, { key: 'text', label: 'Avis' }, { key: 'status', label: 'Statut', render: (r) => <Badge s={r.status} /> }]}
    fields={[{ key: 'status', label: 'Statut', options: ['Publié', 'En attente', 'Rejeté'] }]} />
}
export function Settings() {
  const { toast } = useStore()
  const [s, setS] = useState(() => { try { return JSON.parse(localStorage.getItem('dp_settings')) || { name: 'DuniPretty', email: 'contact@dunipretty.ma', shipping: 35, free: 500 } } catch { return {} } })
  const save = (e) => { e.preventDefault(); localStorage.setItem('dp_settings', JSON.stringify(s)); toast('Paramètres enregistrés') }
  return <div className="max-w-xl"><h1 className="mb-6 text-3xl">Paramètres</h1><form onSubmit={save} className="space-y-4 bg-white p-6">
    {[['name', 'Nom de la boutique'], ['email', 'E-mail de contact'], ['shipping', 'Frais de livraison (DH)'], ['free', 'Livraison offerte dès (DH)']].map(([k, l]) => <Field key={k} label={l}><input className="input" value={s[k] ?? ''} onChange={(e) => setS({ ...s, [k]: e.target.value })} /></Field>)}
    <button className="btn-primary">Enregistrer</button><p className="text-xs text-mute">Enregistré localement (démo). <Link to="/admin" className="underline">Retour</Link></p></form></div>
}
