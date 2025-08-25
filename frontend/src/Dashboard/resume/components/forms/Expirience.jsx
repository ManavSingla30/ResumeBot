import React, { useContext, useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import RichTextEditor from '../RichTextEditor'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { LoaderCircle } from 'lucide-react'
import { useParams } from 'react-router-dom'

const formField = {
  title: '',
  companyName: '',
  city: '',
  state: '',
  startDate: '',
  endDate: '',
  workSummary: ''
}

function Expirience() {
  const [resumeInfo, setResumeInfo] = useContext(ResumeInfoContext)
  const [expirienceList, setExpirienceList] = useState(resumeInfo?.expirience || [])
  const params = useParams()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (resumeInfo.expirience) {
      setExpirienceList(resumeInfo.expirience)
    }
  }, [resumeInfo])

  const handleChange = (index, event) => {
    const newEntries = [...expirienceList]
    const { name, value } = event.target
    newEntries[index][name] = value
    setExpirienceList(newEntries)
  }

    useEffect(() => {
        setResumeInfo(prev => ({
        ...prev,
        expirience: expirienceList
    }))
    }, [expirienceList])


  const handleRichTextEditor = (val, name, index) => {
    setExpirienceList(prev =>
      prev.map((item, i) => (i === index ? { ...item, [name]: val } : item))
    )
  }

  const AddNewExpirience = () => {
    setExpirienceList([...expirienceList, { ...formField }])
  }

  const removeExpirience = () => {
    setExpirienceList(list => (list.length > 1 ? list.slice(0, -1) : list))
  }

  const onSave = async () => {
    setLoading(true)
    const resumeId = params?.resumeId

    try {
      const data = {
        expirience: expirienceList.map(({ id, ...rest }) => rest),
      }

      const res = await fetch(`/resumes/${resumeId}`, {
        method: 'POST', // Or PUT/PATCH if your API expects that for updates
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        console.error('Failed to save experience')
        // Optionally show user notification on failure
      } else {
        // Update context only on successful save
        setResumeInfo(prev => ({
          ...prev,
          expirience: expirienceList,
        }))
      }
    } catch (error) {
      console.error('Error saving experience:', error)
      // Optionally show user notification on error
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4">
        <h2 className="font-bold text-lg">Professional Expirience</h2>
        <p>Add your previous job expirience</p>

        <div>
          {expirienceList?.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg"
            >
              <div>
                <label className="text-xs">Position Title</label>
                <Input
                  name="title"
                  value={item.title}
                  onChange={event => handleChange(index, event)}
                />
              </div>
              <div>
                <label className="text-xs">Company Name</label>
                <Input
                  name="companyName"
                  value={item.companyName}
                  onChange={event => handleChange(index, event)}
                />
              </div>
              <div>
                <label className="text-xs">City</label>
                <Input
                  name="city"
                  value={item.city}
                  onChange={event => handleChange(index, event)}
                />
              </div>
              <div>
                <label className="text-xs">State</label>
                <Input
                  name="state"
                  value={item.state}
                  onChange={event => handleChange(index, event)}
                />
              </div>
              <div>
                <label className="text-xs">Start Date</label>
                <Input
                  type="date"
                  name="startDate"
                  value={item.startDate}
                  onChange={event => handleChange(index, event)}
                />
              </div>
              <div>
                <label className="text-xs">End Date</label>
                <Input
                  type="date"
                  name="endDate"
                  value={item.endDate}
                  onChange={event => handleChange(index, event)}
                />
              </div>
              <div className="col-span-2">
                <RichTextEditor
                  index={index}
                  value={item.workSummary}
                  onRichTextEditorChange={val =>
                    handleRichTextEditor(val, 'workSummary', index)
                  }
                />
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          <div>
            <Button onClick={AddNewExpirience} className="text-primary">
              + Add More Expirience
            </Button>
            <Button onClick={removeExpirience} className="text-primary">
              - Remove
            </Button>
          </div>
          <Button disabled={loading} onClick={onSave}>
            {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Expirience
