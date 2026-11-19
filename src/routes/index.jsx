import { createBrowserRouter } from 'react-router-dom'
import StoreLayout from '../layouts/StoreLayout'
import AdminLayout from '../layouts/AdminLayout'
import Home from '../pages/storefront/Home'
import Shop from '../pages/storefront/Shop'
import Product from '../pages/storefront/Product'
import Cart from '../pages/storefront/Cart'
import Checkout, { Confirmation } from '../pages/storefront/Checkout'
import Wishlist from '../pages/storefront/Wishlist'
import { About, Faq, Contact, Journal } from '../pages/storefront/Info'
import Auth from '../pages/auth/Auth'
import Account from '../pages/auth/Account'
import Dashboard from '../pages/admin/Dashboard'
import * as A from '../pages/admin/Admin'

const NotFound = () => <div className="container-x py-32 text-center"><h1 className="text-5xl">404</h1><p className="mt-2 text-mute">Page introuvable.</p></div>

// Centralised route configuration
export const router = createBrowserRouter([
  { element: <StoreLayout />, children: [
    { path: '/', element: <Home /> }, { path: '/boutique', element: <Shop /> }, { path: '/produit/:id', element: <Product /> },
    { path: '/panier', element: <Cart /> }, { path: '/paiement', element: <Checkout /> }, { path: '/confirmation/:id', element: <Confirmation /> },
    { path: '/favoris', element: <Wishlist /> }, { path: '/connexion', element: <Auth /> }, { path: '/compte', element: <Account /> },
    { path: '/a-propos', element: <About /> }, { path: '/faq', element: <Faq /> }, { path: '/contact', element: <Contact /> }, { path: '/journal', element: <Journal /> },
    { path: '*', element: <NotFound /> } ] },
  { path: '/admin', element: <AdminLayout />, children: [
    { index: true, element: <Dashboard /> }, { path: 'produits', element: <A.Products /> }, { path: 'categories', element: <A.Categories /> },
    { path: 'commandes', element: <A.OrdersAdmin /> }, { path: 'clients', element: <A.Customers /> }, { path: 'stock', element: <A.Inventory /> },
    { path: 'promotions', element: <A.Promotions /> }, { path: 'avis', element: <A.Reviews /> }, { path: 'parametres', element: <A.Settings /> } ] },
])
