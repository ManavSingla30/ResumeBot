import React, { useState } from 'react'
import { Ghost, PlusSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {v4 as uuidv4} from "uuid"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

function AddResume() {

    const [openDialog, setOpenDialog] = useState(false);
    const [resumeTitle, setResumeTitle] = useState();
    const onCreate = () => {
        const uuid = uuidv4();

    }
  return (
    <div className='p-14 py-24 border items-center flex justify-center bg-secondary rounded-lg h-[280px] hover:scale-105 transition-all hover:shadow-md cursor-pointer border-dotted' onClick={() => {setOpenDialog(true)}}>
        <PlusSquare/>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="bg-white">
            <DialogHeader>
            <DialogTitle>Create New Resume</DialogTitle>
            <DialogDescription>
                Add a title for your new Resume
                <Input className="my-2" placeholder="Ex.Full Stack Resume" onChange={(e) => setResumeTitle(e.target.value)}/>
            </DialogDescription>
            <div className='flex justify-end gap-5'>
                    
                <Button variant="ghost" onClick={(e) => {
                    e.stopPropagation();
                    setOpenDialog(false)
                }}>Cancel</Button>
                <Button 
                    disabled = {!resumeTitle}
                className="bg-[#9f5bff] text-white" onClick={() => onCreate()}>Create</Button>
            </div>
            </DialogHeader>
        </DialogContent>
        </Dialog>
  
    </div>
  )
}

export default AddResume