import React, { useState } from 'react'
import PersonalDetail from './forms/PersonalDetail'
import { Button } from '@/components/ui/button'
import { ArrowRight, LayoutGrid, ArrowLeft } from 'lucide-react'
import Summary from "./forms/Summary"

function FormSection() {
  const [activeFormIndex, setActiveFormIndex] = useState(1)
  const [enableNext, setEnableNext] = useState(false)
  return (
    <div className='bg-white rounded-2xl border shadow-sm p-6'>
      <div className='flex justify-between items-center'>
        <Button size='sm' className='flex gap-2 rounded-full px-4'><LayoutGrid/>Theme</Button>
        <div className='flex gap-2'>
          {activeFormIndex > 1 && <Button size='sm' className='rounded-full' onClick={() => setActiveFormIndex(activeFormIndex-1)}><ArrowLeft/></Button>}
          <Button className='flex gap-2 size-sm rounded-full' onClick={() => setActiveFormIndex(activeFormIndex+1)} disabled={!enableNext}>Next <ArrowRight/></Button></div>
      </div>
      <div className='mt-6'>
        {activeFormIndex == 1 ? <PersonalDetail enabledNext={(v) => setEnableNext(v)}/> : activeFormIndex == 2 ? <Summary/> : null}
      </div>
    </div>
  )
}

export default FormSection