import React, { useContext } from 'react'
import {ResumeInfoContext} from '@/context/ResumeInfoContext'
import PersonalDetailPreview from './preview/PersonalDetailPreview'
import SummaryPreview from './preview/SummaryPreview'
import ProfessionalExpiriencePreview from './preview/ProfessionalExpiriencePreview'
import EducationalPreview from './preview/EducationalPreview'
import SkillPreview from './preview/SkillPreview'

function ResumePreview() {
    const [resumeInfo, setResumeInfo] = useContext(ResumeInfoContext)
  return (
    <div className='shadow-lg h-full p-14 border-t-[20px]' style={{borderColor: resumeInfo?.themeColor}}>
      <PersonalDetailPreview resumeInfo={resumeInfo}/>
      <SummaryPreview resumeInfo={resumeInfo}/>
      <ProfessionalExpiriencePreview resumeInfo={resumeInfo}/>
      <EducationalPreview resumeInfo = {resumeInfo}/>
      <SkillPreview resumeInfo={resumeInfo}/>
    </div>
  )
}

export default ResumePreview