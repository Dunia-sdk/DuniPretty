import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Leaf, FlaskConical, Rabbit, Globe2 } from 'lucide-react'
import { CATEGORIES, POSTS } from '../../data/seed'
import { IMG } from '../../data/images'
import { Img, Reveal, SectionTitle } from '../../components/ui'
import ProductCard from '../../components/ProductCard'
import { useStore } from '../../context/StoreContext'

export default function Home() {
  const { products } = useStore()
  const best = products.items.slice(0, 8)
  return (
    <>
      <section className="relative overflow-hidden bg-blush/40">
        <div className="container-x grid items-center gap-8 py-12 md:grid-cols-2 md:py-20">
          <div>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .2 }} className="label-caps mb-4 text-rose">Nouveau · Collection Rose de Damas</motion.p>
            <h1 className="overflow-hidden text-5xl leading-[1.1] text-burgundy md:text-7xl">
              {['Peau radieuse.', 'Vraie confiance.'].map((l, i) => <motion.span key={l} className="block" initial={{ y: '100%' }} animate={{ y: 0 }} transition={{ duration: .9, delay: .3 + i * .15, ease: [.22, 1, .36, 1] }}>{l}</motion.span>)}
            </h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .9 }} className="mt-6 max-w-md text-mute">Des soins propres qui nourrissent, subliment et révèlent la beauté de chaque peau.</motion.p>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }} className="mt-8 flex gap-3"><Link to="/boutique" className="btn-primary">Découvrir</Link><Link to="/a-propos" className="btn-outline">Notre histoire</Link></motion.div>
          </div>
          <motion.div initial={{ opacity: 0, scale: 1.08 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.4 }}>
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}><Img src={IMG.hero} alt="Produits DuniPretty" className="aspect-[4/3] rounded-t-full" /></motion.div></motion.div>
        </div>
        <div className="container-x grid grid-cols-2 gap-4 pb-8 md:grid-cols-4">
          {[[Leaf, 'Ingrédients propres'], [FlaskConical, 'Cliniquement prouvé'], [Rabbit, 'Cruelty free'], [Globe2, 'Beauté durable']].map(([I, t]) => <div key={t} className="flex items-center gap-3 bg-white/80 p-4 text-sm font-semibold"><I className="text-wine" size={22} />{t}</div>)}
        </div>
      </section>

      <section className="container-x py-20">
        <SectionTitle kicker="Explorer" title="Acheter par catégorie" />
        <div className="grid grid-cols-2 gap-6 md:grid-cols-6">
          {CATEGORIES.map((c, i) => <Reveal key={c.id} delay={i * .05}><Link to={`/boutique?cat=${c.id}`} className="group block text-center">
            <Img src={c.image} alt={c.name} className="aspect-[3/4] rounded-t-full [&_img]:transition-transform [&_img]:duration-700 group-hover:[&_img]:scale-110" />
            <p className="label-caps mt-3 group-hover:text-wine">{c.name}</p></Link></Reveal>)}
        </div>
      </section>

      <section className="container-x grid gap-6 md:grid-cols-5">
        <Reveal className="flex flex-col justify-center bg-rose p-10 text-white md:col-span-2"><p className="label-caps">Offre limitée</p><h2 className="my-4 text-4xl">Jusqu’à -30 % sur les best-sellers</h2><p className="mb-6 text-white/80">Glow plus, dépensez moins.</p><Link to="/boutique?sort=promo" className="btn bg-white text-wine self-start hover:bg-blush">Voir les offres</Link></Reveal>
        <Reveal className="md:col-span-3"><Img src={IMG.promo} alt="Lait corps éclat" className="aspect-[16/10]" /></Reveal>
      </section>

      <section className="container-x pt-24">
        <SectionTitle kicker="Favoris des clientes" title="Best-sellers" action={<Link to="/boutique" className="label-caps text-wine underline">Tout voir</Link>} />
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">{best.map((p, i) => <ProductCard key={p.id} p={p} index={i} />)}</div>
      </section>

      <section className="container-x pt-24">
        <SectionTitle kicker="Le Journal" title="Conseils & rituels" action={<Link to="/journal" className="label-caps text-wine underline">Lire le journal</Link>} />
        <div className="grid gap-6 md:grid-cols-3">{POSTS.slice(0, 3).map((p, i) => <Reveal key={p.id} delay={i * .08}><Link to="/journal"><Img src={p.img} alt={p.title} className="aspect-[4/3]" /><p className="label-caps mt-4 text-rose">{p.tag}</p><h3 className="mt-1 text-xl">{p.title}</h3></Link></Reveal>)}</div>
      </section>
    </>
  )
}
