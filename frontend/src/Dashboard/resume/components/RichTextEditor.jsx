import React, { useContext, useEffect, useState } from 'react'
import { BtnBold, BtnBulletList, BtnClearFormatting, BtnItalic, BtnLink, BtnNumberedList, BtnRedo, BtnStrikeThrough, BtnStyles, BtnUnderline, BtnUndo, Editor, EditorProvider, HtmlButton, Separator, Toolbar } from 'react-simple-wysiwyg'
import { Button } from '@/components/ui/button'
import { Brain, LoaderCircle } from 'lucide-react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { toast } from 'sonner'
const PROMPT = 'position title: {positionTitle}, Depends on position title give me 5-7 bullet points for my expirience in resume, give me result in HTML format'
function RichTextEditor({onRichTextEditorChange, index, defaultValue}) {
    const [value, setValue] = useState(defaultValue || "")
    const [resumeInfo, setResumeInfo] = useContext(ResumeInfoContext)
    const [loading, setLoading] = useState()
    const [prompt, setPrompt] = useState()
    const GenerateSummaryfromAI = async() => {
        if (!resumeInfo?.expirience[index]?.title) {
            toast('Please Add Position Title');
            return;
        }
        
        setLoading(true);
        try {
            const promptTemplate = PROMPT.replace('{positionTitle}', resumeInfo.expirience[index].title);
            console.log(promptTemplate)
            const res = await fetch('http://localhost:8000/api/gemini/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: promptTemplate }),
            });
            const data = await res.json();
            setValue(data.result);
            onRichTextEditorChange(data.result); // Update parent once
        } catch (error) {
            console.error('Error calling backend:', error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        setValue(defaultValue || "");

    }, [defaultValue])
   return (
    <div>
        <div className='flex justify-between my-2'>
            <label className='text-xs'>Summary</label>
            <Button onClick={GenerateSummaryfromAI} className='flex gap-2 border-primary text-primary' size='sm'>
                {loading ? <LoaderCircle className='animate-spin'/> : 
                <>
                    <Brain className='h-4 w-4'/> Generate with AI
                </>
}               </Button>

        </div>
        <EditorProvider>
            <Editor
                value={value}
                onChange={(e) => {
                    const newValue = e.target.value;
                    setValue(newValue);
                    onRichTextEditorChange(newValue); // Pass only string
                }}
            >

                <Toolbar>
                    <BtnUndo />
                    <BtnRedo  />
                    <Separator />
                    <BtnBold />
                    <BtnItalic />
                    <BtnUnderline />
                    <BtnStrikeThrough />
                    <Separator />
                    <BtnNumberedList />
                    <BtnBulletList />
                    <Separator />
                    <BtnLink />
                    <BtnClearFormatting />
                    <HtmlButton />
                    <Separator />
                    <BtnStyles />
                </Toolbar>
            </Editor>
        </EditorProvider>
    </div>
  )
}

export default RichTextEditor