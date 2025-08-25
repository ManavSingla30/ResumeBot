import React from 'react'

function ProfessionalExpiriencePreview({resumeInfo}) {
  return (
    <div className='my-6'>
        <h2 className='text-center font-bold text-sm mb-2' style={{color: resumeInfo?.themeColor}}>Professional Expirience</h2>
        <hr style={{borderColor: resumeInfo?.themeColor}}/>

        {resumeInfo?.expirience?.map((expirience, index) => (
            <div key={index} className='my-5'>
                <h2 className='text-sm font-bold'>{expirience?.title}</h2>
                <h2 className='text-xs flex justify-between'>{expirience?.companyName}, {expirience?.city}, {expirience?.state} <span>{expirience?.startDate} - {expirience?.currentlyWorking?'Present': expirience?.endDate}</span></h2>
                {/* <p className='text-xs my-2'>{expirience?.workSummary}</p> */}
                <div dangerouslySetInnerHTML={{ __html: expirience?.workSummary }}></div>
            </div>
        ))}
    </div>
  )
}

export default ProfessionalExpiriencePreview