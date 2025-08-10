import React, { useContext, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { useParams } from 'react-router-dom'
import { LoaderCircle } from 'lucide-react'
import { useState } from 'react'
import { Brain } from 'lucide-react'
function Summary() {
    const [resumeInfo, setResumeInfo] = useContext(ResumeInfoContext)
    const params = useParams()
    const [loading, setLoading] = useState()
    const [summary, setSummary] = useState(resumeInfo?.summary || '')
    const [prompt, setPrompt] = useState()
    const [result, setResult] = useState()
    useEffect(() => {
        console.log(resumeInfo)
        setResumeInfo((prev) => ({
            ...prev,
            summary
        }))
    }, [summary])

    async function onSave(e){
        e.preventDefault()
        setLoading(true)
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
        finally{
            setLoading(false)
        }

    }

    async function handleGenerate() {
        try {
            const res = await fetch('http://localhost:8000/api/gemini/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: "Tell me about AI" }),
            });

            if (!res.ok) {
            // Something went wrong, log the error message from the body
            const errorText = await res.text();
            console.error('Failed to generate:', errorText);
            return;
            }

            const data = await res.json();
            console.log(data.result)
            setResult(data.result);
        } catch (error) {
            console.error('Error calling openai backend:', error);
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
                    <Button size='sm' type = 'button' className='border-primary text-primary gap-2 flex' onClick = {handleGenerate}><Brain className='h-4 w-4'/>Generate with AI</Button>
                </div>
                <Textarea className="mt-5" required value = {summary || ''} onChange={(e) => setSummary(e.target.value)}/>
                <div className='mt-2 flex justify-end'>
                    <Button type='submit' disabled={loading}>{loading ? <LoaderCircle className='animate-spins'/> : 'Save'}</Button>
                </div>
            </form>
        </div>
        {result && <div>
            <h2 className='font-bold text-lg'></h2>
            
        </div>}
    </div>
  )
}

export default Summary