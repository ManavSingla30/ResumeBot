import React, { useContext, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { useParams } from 'react-router-dom'
function Summary() {
    const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext)
    const params = useParams()
    const [summary, setSummary] = useState()
    useEffect(() => {
        setResumeInfo(prev => ({
            ...prev,
            summary
        }))
    }, [summary])

    async function onSave(e){
        e.preventDefault()
        const resumeId = params?.resumeId

        try {
        const res = await fetch(`/resumes/${resumeId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ summary }) 
        });

        if (!res.ok) {
            console.error('Failed to update summary');
        }
        } catch (error) {
        console.error('Error saving summary:', error);
        }

    }
  return (
    <div>
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4'>
            <h2 className='font-bold text-lg'>Summary</h2>
            <p>Add Summary for your Job Title</p>

            <form className='mt-7' onSubmit={onSave}>
                <div className='flex justify-between items-end'>
                    <label>Add Summary</label>
                    <Button size='sm' className='border-primary text-primary'>Generate with AI</Button>
                </div>
                <Textarea className="mt-5" required onChange={(e) => setSummary(e.target)}/>
                <div className='mt-2 flex justify-end'>
                    <Button>Save</Button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Summary