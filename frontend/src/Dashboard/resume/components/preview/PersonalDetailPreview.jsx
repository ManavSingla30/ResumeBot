import React from 'react'

function PersonalDetailPreview({resumeInfo}) {
  return (
    <div className='shadow-lg h-full p-14 border-t-[20px]'>
        <h2>{resumeInfo?.firstName} {resumeInfo?.lastName}</h2>
    </div>
  )
}

export default PersonalDetailPreview