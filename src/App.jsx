import { BrowserRouter, Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import './App.css'
import Header from './pages/Header'
import Footer from './pages/Footer'
import Cart from './pages/Cart'

function App() {

  return (
    <>
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <Footer></Footer>
      </BrowserRouter>

    </>
  )
}

export default App
