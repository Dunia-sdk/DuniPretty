import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../../context/StoreContext'
import { Field } from '../../components/ui'

export default function Auth() {
  const { login, toast } = useStore(); const nav = useNavigate()
  const [mode, setMode] = useState('login'); const [f, setF] = useState({ name: '', email: '', pw: '' }); const [e, setE] = useState({})
  const submit = (ev) => { ev.preventDefault(); const x = {}
    if (mode === 'register' && f.name.trim().length < 2) x.name = 'Nom requis'
    if (!/\S+@\S+\.\S+/.test(f.email)) x.email = 'E-mail invalide'
    if (f.pw.length < 6) x.pw = '6 caractères minimum'
    setE(x); if (Object.keys(x).length) return
    login({ name: f.name || f.email.split('@')[0], email: f.email }); toast('Bienvenue chez DuniPretty !'); nav('/compte') } // simulated auth
  return <div className="container-x max-w-md py-20"><h1 className="mb-2 text-center text-4xl">{mode === 'login' ? 'Connexion' : 'Créer un compte'}</h1>
    <p className="mb-8 text-center text-xs text-mute">Authentification simulée (démo) — sera reliée à l’API Laravel.</p>
    <form onSubmit={submit} noValidate className="space-y-4">
      {mode === 'register' && <Field label="Nom" error={e.name}><input className="input" value={f.name} onChange={(v) => setF({ ...f, name: v.target.value })} /></Field>}
      <Field label="E-mail" error={e.email}><input className="input" value={f.email} onChange={(v) => setF({ ...f, email: v.target.value })} /></Field>
      <Field label="Mot de passe" error={e.pw}><input type="password" className="input" value={f.pw} onChange={(v) => setF({ ...f, pw: v.target.value })} /></Field>
      <button className="btn-primary w-full">{mode === 'login' ? 'Se connecter' : 'S’inscrire'}</button></form>
    <button className="mt-6 w-full text-sm underline" onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>{mode === 'login' ? 'Pas de compte ? Inscription' : 'Déjà inscrite ? Connexion'}</button></div>
}
