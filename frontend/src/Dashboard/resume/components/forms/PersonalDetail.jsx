import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext, useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useParams } from 'react-router-dom'
import { LoaderCircle } from 'lucide-react'
import {toast} from "sonner"

function PersonalDetail({enabledNext}) {
    const [resumeInfo, setResumeInfo] = useContext(ResumeInfoContext)
    const params = useParams()
    const [formData, setFormData] = useState(resumeInfo || {})

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setFormData(resumeInfo || {})
    }, [resumeInfo])
    const handleInputChange = (e) => {
        enabledNext(false)
        const {name, value} = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
        setResumeInfo((prev) => ({
            ...prev, 
            [name]: value,
        }))
    } 

    async function onSave (e) {
        e.preventDefault()
        setLoading(true)
        const resumeId = params?.resumeId
        await fetch(`/resumes/${resumeId}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData)
        })
        enabledNext(true)
        setLoading(true)
        toast("Details Updated")
    }
  return (
    <div className='p-5 rounded-xl border'>
        <h2 className='font-bold text-lg tracking-tight'>Personal Details</h2>
        <p className='text-sm text-muted-foreground'>Tell us about yourself.</p>

        <form onSubmit={onSave}>
            <div className='grid grid-cols-2 mt-5 gap-4'>
                <div>
                    <label className='text-sm'>First Name</label>
                    <Input name='firstname' defaultValue={resumeInfo?.firstname} required onChange={handleInputChange}/>
                </div>
                <div>
                    <label className='text-sm'>Last Name</label>
                    <Input name='lastname' defaultValue={resumeInfo?.lastname} required onChange={handleInputChange}/>
                </div>
                <div className='col-span-2'>
                    <label className='text-sm'>Job Title</label>
                    <Input name='jobtitle' defaultValue={resumeInfo?.jobtitle} required onChange={handleInputChange}/>
                </div>
                <div className='col-span-2'>
                    <label className='text-sm'>Address</label>
                    <Input name='address' defaultValue={resumeInfo?.address} required onChange={handleInputChange}/>
                </div>
                <div>
                    <label className='text-sm'>Phone</label>
                    <Input name='phone' defaultValue={resumeInfo?.phone} required onChange={handleInputChange}/>
                </div>
                <div>
                    <label className='text-sm'>Email</label>
                    <Input name='email' defaultValue={resumeInfo?.email} required onChange={handleInputChange}/>
                </div>
            </div>
            <div className='mt-4 flex justify-end'>
                <Button type='submit' disabled={loading} className='rounded-full px-5'>
                    {loading ? <LoaderCircle className='animate-spin'/> : 'Save'}
                </Button>
            </div>
        </form>
    </div>
  )
}

export default PersonalDetail