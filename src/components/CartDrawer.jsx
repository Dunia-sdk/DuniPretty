import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react'
import { useStore } from '../context/StoreContext'
import { Img } from './ui'
import { FREE_SHIPPING, mad } from '../utils/format'

export default function CartDrawer() {
  const { drawer, setDrawer, cart, setQty, subtotal, total, discount, shipping } = useStore()
  const close = () => setDrawer(false)
  return (
    <AnimatePresence>
      {drawer && (
        <>
          <motion.div className="fixed inset-0 z-[60] bg-ink/40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={close} />
          <motion.aside role="dialog" aria-label="Panier" className="fixed right-0 top-0 z-[61] flex h-full w-full max-w-md flex-col bg-ivory shadow-2xl"
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 30, stiffness: 280 }}>
            <header className="flex items-center justify-between border-b border-line p-5"><h2 className="text-2xl">Votre panier</h2>
              <button onClick={close} aria-label="Fermer"><X /></button></header>
            {cart.length === 0 ? (
              <div className="grid flex-1 place-items-center p-8 text-center"><div><ShoppingBag className="mx-auto mb-3 text-rose" size={40} />
                <p className="mb-4 text-mute">Votre panier est vide.</p><Link to="/boutique" onClick={close} className="btn-primary">Découvrir la boutique</Link></div></div>
            ) : (
              <>
                <div className="border-b border-line bg-blush/30 px-5 py-3 text-xs">
                  {subtotal >= FREE_SHIPPING ? 'Livraison offerte !' : `Plus que ${mad(FREE_SHIPPING - subtotal)} pour la livraison offerte`}
                  <div className="mt-2 h-1 bg-white"><motion.div className="h-1 bg-wine" animate={{ width: `${Math.min(100, (subtotal / FREE_SHIPPING) * 100)}%` }} /></div>
                </div>
                <ul className="flex-1 space-y-5 overflow-y-auto p-5">
                  <AnimatePresence initial={false}>
                    {cart.map((l) => (
                      <motion.li key={l.key} layout exit={{ opacity: 0, x: 60 }} className="flex gap-4">
                        <Img src={l.product.img} alt={l.product.name} className="h-24 w-20 shrink-0" />
                        <div className="flex-1 text-sm"><p className="font-semibold">{l.product.name}</p><p className="text-xs text-mute">{l.variant}</p>
                          <div className="mt-2 flex items-center justify-between">
                            <div className="flex items-center border border-line">
                              <button aria-label="Moins" className="p-2" onClick={() => setQty(l.key, l.qty - 1)}><Minus size={13} /></button>
                              <span className="w-7 text-center text-xs">{l.qty}</span>
                              <button aria-label="Plus" className="p-2" onClick={() => setQty(l.key, l.qty + 1)}><Plus size={13} /></button></div>
                            <span className="font-bold text-wine">{mad(l.product.price * l.qty)}</span></div></div>
                        <button aria-label="Supprimer" onClick={() => setQty(l.key, 0)} className="self-start text-mute hover:text-wine"><Trash2 size={16} /></button>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
                <footer className="space-y-2 border-t border-line p-5 text-sm">
                  <div className="flex justify-between"><span>Sous-total</span><span>{mad(subtotal)}</span></div>
                  {discount > 0 && <div className="flex justify-between text-wine"><span>Réduction</span><span>-{mad(discount)}</span></div>}
                  <div className="flex justify-between"><span>Livraison</span><span>{shipping ? mad(shipping) : 'Offerte'}</span></div>
                  <div className="flex justify-between font-serif text-xl"><span>Total</span><span>{mad(total)}</span></div>
                  <Link to="/paiement" onClick={close} className="btn-primary w-full">Commander</Link>
                  <Link to="/panier" onClick={close} className="btn-outline w-full">Voir le panier</Link>
                </footer>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
