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
    <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10'>
      <h2 className='font-bold text-3xl md:text-4xl tracking-tight'>My Resume</h2>
      <p className='text-muted-foreground mt-1'>Start creating an AI resume for your next role.</p>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-8'>
        <AddResume/>
        {resumeList.length > 0 && resumeList.map((resume) => (
          <ResumeCardItem key={resume._id} resume={resume} />
        ))}
      </div>
      {/* <div className='mt-10'>
        <h3 className='font-bold text-x1 mb-4'>Your Resumes:</h3>
        {resumeList.length === 0 ? (
          <p>No Resume found.</p>
        ) : (
          <ul>
            {resumeList.map((resume) => (
              <li key={resume._id} className='border p-3 mb-3 rounded'>
                <h4 className='font-semibold'>{resume.title}</h4>
                <p>Resume ID: {resume.resumeId}</p>
                <p>User Email: {resume.userEmail}</p>
                <p>Username: {resume.username}</p>
              </li>
            ))}
          </ul>
        )}
      </div> */}
    </div>
  )
}

export default Dashboard