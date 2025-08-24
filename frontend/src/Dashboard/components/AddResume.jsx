import React, { useState } from 'react'
import { Ghost, PlusSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {v4 as uuidv4} from "uuid"
import { useAuth } from '@clerk/clerk-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'

function AddResume() {
    const {getToken} = useAuth()
    const {user, isSignedIn} = useUser()
    const [openDialog, setOpenDialog] = useState(false);
    const [resumeTitle, setResumeTitle] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const navigate = useNavigate()
    const onCreate = async () => {
        setError('')
        setSuccess('')

        if(!resumeTitle.trim()){
            setError("Please enter a resume title.")
            return 
        }

        if(!isSignedIn || !user){
            setError('You must be signed in to create a resume.')
            return
        }

        const resumeId = uuidv4()

        const payload = {
            title: resumeTitle,
            resumeId,
            userEmail: user?.primaryEmailAddress.emailAddress,
            username: user?.fullName
        }

        try{
            setLoading(true)
            console.log("Submitting....")
            const response = await fetch('/resumes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload),
            })
            console.log(payload)

            if(!response.ok){
                const resp = await response.json()
                throw new Error(resp.message || 'Failed to create resume Info')
            }

            const data = await response.json()
            setSuccess(`Resume ${data.title} created successfully!`)
            setResumeTitle('')
            setOpenDialog(false)
        }
        catch (err){
            setError(err.message)
        }
        finally{
            setLoading(false)
            navigate(`/dashboard/resume/` + resumeId + `/edit`)
        }

    }
  return (
    <div className='group relative flex flex-col items-center justify-center h-[240px] rounded-2xl border border-dashed border-primary/40 bg-white hover:border-primary/60 hover:shadow-md transition-all cursor-pointer p-6 text-center' onClick={() => {setOpenDialog(true)}}>
        <div className='grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-violet-100 to-fuchsia-100 text-[#7C3AED] mb-3'>
          <PlusSquare/>
        </div>
        <div>
          <div className='text-sm font-medium'>Add New Resume</div>
          <p className='text-xs text-muted-foreground mt-1'>Start from a blank slate with AI.</p>
        </div>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="bg-white" onClick={(e)=>e.stopPropagation()}>
            <DialogHeader>
            <DialogTitle>Create New Resume</DialogTitle>
            <DialogDescription>
                Add a title for your new Resume
                <Input className="my-2" placeholder="Ex.Full Stack Resume" value={resumeTitle} onChange={(e) => setResumeTitle(e.target.value)}/>
            </DialogDescription>
            <div className='flex justify-end gap-5'>
                    
                <Button variant="ghost" onClick={(e) => {
                    e.stopPropagation();
                    setOpenDialog(false)
                    setError('')
                    setSuccess('')
                    setResumeTitle('')
                }}>Cancel</Button>
                <Button 
                    disabled = {!resumeTitle || loading}
                className="bg-[#9f5bff] hover:bg-[#8d45ff] text-white" onClick={() => onCreate()}>{loading? 'Creating...' : 'Create'}</Button>
            </div>
            </DialogHeader>
            {error && <p style={{color: 'red', marginTop: '8px'}}> {error} </p>}
            {success && <p style={{color: 'green', marginTop: '8px'}}> {error} </p>}
        </DialogContent>
        </Dialog>
  
    </div>
  )
}

export default AddResume