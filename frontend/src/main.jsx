import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from "./context/CartContext";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <CartProvider>
      <App />
      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 2000,
          style: {
            background: "#fff",
            color: "#333",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            padding: "12px 16px",
            fontWeight: "500",
            transition: "all 0.4s ease-in-out",
          },
        }}
      />
    </CartProvider>
  </BrowserRouter>
)
