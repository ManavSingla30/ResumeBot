import React, { useEffect, useState } from 'react'
import AddResume from './components/AddResume'
import { useUser } from '@clerk/clerk-react'
import ResumeCardItem from './components/ResumeCardItem'
import { Grid2X2 } from 'lucide-react'

function Dashboard() {
  const {user} = useUser()
  const userEmail = user?.primaryEmailAddress?.emailAddress
  const [resumeList, setResumeList] = useState([])
  const [loading, setLoading] = useState(true)
  

  const handleDeleted = (deletedResumeId) => {
    setResumeList((list) => list.filter((r) => r.resumeId !== deletedResumeId))
  }

  useEffect(() => {
    async function getResumeList(){
      if(!userEmail) return
      try{
        setLoading(true)
        const response = await fetch(`/resumes?userEmail=${encodeURIComponent(userEmail)}`, { method: 'GET' })
        if(response.ok){
          const data = await response.json()
          setResumeList(data.data || [])
        }
      } finally {
        setLoading(false)
      }
    }
    getResumeList()
  }, [userEmail])

  

  return ( 
    <div className='px-0 pb-10 md:px-0'>
      {/* Colorful Hero */}
      <div className='relative overflow-hidden'>
        <div className='relative mx-auto max-w-7xl px-6 pt-10'>
          <div className='rounded-3xl bg-gradient-to-r from-[#9f5bff] via-[#7a5cff] to-[#4f46e5] p-[1px] shadow-[0_10px_30px_rgba(0,0,0,0.1)]'>
            <div className='rounded-3xl bg-white/90 p-8 dark:bg-neutral-900/90'>
              <h2 className='text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-[#7a40ff] to-[#4f46e5] bg-clip-text text-transparent'>Your Resumes</h2>
              <p className='mt-2 text-neutral-700 dark:text-neutral-300'>Create, customize, and export stunning resumes with AI.</p>
              <div className='mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4'>
                <AddResume/>
                {loading && Array.from({length:3}).map((_,i)=> (
                  <div key={i} className='group relative h-[280px] overflow-hidden rounded-2xl border border-white/40 bg-gradient-to-br from-purple-200 via-pink-200 to-yellow-200 p-6 opacity-60 animate-pulse'/>
                ))}
                {!loading && resumeList.map((resume) => (
                  <ResumeCardItem key={resume._id} resume={resume} onDeleted={handleDeleted} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {!loading && resumeList.length === 0 && (
        <div className='mx-auto mt-12 max-w-7xl px-6'>
          <div className='rounded-2xl border border-dashed p-10 text-center text-neutral-600 dark:border-neutral-800 dark:text-neutral-300'>
            <Grid2X2 className='mx-auto mb-2 size-6 opacity-60'/>
            No resumes yet. Create your first one to get started.
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard