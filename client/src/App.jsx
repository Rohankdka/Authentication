import React from 'react'
import AuthState from './context/auth/AuthState'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Home from '../src/components/Home'
import Navbar from './components/Navbar'
import Login from './components/Login'

const App = () => {
  return (
    <>
      <AuthState>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login/>}/>
          </Routes>
        </BrowserRouter>
      </AuthState>
    </>
  )
}

export default App