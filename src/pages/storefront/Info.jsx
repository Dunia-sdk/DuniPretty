import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'
import { FAQS, POSTS } from '../../data/seed'
import { IMG } from '../../data/images'
import { Img, Reveal, Modal, Field } from '../../components/ui'
import { useStore } from '../../context/StoreContext'

export function About() {
  return <div><div className="container-x grid items-center gap-10 py-16 md:grid-cols-2"><Reveal><p className="label-caps text-rose">Notre laboratoire</p><h1 className="my-4 text-5xl text-burgundy">La science rencontre la douceur</h1>
    <p className="text-mute">DuniPretty formule des soins propres, dermatologiquement testés, à partir d’ingrédients botaniques sélectionnés avec soin et pensés pour la peau et le climat marocains.</p></Reveal>
    <Reveal><Img src={IMG.about1} alt="Laboratoire" className="aspect-[4/3]" /></Reveal></div>
    <div className="container-x grid gap-6 pb-10 md:grid-cols-3">{[['Propre', 'Formules sans sulfates, parabènes ni silicones.'], ['Prouvé', 'Testé sous contrôle dermatologique.'], ['Responsable', 'Récolte durable, emballages recyclables.']].map(([t, d], i) => <Reveal key={t} delay={i * .1} className="bg-blush/40 p-8"><h3 className="text-2xl text-burgundy">{t}</h3><p className="mt-2 text-sm text-mute">{d}</p></Reveal>)}</div></div>
}
export function Faq() {
  const [open, setOpen] = useState(0)
  return <div className="container-x max-w-3xl py-16"><h1 className="mb-10 text-5xl">Questions fréquentes</h1>
    {FAQS.map(([q, a], i) => <div key={q} className="border-b border-line"><button className="flex w-full items-center justify-between py-5 text-left font-serif text-xl" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>{q}<motion.span animate={{ rotate: open === i ? 45 : 0 }}><Plus size={20} /></motion.span></button>
      <AnimatePresence initial={false}>{open === i && <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden pb-5 text-mute">{a}</motion.p>}</AnimatePresence></div>)}</div>
}
export function Contact() {
  const { toast } = useStore(); const [f, setF] = useState({ name: '', email: '', msg: '' }); const [e, setE] = useState({})
  const submit = (ev) => { ev.preventDefault(); const x = {}
    if (!f.name.trim()) x.name = 'Requis'; if (!/\S+@\S+\.\S+/.test(f.email)) x.email = 'E-mail invalide'; if (f.msg.trim().length < 10) x.msg = '10 caractères minimum'
    setE(x); if (!Object.keys(x).length) { toast('Message envoyé (simulation)'); setF({ name: '', email: '', msg: '' }) } }
  return <div className="container-x max-w-2xl py-16"><h1 className="mb-8 text-5xl">Contact</h1><form onSubmit={submit} className="space-y-4" noValidate>
    <Field label="Nom" error={e.name}><input className="input" value={f.name} onChange={(v) => setF({ ...f, name: v.target.value })} /></Field>
    <Field label="E-mail" error={e.email}><input className="input" value={f.email} onChange={(v) => setF({ ...f, email: v.target.value })} /></Field>
    <Field label="Message" error={e.msg}><textarea rows={5} className="input" value={f.msg} onChange={(v) => setF({ ...f, msg: v.target.value })} /></Field><button className="btn-primary">Envoyer</button></form></div>
}
export function Journal() {
  const [post, setPost] = useState(null); const [tag, setTag] = useState('Tous'); const tags = ['Tous', ...new Set(POSTS.map((p) => p.tag))]
  return <div className="container-x py-16"><h1 className="text-5xl">Le Journal</h1>
    <div className="my-8 flex flex-wrap gap-2">{tags.map((t) => <button key={t} onClick={() => setTag(t)} className={`label-caps border px-4 py-2 ${tag === t ? 'border-wine bg-wine text-white' : 'border-line'}`}>{t}</button>)}</div>
    <div className="grid gap-8 md:grid-cols-2">{POSTS.filter((p) => tag === 'Tous' || p.tag === tag).map((p, i) => <Reveal key={p.id} delay={i * .06}><button className="text-left" onClick={() => setPost(p)}><Img src={p.img} alt={p.title} className="aspect-[16/10]" /><p className="label-caps mt-4 text-rose">{p.tag}</p><h2 className="mt-1 text-2xl">{p.title}</h2></button></Reveal>)}</div>
    <Modal open={!!post} onClose={() => setPost(null)} title={post?.title}>{post && <><Img src={post.img} alt="" className="mb-4 aspect-video" /><p className="text-mute">{post.text}</p></>}</Modal></div>
}
