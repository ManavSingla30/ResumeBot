import React, { useContext, useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Rating, RoundedStar } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { Button } from '@/components/ui/button'
import { LoaderCircle } from 'lucide-react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

function Skills() {
  const [skillsList, setSkillsList] = useState([{ name: '', rating: 0 }])
  const { resumeId } = useParams()
  const [loading, setLoading] = useState(false)
  const [resumeInfo, setResumeInfo] = useContext(ResumeInfoContext)

  // Initialize skillsList from context once on mount
  useEffect(() => {
    if (resumeInfo?.skills && resumeInfo.skills.length > 0) {
      setSkillsList(resumeInfo.skills)
    }
  }, [resumeInfo])

  const ratingStyle = {
    itemShapes: RoundedStar,
    activeFillColor: '#f59e0b',
    inactiveFillColor: '#e5e7eb'
  }

  const handleChange = (index, name, value) => {
    const newSkillsList = skillsList.map((item, i) =>
      i === index ? { ...item, [name]: value } : item
    )
    setSkillsList(newSkillsList)

    // update context here immediately
    setResumeInfo(prev => ({ 
      ...prev, 
      skills: newSkillsList 
    }))
  }

  const AddNewSkills = () => {
    setSkillsList([...skillsList, { name: '', rating: 0 }])
  }

  const RemoveSkills = () => {
    setSkillsList((skillsList) => skillsList.slice(0, -1))
  }

  const onSave = async () => {
  setLoading(true)
  try {
    const data = {
      skills: skillsList.map(({ id, ...rest }) => rest),
    }

    const res = await fetch(`/resumes/${resumeId}`, {
      method: 'POST', // Or 'PUT'/'PATCH' if your backend expects
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    if (!res.ok) {
      console.error('Failed to save skills')
      // Optionally notify user here
    } else {
      // Update context with saved skills
      setResumeInfo((prev) => ({
        ...prev,
        skills: skillsList,
      }))
    }
  } catch (error) {
    console.error('Error saving skills:', error)
    // Optionally notify user here
  } finally {
    setLoading(false)
  }
}

  return (
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
      <h2 className='font-bold text-lg'>Skills</h2>
      <p>Add Your top professional key skills</p>

      <div>
        {skillsList.map((item, index) => (
          <div
            key={index}
            className='flex justify-between mb-2 border rounded-lg p-3'
          >
            <div>
              <label className='text-xs'>Name</label>
              <Input
                className='w-full'
                name='name'
                value={item.name}
                onChange={(e) => handleChange(index, 'name', e.target.value)}
              />
            </div>
            <Rating
              style={{ maxWidth: 120 }}
              value={item.rating}
              onChange={(v) => handleChange(index, 'rating', v)}
              itemStyles={ratingStyle}
            />
          </div>
        ))}
      </div>

      <div className='flex justify-between'>
        <div className='flex gap-2'>
          <Button
            variant='outline'
            onClick={AddNewSkills}
            className='text-primary'
          >
            + Add More Skill
          </Button>
          <Button
            variant='outline'
            onClick={RemoveSkills}
            className='text-primary'
          >
            - Remove
          </Button>
        </div>
        <Button disabled={loading} onClick={onSave}>
          {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
        </Button>
      </div>
    </div>
  )
}

export default Skills
