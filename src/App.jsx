import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Shop from './pages/Shop'
import DonutPage from './pages/DonutPage'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Order from './pages/Order'
import { SignIn, Account } from './pages/Auth'
import { Story, Locations, Contact, Faq, NotFound } from './pages/Info'
import { useShop } from './context/ShopContext'

function RequireUser({ children }) {
  const { user } = useShop()
  return user ? children : <Navigate to="/signin" replace />
}

function GuestOnly({ children }) {
  const { user } = useShop()
  return user ? <Navigate to="/account" replace /> : children
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="menu" element={<Menu />} />
        <Route path="shop" element={<Shop />} />
        <Route path="donut/:id" element={<DonutPage />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="order/:id" element={<Order />} />
        <Route path="signin" element={<GuestOnly><SignIn /></GuestOnly>} />
        <Route path="account" element={<RequireUser><Account /></RequireUser>} />
        <Route path="story" element={<Story />} />
        <Route path="locations" element={<Locations />} />
        <Route path="contact" element={<Contact />} />
        <Route path="faq" element={<Faq />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
