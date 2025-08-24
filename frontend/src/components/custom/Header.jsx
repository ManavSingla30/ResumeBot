import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import { UserButton } from '@clerk/clerk-react'

function Header() {
    const {user, isSignedIn} = useUser()
  return (
    <>
        <div className='sticky top-0 z-50 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-b'>
            <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                    <img src="/logo.svg" alt="AI Resume Builder" className='h-7 w-auto' />
                    <span className='hidden sm:block font-semibold tracking-tight'>AI Resume Builder</span>
                </div>

                {
                    isSignedIn ? 
                    <div className='flex gap-3 items-center'>
                        <Link to={"/dashboard"}>
                            <Button className="bg-[#9f5bff] hover:bg-[#8d45ff] text-white cursor-pointer rounded-full px-5">Dashboard</Button>
                        </Link>
                        <UserButton/>
                    </div> :
                    <Link to={"/auth/sign-in"}>
                        <Button className="bg-[#9f5bff] hover:bg-[#8d45ff] text-white cursor-pointer rounded-full px-5">Get Started</Button>
                    </Link>
                }
            </div>
        </div>
    </>
  )
}

export default Header