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
        <div className='h-[280px] rounded-2xl border bg-white p-10 flex items-center justify-center shadow-sm ring-1 ring-gray-100 hover:shadow-lg hover:scale-[1.02] transition-all'>
          <Notebook className='w-10 h-10 text-gray-600'/>
        </div>
        <div className='flex items-center justify-between mt-2'>
          <h2 className='font-semibold text-gray-800 truncate'>{resume.title}</h2>
          <button
            aria-label='Actions'
            className='p-1 rounded hover:bg-gray-100'
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
        <div className='absolute right-0 mt-1 w-40 bg-white border rounded-xl shadow-lg z-10'>
          <button
            className='w-full text-left px-3 py-2 hover:bg-gray-50 flex items-center gap-2'
            onClick={(e)=>{e.preventDefault(); e.stopPropagation(); navigate(`/dashboard/resume/${resume.resumeId}/edit`); setMenuOpen(false)}}
          >
            <Pencil size={16}/> Edit
          </button>
          <button
            className='w-full text-left px-3 py-2 hover:bg-gray-50 flex items-center gap-2'
            onClick={(e)=>{e.preventDefault(); e.stopPropagation(); navigate(`/dashboard/resume/${resume.resumeId}/edit`); setMenuOpen(false)}}
          >
            <Eye size={16}/> View
          </button>
          <button
            className='w-full text-left px-3 py-2 hover:bg-gray-50 flex items-center gap-2'
            onClick={handleDownload}
          >
            <Download size={16}/> Download
          </button>
          <button
            className='w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 flex items-center gap-2'
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