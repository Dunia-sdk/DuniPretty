import { useState } from 'react'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import { Modal, Field } from './ui'
import { useStore } from '../context/StoreContext'

// Generic CRUD table: columns drive the table, fields drive the add/edit form (with validation).
export default function AdminCrud({ title, coll, columns, fields, canAdd = true, canDelete = true, newItem = {} }) {
  const { toast } = useStore(); const { items, add, update, remove } = coll
  const [q, setQ] = useState(''), [edit, setEdit] = useState(null), [form, setForm] = useState({}), [errs, setErrs] = useState({})
  const open = (it) => { setEdit(it || 'new'); setForm(it ? { ...it } : { ...newItem }); setErrs({}) }
  const save = (e) => {
    e.preventDefault(); const x = {}
    fields.forEach((f) => { const v = form[f.key]; if (f.required && (v === undefined || String(v).trim() === '')) x[f.key] = 'Requis'
      if (f.type === 'number' && v !== undefined && v !== '' && (isNaN(v) || Number(v) < 0)) x[f.key] = 'Nombre positif requis' })
    setErrs(x); if (Object.keys(x).length) return
    const clean = { ...form }; fields.forEach((f) => { if (f.type === 'number' && clean[f.key] !== undefined) clean[f.key] = Number(clean[f.key]) })
    edit === 'new' ? add(clean) : update(edit.id, clean); toast(edit === 'new' ? 'Élément créé' : 'Modifications enregistrées'); setEdit(null)
  }
  const rows = items.filter((r) => JSON.stringify(r).toLowerCase().includes(q.toLowerCase()))
  return <div><div className="mb-6 flex flex-wrap items-center justify-between gap-3"><h1 className="text-3xl">{title}</h1>
    <div className="flex gap-2"><input aria-label="Rechercher" placeholder="Rechercher…" className="input !w-56" value={q} onChange={(e) => setQ(e.target.value)} />{canAdd && <button className="btn-primary" onClick={() => open()}><Plus size={14} />Ajouter</button>}</div></div>
    <div className="overflow-x-auto bg-white"><table className="w-full text-left text-sm"><thead className="label-caps border-b border-line text-mute"><tr>{columns.map((c) => <th key={c.key} className="p-4">{c.label}</th>)}<th className="p-4" /></tr></thead>
      <tbody>{rows.map((r) => <tr key={r.id} className="border-b border-line/50 hover:bg-cream/60">{columns.map((c) => <td key={c.key} className="p-4">{c.render ? c.render(r) : r[c.key]}</td>)}
        <td className="whitespace-nowrap p-4 text-right"><button aria-label="Modifier" className="mr-3" onClick={() => open(r)}><Pencil size={15} /></button>
          {canDelete && <button aria-label="Supprimer" onClick={() => { if (window.confirm('Supprimer cet élément ?')) { remove(r.id); toast('Élément supprimé') } }}><Trash2 size={15} /></button>}</td></tr>)}
        {!rows.length && <tr><td colSpan={columns.length + 1} className="p-8 text-center text-mute">Aucun résultat</td></tr>}</tbody></table></div>
    <Modal open={!!edit} onClose={() => setEdit(null)} title={edit === 'new' ? 'Nouvel élément' : 'Modifier'}>
      <form onSubmit={save} noValidate className="space-y-4">{fields.map((f) => <Field key={f.key} label={f.label} error={errs[f.key]}>
        {f.options ? <select className="input" value={form[f.key] ?? ''} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}>{f.options.map((o) => <option key={o}>{o}</option>)}</select>
          : f.type === 'textarea' ? <textarea rows={3} className="input" value={form[f.key] ?? ''} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} />
          : <input type={f.type === 'number' ? 'number' : 'text'} className="input" value={form[f.key] ?? ''} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} />}</Field>)}
        <button className="btn-primary w-full">Enregistrer</button></form></Modal></div>
}
