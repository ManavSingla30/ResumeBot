import React from 'react'
import { Notebook } from 'lucide-react'
import { Link } from 'react-router-dom'
function ResumeCardItem({resume}) {
  return (
    <Link to={`/dashboard/resume/` + resume.resumeId + `/edit`}>
      <div className='group relative flex flex-col items-center justify-center h-[240px] rounded-2xl border bg-white hover:shadow-md transition-all p-6'>
        <div className='grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-indigo-100 to-sky-100 text-indigo-600'>
          <Notebook/>
        </div>
        <h2 className='mt-3 text-sm font-medium text-center'>{resume.title}</h2>
      </div>
    </Link>
  )
}

export default ResumeCardItem