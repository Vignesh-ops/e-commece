import { BrowserRouter, Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import './index.css'
import './App.css'
import React, { Suspense } from 'react';
import Login from './pages/Login'
import ProtectedRoute from './routes/ProtectedRoute'
import Layout from './pages/Layout'
import Register from './pages/Register'
const Cart = React.lazy(() => import('./pages/Cart'))
const Checkout = React.lazy(() => import('./pages/Checkout'))
const Manageitems = React.lazy(() => import('./pages/Manageitems'))
const Userdetails = React.lazy(() => import('./pages/Userdetails'))

import Admin from './routes/Admin'

function App() {

  return (
    <>
      <BrowserRouter>

        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route element={<Layout />}>
            <Route path='/admin/products' element={<Admin>
              <Suspense fallback={<p>Loading . . </p>}>
                <Manageitems />
              </Suspense>
            </Admin>} >
            </Route>
          </Route>
          <Route element={<ProtectedRoute><Layout /></ProtectedRoute>} >
            <Route path='/' element={<Home />} />
            <Route path="/cart" element={
              <Suspense fallback={<p>Loading . . </p>} >
                <Cart />
              </Suspense>
            } />
            <Route path='/userdetails' element={
              <Suspense fallback={<p>Loading . . </p>} >
                <Userdetails />
              </Suspense>
            } />

            <Route path="/checkout" element={
              <Suspense fallback={<p>Loading . . .</p>}>
                <Checkout />
              </Suspense>
            } />
          </Route>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
