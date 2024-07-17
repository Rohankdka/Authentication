import React from 'react'
import AuthState from './context/auth/AuthState'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Home from '../src/components/Home'
import Navbar from './components/Navbar'
import Login from './components/Login'
import RegistrationForm from './components/RegistrationForm'


const App = () => {
  return (
    <>
      <AuthState>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<RegistrationForm/>}/>
          </Routes>
        </BrowserRouter>
      </AuthState>
    </>
  )
}

export default App