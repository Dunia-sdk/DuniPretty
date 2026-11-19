# DuniPretty — Premium Beauty E-commerce (React + Vite)

Frontend built from the Google Stitch "Velvetique" design (rebranded DuniPretty). Currency: MAD (DH). Language: French.

## Run
```bash
npm install
npm run dev      # http://localhost:5173
npm run build
```

## Routes
Storefront: `/` `/boutique` (search `?q=`, `?cat=`, sort, price, stock filters) `/produit/:id` `/panier` `/paiement` `/confirmation/:id` `/favoris` `/connexion` `/compte` `/a-propos` `/faq` `/contact` `/journal`
Admin (`/admin`): dashboard, `produits`, `categories`, `commandes`, `clients`, `stock`, `promotions`, `avis`, `parametres`.

## Structure
```
src/
  components/   ui.jsx (Img, Reveal, Modal, Toasts…), ProductCard, CartDrawer, AdminCrud (generic CRUD)
  layouts/      StoreLayout, AdminLayout
  pages/        storefront/ admin/ auth/
  routes/       centralised router
  context/      StoreContext (cart, wishlist, user, coupon, toasts, products/orders)
  hooks/        useCollection (localStorage CRUD)
  data/         seed.js (mock data), images.js (Stitch image URLs)
  styles/       Tailwind + tokens
```

## Demo-only behaviour
Payment, authentication and persistence are **simulated** with localStorage (`dp_*` keys). Replace `useCollection` and the checkout/login handlers in `StoreContext` with Laravel REST API calls (MySQL) later. Coupons: `GLOW15`, `DUNI10`. Product images load from the Stitch-hosted URLs; swap them for local assets in `src/data/images.js` for production (a fallback tile shows if an image fails).
Animations use Framer Motion and respect `prefers-reduced-motion`.
