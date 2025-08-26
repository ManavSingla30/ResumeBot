import React, { useContext, useState } from 'react'
import PersonalDetail from './forms/PersonalDetail'
import { Button } from '@/components/ui/button'
import { ArrowRight, LayoutGrid, ArrowLeft } from 'lucide-react'
import Summary from "./forms/Summary"
import Expirience from './forms/Expirience'
import Education from './forms/Education'
import { Link, Navigate, useParams } from 'react-router-dom'
import Skills from './forms/Skills'
import { Home } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'

function FormSection() {
  const [activeFormIndex, setActiveFormIndex] = useState(1)
  const [enableNext, setEnableNext] = useState(false)
  const [resumeInfo, setResumeInfo] = useContext(ResumeInfoContext)
  const {resumeId} = useParams();

  const themePresets = [
    '#9f5bff', '#6a34ff', '#ff6666', '#10b981', '#0ea5e9', '#f59e0b', '#ef4444', '#22c55e', '#a855f7', '#14b8a6'
  ]

  const handleThemeSelect = (color) => {
    setResumeInfo({ ...resumeInfo, themeColor: color })
  }
  return (
    <div>
      <div className='flex justify-between items-center'>
        <div className='flex gap-5'>
          <Link to = {"/dashboard"}><Button><Home/></Button></Link>
          <Dialog>
            <DialogTrigger asChild>
              <Button size='sm' className='flex gap-2'><LayoutGrid/>Theme</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Choose theme color</DialogTitle>
              </DialogHeader>
              <div className='grid grid-cols-5 gap-3'>
                {themePresets.map((c) => (
                  <button
                    key={c}
                    onClick={() => handleThemeSelect(c)}
                    className='h-10 w-full rounded-md border'
                    style={{ backgroundColor: c, borderColor: c === resumeInfo?.themeColor ? 'black' : 'transparent' }}
                    aria-label={`Select ${c}`}
                  />
                ))}
              </div>
            </DialogContent>
          </Dialog>
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