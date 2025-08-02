import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/ui/button'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { SignedIn, useUser } from '@clerk/clerk-react'
import Header from './components/custom/Header'

function App() {

  const {user, isSignedIn, isLoaded} = useUser()
  const navigate = useNavigate()

  if(!isSignedIn && isLoaded){
    return <Navigate to = {"/auth/sign-in"}/>
  }

  return (
    <>
      <Header/>
      <Outlet/>
    </>
  )
}

export default App
