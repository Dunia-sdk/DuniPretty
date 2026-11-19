import { useCallback, useEffect, useState } from 'react'
import { uid } from '../utils/format'
// localStorage-backed collection; swap for Laravel REST calls later (see services/).
export default function useCollection(key, seed = []) {
  const [items, setItems] = useState(() => {
    try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : seed } catch { return seed }
  })
  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(items)) } catch { /* quota */ } }, [key, items])
  const add = useCallback((it) => setItems((l) => [{ ...it, id: it.id || uid() }, ...l]), [])
  const update = useCallback((id, patch) => setItems((l) => l.map((x) => (x.id === id ? { ...x, ...patch } : x))), [])
  const remove = useCallback((id) => setItems((l) => l.filter((x) => x.id !== id)), [])
  return { items, add, update, remove, setItems }
}
