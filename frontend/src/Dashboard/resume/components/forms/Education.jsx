import React, { useContext, useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { LoaderCircle } from 'lucide-react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { useParams } from 'react-router-dom'
import { useRef } from 'react'

function Education() {
  const [educationalList, setEducationalList] = useState([{
    universityName: '',
    degree: '',
    major: '',
    startDate: '',
    endDate: '',
    description: ''
  }]);

  const [loading, setLoading] = useState(false);
  const [resumeInfo, setResumeInfo] = useContext(ResumeInfoContext);
  const params = useParams();
  const prevEducationalList = useRef()
  useEffect(() => {
    if (resumeInfo?.education) {
      setEducationalList(resumeInfo.education);
    }
  }, [resumeInfo]);


  const handleChange = (event, index) => {
    const { name, value } = event.target;
    const list = [...educationalList];
    list[index][name] = value;
    setEducationalList(list);

    // Update context with the new list immediately
    setResumeInfo(prev => ({
      ...prev,
      education: list,
    }));
  };



  const AddNewEducation = () => {
    setEducationalList(prev => [
      ...prev,
      {
        universityName: '',
        degree: '',
        major: '',
        startDate: '',
        endDate: '',
        description: ''
      }
    ]);
  };

  const removeEducation = () => {
    setEducationalList(list =>
      list.length > 1 ? list.slice(0, -1) : list
    );
  };

const onSave = async () => {
  setLoading(true);
  try {
    const payload = { education: educationalList.map(({ id, ...rest }) => rest) };
    const resumeId = params?.resumeId;

    console.log("Saving to backend:", payload, "ResumeId:", resumeId);

    const res = await fetch(`/resumes/${resumeId}`, {
      method: 'POST', // or PATCH if backend expects partial updates
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      console.error("Failed to save education:", err);
    } else {
      setResumeInfo(prev => ({ ...prev, education: educationalList }));
    }
  } catch (error) {
    console.error("Error saving education:", error);
  } finally {
    setLoading(false);
  }
};



  return (
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4'>
      <h2 className='font-bold text-lg'>Education</h2>
      <p>Add your educational details</p>
      <div>
        {educationalList.map((item, index) => (
          <div key={index}>
            <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
              <div className='col-span-2'>
                <label>University Name</label>
                <Input
                  name='universityName'
                  onChange={(e) => handleChange(e, index)}
                  value={item.universityName}
                />
              </div>
              <div>
                <label>Degree</label>
                <Input
                  name='degree'
                  onChange={(e) => handleChange(e, index)}
                  value={item.degree}
                />
              </div>
              <div>
                <label>Major</label>
                <Input
                  name='major'
                  onChange={(e) => handleChange(e, index)}
                  value={item.major}
                />
              </div>
              <div>
                <label>Start Date</label>
                <Input
                  type='date'
                  name='startDate'
                  onChange={(e) => handleChange(e, index)}
                  value={item.startDate}
                />
              </div>
              <div>
                <label>End Date</label>
                <Input
                  type='date'
                  name='endDate'
                  onChange={(e) => handleChange(e, index)}
                  value={item.endDate}
                />
              </div>
              <div className='col-span-2'>
                <label>Description</label>
                <Input
                  name='description'
                  onChange={(e) => handleChange(e, index)}
                  value={item.description}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='flex justify-between'>
        <div className='flex gap-2'>
          <Button onClick={AddNewEducation} className='text-primary'>
            + Add More Education
          </Button>
          <Button onClick={removeEducation} className='text-primary'>
            + Remove
          </Button>
        </div>
        <Button disabled={loading} onClick={onSave}>
          {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
        </Button>
      </div>
    </div>
  );
}

export default Education;
