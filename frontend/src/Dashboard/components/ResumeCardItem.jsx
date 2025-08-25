import React from 'react'
import { Notebook } from 'lucide-react'
import { Link } from 'react-router-dom'
function ResumeCardItem({resume}) {
  return (
    <Link to={`/dashboard/resume/` + resume.resumeId + `/edit`}>
      <div className='group flex flex-col h-[280px] rounded-xl border bg-white/80 hover:bg-white transition-colors hover:shadow-lg hover:shadow-primary/10 hover:scale-[1.01]'>
        <div className='flex-1 flex items-center justify-center'>
          <Notebook className='h-8 w-8 text-primary'/>
        </div>
        <div className='px-4 py-3 border-t'>
          <h2 className='text-sm font-medium truncate text-center'>{resume.title}</h2>
        </div>
      </div>
    </Link>
  )
}

export default ResumeCardItem