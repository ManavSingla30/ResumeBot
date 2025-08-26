import React, { useEffect, useState } from 'react'
import AddResume from './components/AddResume'
import { useUser } from '@clerk/clerk-react'
import ResumeCardItem from './components/ResumeCardItem'
import { Notebook } from 'lucide-react'

function Dashboard() {
  const {user} = useUser()
  const userEmail = user?.primaryEmailAddress?.emailAddress
  const [resumeList, setResumeList] = useState([])
  const handleDeleted = (deletedResumeId) => {
    setResumeList((list) => list.filter((r) => r.resumeId !== deletedResumeId))
  }
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
    <div className='p-6 md:px-12 lg:px-24'>
      <div className='flex items-start justify-between'>
        <div>
          <h2 className='font-bold text-3xl md:text-4xl'>My Resumes</h2>
          <p className='text-gray-500'>Create and manage AI-generated resumes</p>
        </div>
      </div>

      {resumeList.length === 0 ? (
        <div className='mt-10 rounded-2xl border bg-white p-10 text-center shadow-sm'>
          <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-50 ring-1 ring-purple-100'>
            <Notebook className='w-8 h-8 text-purple-600'/>
          </div>
          <h3 className='text-lg font-semibold'>No resumes yet</h3>
          <p className='text-gray-500 mb-6'>Start by creating your first resume below</p>
          <div className='mx-auto w-full max-w-sm'>
            <AddResume/>
          </div>
        </div>
      ) : (
        <>
          <h3 className='mt-10 text-sm font-medium text-gray-500'>Your resumes</h3>
          <div className='mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5'>
            <AddResume/>
            {resumeList.map((resume) => (
              <ResumeCardItem key={resume._id} resume={resume} onDeleted={handleDeleted} />
            ))}
          </div>
        </>
      )}

    </div>
  )
}

export default Dashboard