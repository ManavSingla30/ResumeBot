import React from 'react'
import { FileText } from 'lucide-react'
import { Link } from 'react-router-dom'
function ResumeCardItem({resume, className=''}) {
  return (
    <Link to={`/dashboard/resume/` + resume.resumeId + `/edit`} className={`group ${className}`}>
      <div className='relative h-[280px] rounded-2xl bg-gradient-to-br from-rose-200 via-purple-200 to-sky-200 shadow-sm ring-1 ring-gray-200/60 flex items-center justify-center overflow-hidden transition-transform group-hover:scale-[1.02] group-hover:shadow-lg'>
        <FileText className='w-10 h-10 text-gray-700 opacity-80' />
      </div>
      <div className='-mt-3 mx-3 px-4 py-2 rounded-xl bg-rose-500 text-white text-sm font-medium shadow group-hover:shadow-md flex items-center justify-between'>
        <span className='truncate'>{resume.title}</span>
        <span className='opacity-80 text-xs'>Open</span>
      </div>
    </Link>
  )
}

export default ResumeCardItem