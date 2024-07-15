import React, { useContext } from 'react'
import AuthContext from '../context/auth/AuthContext'

const Home = () => {
  const { user } = useContext(AuthContext)
  
  return (
    <div className="container mx-auto mt-10">
      {user.username ? (
        <h1 className="text-2xl font-bold">Welcome, {user.username}!</h1>
      ) : (
        <h1 className="text-2xl font-bold">Welcome to our website!</h1>
      )}
    </div>
  )
}

export default Home