import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import { StoreProvider } from './context/StoreContext'
import { router } from './routes'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MotionConfig reducedMotion="user"><StoreProvider><RouterProvider router={router} /></StoreProvider></MotionConfig>
  </React.StrictMode>
)
