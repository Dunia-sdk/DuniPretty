import { Link } from 'react-router-dom'
import { useStore } from '../../context/StoreContext'
import ProductCard from '../../components/ProductCard'
export default function Wishlist() {
  const { products, wishlist } = useStore(); const list = products.items.filter((p) => wishlist.includes(p.id))
  return <div className="container-x py-12"><h1 className="mb-8 text-4xl">Mes favoris</h1>
    {list.length ? <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">{list.map((p, i) => <ProductCard key={p.id} p={p} index={i} />)}</div>
      : <div className="py-20 text-center text-mute">Aucun favori pour le moment.<br /><Link to="/boutique" className="btn-primary mt-6">Explorer</Link></div>}</div>
}
