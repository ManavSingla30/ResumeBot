import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FormSection from '../../components/FormSection'
import ResumePreview from '../../components/ResumePreview'
import {ResumeInfoContext} from '@/context/ResumeInfoContext'
import dummy from '@/dummy/dummy'

function EditResume() {
    const params = useParams()
    const [resumeInfo, setResumeInfo] = useState()
    useEffect(() => {
        setResumeInfo(dummy)
    }, [])
    return (
        <ResumeInfoContext.Provider value={[ resumeInfo, setResumeInfo ]}>
            <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-start'>
                    <FormSection/>
                    <div className='md:sticky md:top-24'>
                        <div className='bg-white rounded-2xl border shadow-sm p-6'>
                            <ResumePreview/>
                        </div>
                    </div>
                </div>
            </div>
        </ResumeInfoContext.Provider>
    )
}

export default EditResume