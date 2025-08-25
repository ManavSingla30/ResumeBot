import React, { useEffect, useState } from 'react'
import AddResume from './components/AddResume'
import { useUser } from '@clerk/clerk-react'
import ResumeCardItem from './components/ResumeCardItem'

function Dashboard() {
  const {user} = useUser()
  const userEmail = user?.primaryEmailAddress?.emailAddress
  const [resumeList, setResumeList] = useState([])
  useEffect(() => {
    async function getResumeList(){
      if(!userEmail) return
      const response = await fetch(`/resumes?userEmail=${encodeURIComponent(userEmail)}`, {
        method: 'GET'
      })
      console.log(response)
      if(response.ok){
        const data = await response.json()
        setResumeList(data.data)
      }
    }
    getResumeList()
  }, [userEmail])
  return ( 
    <div className='p-10 md:px-20 lg:px-32'>
      <div>
        <h2 className='font-bold text-3xl tracking-tight'>My Resume</h2>
        <p className='text-sm text-muted-foreground mt-1'>Start creating your AI resume for your next role</p>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-8 gap-5'>
        <AddResume/>
        {resumeList.length > 0 && resumeList.map((resume) => (
          <ResumeCardItem key={resume._id} resume={resume} />
        ))}
      </div>
    </div>
  )
}

export default Dashboard