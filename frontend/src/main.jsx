import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Home'
import Dashboard from './Dashboard'
import SignIn from './auth/Sign-In'
import { ResumeInfoProvider } from './context/ResumeInfoContext.jsx';
import { ClerkProvider } from '@clerk/clerk-react'
import EditResume from './Dashboard/resume/[resumeId]/edit'
import ViewResume from './my-resume/[resumeId]/view'

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
      },
      {
        path:'/dashboard/resume/:resumeId/edit',
        element: <EditResume/>
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
  },
  {
    path: '/my-resume/:resumeId/view',
    element: <ViewResume/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <ResumeInfoProvider>
        <RouterProvider router = {router}/>
      </ResumeInfoProvider>
    </ClerkProvider>
  </StrictMode>,
)
