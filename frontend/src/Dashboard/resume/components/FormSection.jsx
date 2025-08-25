import React, { useState } from 'react'
import PersonalDetail from './forms/PersonalDetail'
import { Button } from '@/components/ui/button'
import { ArrowRight, LayoutGrid, ArrowLeft } from 'lucide-react'
import Summary from "./forms/Summary"
import Expirience from './forms/Expirience'
import Education from './forms/Education'
import { Link, Navigate, useParams } from 'react-router-dom'
import Skills from './forms/Skills'
import { Home } from 'lucide-react'

function FormSection() {
  const [activeFormIndex, setActiveFormIndex] = useState(1)
  const [enableNext, setEnableNext] = useState(false)
  const {resumeId} = useParams();
  return (
    <div>
      <div className='flex justify-between items-center'>
        <div className='flex gap-5'>
          <Link to = {"/dashboard"}><Button><Home/></Button></Link>
          <Button size='sm' className='flex gap-2'><LayoutGrid/>Theme</Button>
        </div>
        <div className='flex gap-2'>
          {activeFormIndex > 1 && <Button size='sm' onClick={() => setActiveFormIndex(activeFormIndex-1)}><ArrowLeft/></Button>}
          <Button className='flex gap-2 size-sm' onClick={() => setActiveFormIndex(activeFormIndex+1)} disabled={!enableNext}>Next <ArrowRight/></Button></div>
      </div>
      {activeFormIndex == 1 ? <PersonalDetail enabledNext={(v) => setEnableNext(v)}/> : activeFormIndex == 2 ? <Summary enabledNext={(v) => setEnableNext(v)}/> : 
      activeFormIndex == 3 ? <Expirience enabledNext={(v) => setEnableNext(v)}/> : activeFormIndex == 4 ? <Education/> : activeFormIndex == 5 ? <Skills/> : activeFormIndex == 6 ? <Navigate to = {'/my-resume/'+resumeId+'/view'}/> : null}
    </div>
  )
}

export default FormSection