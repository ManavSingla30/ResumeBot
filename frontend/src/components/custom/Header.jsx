import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import { UserButton } from '@clerk/clerk-react'

function Header() {
    const {user, isSignedIn} = useUser()
  return (
    <>
        <div className='py-3 px-4 flex justify-between shadow-md'>
            <img src="/logo.svg" alt="AI Resume Builder" />

            {
                isSignedIn ? 
                <div className='flex gap-2 items-center'>
                    <Link to={"/dashboard"}>
                        <Button className="bg-[#9f5bff] text-white cursor-pointer">Dashboard</Button>
                    </Link>
                    <UserButton/>
                </div> :
                <Link to={"/auth/sign-in"}>
                <Button className="bg-[#9f5bff] text-white cursor-pointer">Get Started</Button>
                </Link>
            }
        </div>
    </>
  )
}

export default Header