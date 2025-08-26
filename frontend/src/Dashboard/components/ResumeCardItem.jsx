import React, { useState } from 'react'
import { Notebook, MoreHorizontal, Pencil, Eye, Download, Trash2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

function ResumeCardItem({resume, onDeleted}) {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleDelete = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    if(!confirm('Delete this resume?')) return
    try{
      const response = await fetch(`/resumes/${encodeURIComponent(resume.resumeId)}`, {
        method: 'DELETE'
      })
      if(!response.ok){
        const data = await response.json().catch(() => null)
        throw new Error((data && data.message) || 'Failed to delete resume')
      }
      if(typeof onDeleted === 'function') onDeleted(resume.resumeId)
    }catch(err){
      alert(err.message)
    }
  }

  const handleDownload = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    // Placeholder: implement actual download from view/print later
    window.print()
  }

  return (
    <div className='relative'>
      <Link to={`/dashboard/resume/` + resume.resumeId + `/edit`}>
        <div className='group relative h-[280px] overflow-hidden rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900'>
          <div className='absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent opacity-100 transition-opacity group-hover:opacity-100 dark:from-purple-500/10'/>
          <div className='relative z-10 flex h-full flex-col items-center justify-center gap-3'>
            <div className='flex size-12 items-center justify-center rounded-full bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300'>
              <Notebook/>
            </div>
            <h3 className='text-base font-semibold text-center'>
              {resume.title}
            </h3>
          </div>
        </div>
        <div className='mt-2 flex items-center justify-end'>
          <button
            aria-label='Actions'
            className='rounded p-1 hover:bg-gray-100 dark:hover:bg-neutral-800'
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setMenuOpen((v) => !v)
            }}
          >
            <MoreHorizontal size={18}/>
          </button>
        </div>
      </Link>

      {menuOpen && (
        <div className='absolute right-0 mt-1 w-44 overflow-hidden rounded-md border bg-white shadow-lg z-10 dark:border-neutral-800 dark:bg-neutral-900'>
          <button
            className='w-full text-left px-3 py-2 hover:bg-gray-50 dark:hover:bg-neutral-800 flex items-center gap-2'
            onClick={(e)=>{e.preventDefault(); e.stopPropagation(); navigate(`/dashboard/resume/${resume.resumeId}/edit`); setMenuOpen(false)}}
          >
            <Pencil size={16}/> Edit
          </button>
          <button
            className='w-full text-left px-3 py-2 hover:bg-gray-50 dark:hover:bg-neutral-800 flex items-center gap-2'
            onClick={(e)=>{e.preventDefault(); e.stopPropagation(); navigate(`/dashboard/resume/${resume.resumeId}/edit`); setMenuOpen(false)}}
          >
            <Eye size={16}/> View
          </button>
          <button
            className='w-full text-left px-3 py-2 hover:bg-gray-50 dark:hover:bg-neutral-800 flex items-center gap-2'
            onClick={handleDownload}
          >
            <Download size={16}/> Download
          </button>
          <button
            className='w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 flex items-center gap-2'
            onClick={handleDelete}
          >
            <Trash2 size={16}/> Delete
          </button>
        </div>
      )}
    </div>
  )
}

export default ResumeCardItem