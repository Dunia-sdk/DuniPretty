import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { motion } from 'framer-motion'
import { Img, Stars, Reveal } from './ui'
import { useStore } from '../context/StoreContext'
import { mad } from '../utils/format'

export default function ProductCard({ p, index = 0 }) {
  const { toggleWish, wishlist, addToCart } = useStore()
  const liked = wishlist.includes(p.id)
  return (
    <Reveal delay={(index % 4) * 0.06}>
      <article className="group relative bg-white p-3 shadow-[0_2px_20px_rgba(140,71,83,0.06)] transition-shadow duration-500 hover:shadow-[0_12px_40px_rgba(140,71,83,0.16)]">
        <button onClick={() => toggleWish(p)} aria-label="Favoris" aria-pressed={liked} className="absolute right-5 top-5 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/90">
          <motion.span whileTap={{ scale: 1.4 }}><Heart size={17} className={liked ? 'fill-wine text-wine' : 'text-mute'} /></motion.span>
        </button>
        {p.badge && <span className="label-caps absolute left-5 top-5 z-10 bg-wine px-2 py-1 text-white">{p.badge}</span>}
        <Link to={`/produit/${p.id}`}>
          <Img src={p.img} alt={p.name} className="aspect-square [&_img]:transition-transform [&_img]:duration-700 group-hover:[&_img]:scale-110" />
          <div className="px-1 pb-2 pt-4 text-center">
            <h3 className="min-h-[3rem] font-sans text-sm font-semibold leading-snug">{p.name}</h3>
            <Stars value={p.rating} count={p.reviews} />
            <p className="mt-2 text-sm font-bold text-wine">{mad(p.price)} {p.old > 0 && <s className="ml-1 font-normal text-mute/60">{mad(p.old)}</s>}</p>
          </div>
        </Link>
        <button disabled={p.stock < 1} onClick={() => addToCart(p, p.shades?.[0])} className="btn-primary w-full !py-2.5">{p.stock < 1 ? 'Épuisé' : 'Ajouter au panier'}</button>
      </article>
    </Reveal>
  )
}
