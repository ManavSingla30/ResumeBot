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
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4'>
        <h2 className='font-bold text-lg'>Personal Detail</h2>
        <p>Get Started with basic information</p>

        <form onSubmit={onSave}>
            <div className='grid grid-cols-2 mt-5 gap-3'>
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
            <div className='mt-3 flex justify-end'>
                <Button type='submit' disabled={loading}>{loading ? <LoaderCircle className='animate-spins'/> : 'Save'}</Button>
            </div>
        </form>
    </div>
  )
}

export default PersonalDetail