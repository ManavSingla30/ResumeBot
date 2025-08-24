import React, { useEffect, useState } from 'react'
import AddResume from './components/AddResume'
import { useUser } from '@clerk/clerk-react'
import ResumeCardItem from './components/ResumeCardItem'
import { Skeleton } from '@/components/ui/skeleton'

function Dashboard() {
  const {user} = useUser()
  const userEmail = user?.primaryEmailAddress?.emailAddress
  const [resumeList, setResumeList] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function getResumeList(){
      if(!userEmail){
        setIsLoading(false)
        return
      }
      try{
        setIsLoading(true)
        const response = await fetch(`/resumes?userEmail=${encodeURIComponent(userEmail)}`, {
          method: 'GET'
        })
        if(response.ok){
          const data = await response.json()
          setResumeList(Array.isArray(data?.data) ? data.data : [])
        }
      } finally {
        setIsLoading(false)
      }
    }
    getResumeList()
  }, [userEmail])

  return ( 
    <div className='min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-100 px-6 md:px-16 lg:px-24 py-12'>
      <div className='mb-10 flex flex-col md:flex-row items-start md:items-center justify-between'>
        <div>
          <h2 className='text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900'>My Resume</h2>
          <p className='text-gray-600 mt-2'>Start creating <span className='text-primary font-semibold'>AI resumes</span> for your next job role</p>
        </div>
        <div className='mt-4 md:mt-0'>
          <a href='/dashboard' className='px-4 py-2 rounded-lg bg-primary text-white shadow hover:shadow-lg transition-colors'>Dashboard</a>
        </div>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
        <AddResume />

        {isLoading && (
          Array.from({length: 3}).map((_, index) => (
            <div key={index} className='space-y-2'>
              <Skeleton className='h-[280px] w-full rounded-xl' />
              <Skeleton className='h-4 w-2/3 mx-auto' />
            </div>
          ))
        )}

        {!isLoading && resumeList.length === 0 && (
          <div className='col-span-full text-center py-12'>
            <img alt='No resumes' className='mx-auto w-36 mb-4 opacity-80' src='https://illustrations.popsy.co/gray/resume.svg' />
            <p className='text-gray-600'>No resumes yet. Click <span className='text-primary font-semibold'>Add New</span> to create one.</p>
          </div>
        )}

        {!isLoading && resumeList.length > 0 && resumeList.map((resume) => (
          <ResumeCardItem key={resume._id} resume={resume} />
        ))}
      </div>
    </div>
  )
}

export default Dashboard