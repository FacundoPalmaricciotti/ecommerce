import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Login from './components/Login'
import RegisterForm from './components/RegisterForm'
import Home from './components/Home'
import Cart from './components/Cart'
import Product from './components/Product'
import Pay from './components/Pay'
import Thankyou from './components/Thankyou'

const App = () => {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/home" element={<Home/>} />
                <Route path="/cart" element={<Cart/>} />
                <Route path="/product/:id" element={<Product/>} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/login"    element={<Login />} />
                <Route path="/pay" element={<Pay/>} />
                <Route path="/thank-you" element={<Thankyou/>} />
            </Routes>
        </Router>
    )
}

export default App

