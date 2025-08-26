import React, { useEffect, useMemo, useState } from 'react'
import AddResume from './components/AddResume'
import { useUser } from '@clerk/clerk-react'
import ResumeCardItem from './components/ResumeCardItem'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, ArrowUpDown, Grid2X2 } from 'lucide-react'

function Dashboard() {
  const {user} = useUser()
  const userEmail = user?.primaryEmailAddress?.emailAddress
  const [resumeList, setResumeList] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [sortAsc, setSortAsc] = useState(true)

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

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const items = q ? resumeList.filter((r) => (r.title || '').toLowerCase().includes(q)) : resumeList
    const sorted = [...items].sort((a,b) => {
      const at = (a.title || '').toLowerCase()
      const bt = (b.title || '').toLowerCase()
      if(at < bt) return sortAsc ? -1 : 1
      if(at > bt) return sortAsc ? 1 : -1
      return 0
    })
    return sorted
  }, [resumeList, query, sortAsc])

  return ( 
    <div className='px-6 py-8 md:px-12 lg:px-24'>
      <div className='flex flex-col gap-1'>
        <h2 className='text-2xl md:text-3xl font-bold tracking-tight'>My Resumes</h2>
        <p className='text-neutral-600 dark:text-neutral-300'>Create, manage, and export resumes with AI assistance.</p>
      </div>

      <div className='mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
        <div className='flex w-full max-w-md items-center gap-2 rounded-lg border bg-white px-3 py-2 shadow-sm dark:border-neutral-800 dark:bg-neutral-900'>
          <Search className='size-4 text-neutral-500'/>
          <Input className='border-0 shadow-none focus-visible:ring-0' placeholder='Search resumes...' value={query} onChange={(e)=>setQuery(e.target.value)}/>
        </div>
        <div className='flex items-center gap-2'>
          <Button variant='outline' onClick={() => setSortAsc((v)=>!v)} className='flex items-center gap-2'>
            <ArrowUpDown className='size-4'/> Sort {sortAsc ? 'A–Z' : 'Z–A'}
          </Button>
        </div>
      </div>

      <div className='mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5'>
        <AddResume/>
        {loading && Array.from({length:3}).map((_,i)=> (
          <div key={i} className='group relative p-6 bg-white/80 backdrop-blur-sm rounded-2xl h-[280px] border border-neutral-200 animate-pulse'/>
        ))}
        {!loading && filtered.map((resume) => (
          <ResumeCardItem key={resume._id} resume={resume} onDeleted={handleDeleted} />
        ))}
      </div>

      {!loading && filtered.length === 0 && (
        <div className='mt-12 rounded-xl border border-dashed p-10 text-center text-neutral-600 dark:border-neutral-800 dark:text-neutral-300'>
          <Grid2X2 className='mx-auto mb-2 size-6 opacity-60'/>
          No resumes found. Create your first one to get started.
        </div>
      )}
    </div>
  )
}

export default Dashboard