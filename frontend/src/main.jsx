import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Home'
import Dashboard from './Dashboard'
import SignIn from './auth/Sign-In'
import { ClerkProvider } from '@clerk/clerk-react'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if(!PUBLISHABLE_KEY){
  throw new Error('Missing Publishable Key')
}

const router = createBrowserRouter([
  {
    element: <App/>,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard/>
      }
    ]
  },
  {
    path: "/",
    element: <Home/>
  }, 
  {
    path: "/auth/sign-in",
    element: <SignIn/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <RouterProvider router = {router}/>
    </ClerkProvider>
  </StrictMode>,
)
