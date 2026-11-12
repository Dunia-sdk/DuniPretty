export const mad = (n) => `${Number(n).toLocaleString('fr-MA')} DH`
export const uid = (p = 'id') => `${p}-${Math.random().toString(36).slice(2, 8)}`
export const FREE_SHIPPING = 500
export const COUPONS = { GLOW15: 15, DUNI10: 10 }
