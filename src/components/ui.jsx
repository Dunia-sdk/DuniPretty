import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, X } from 'lucide-react'

export function Img({ src, alt = '', className = '' }) {
  const [state, setState] = useState('loading')
  return (
    <div className={`relative overflow-hidden bg-blush/40 ${state === 'loading' ? 'skeleton' : ''} ${className}`}>
      {state !== 'error' && (
        <img src={src} alt={alt} loading="lazy" onLoad={() => setState('ok')} onError={() => setState('error')}
          className={`h-full w-full object-cover transition-opacity duration-500 ${state === 'ok' ? 'opacity-100' : 'opacity-0'}`} />
      )}
      {state === 'error' && <div className="grid h-full w-full place-items-center font-serif text-2xl text-wine/60">DP</div>}
    </div>
  )
}

export const Reveal = ({ children, delay = 0, className = '', y = 24 }) => (
  <motion.div className={className} initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>
)

export const Stars = ({ value, count }) => (
  <span className="inline-flex items-center gap-1 text-xs text-mute" aria-label={`Note ${value} sur 5`}>
    {[1, 2, 3, 4, 5].map((n) => <Star key={n} size={12} className={n <= Math.round(value) ? 'fill-amber-500 text-amber-500' : 'text-line'} />)}
    {count != null && <span>({count})</span>}
  </span>
)

export const SectionTitle = ({ kicker, title, action }) => (
  <div className="mb-10 flex items-end justify-between gap-4">
    <div>{kicker && <p className="label-caps mb-2 text-rose">{kicker}</p>}<h2 className="text-3xl md:text-4xl">{title}</h2></div>
    {action}
  </div>
)

export function Modal({ open, onClose, title, children }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[70] grid place-items-center bg-ink/40 p-4 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <motion.div role="dialog" aria-modal="true" aria-label={title} onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto bg-ivory p-6 shadow-2xl md:p-8"
            initial={{ y: 30, opacity: 0, scale: 0.97 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 20, opacity: 0 }}>
            <div className="mb-5 flex items-center justify-between"><h3 className="text-2xl">{title}</h3>
              <button onClick={onClose} aria-label="Fermer"><X size={20} /></button></div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export const Field = ({ label, error, children }) => (
  <label className="block text-left"><span className="label-caps mb-1.5 block text-mute">{label}</span>{children}
    {error && <span className="mt-1 block text-xs text-red-700">{error}</span>}</label>
)

export function Toasts({ toasts }) {
  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-[90] flex flex-col gap-2" aria-live="polite">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div key={t.id} layout initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 40 }}
            className={`px-5 py-3 text-sm text-white shadow-lg ${t.type === 'err' ? 'bg-red-800' : 'bg-burgundy'}`}>{t.msg}</motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
