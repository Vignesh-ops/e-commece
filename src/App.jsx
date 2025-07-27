import { BrowserRouter, Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import './App.css'
import Cart from './pages/Cart'
import Login from './pages/Login'
import ProtectedRoute from './routes/ProtectedRoute'
import Layout from './pages/Layout'
import Register from './pages/Register'
import Checkout from './pages/Checkout'
import Admin from './routes/Admin'
import Manageitems from './pages/Manageitems'

function App() {

  return (
    <>
      <BrowserRouter>

        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/admin/products' element={<Admin><Manageitems /></Admin>} >
            <Route path='/admin/products' element={<Manageitems />} />
          </Route>
          <Route element={<ProtectedRoute><Layout /></ProtectedRoute>} >
            <Route path='/' element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
          </Route>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
