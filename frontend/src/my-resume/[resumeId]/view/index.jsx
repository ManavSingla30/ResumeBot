import React, { useContext, useEffect } from 'react'
import Header from '@/components/custom/Header'
import { Button } from '@/components/ui/button'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import ResumePreview from '@/Dashboard/resume/components/ResumePreview'
import { useParams } from 'react-router-dom'

function ViewResume() {
  const [resumeInfo, setResumeInfo] = useContext(ResumeInfoContext)
  const { resumeId } = useParams()

  const getResumeInfo = async () => {
    try {
      const response = await fetch(`/resumes/${resumeId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch resume info');
      }
      const responseData = await response.json();
      // If API returns an array, use [0]
      const resume = Array.isArray(responseData.data) ? responseData.data : responseData.data;
      setResumeInfo(resume);
    } catch (error) {
      console.error('Error fetching resume info:', error);
    }
  };

  useEffect(() => {
    getResumeInfo()
  }, [])

  const handleDownload = () => {
    window.print()
  }

  return (
    <>
      <div id='no-print'>
        <Header />
        <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
          <h2 className='text-center text-2xl font-medium'>
            Congrats! Your Ultimate AI generated Resume is ready!
          </h2>
          <p className='text-center text-gray-400'>
            Now you are ready to download your resume and can share a unique URL with your friends and family
          </p>
          <div className='flex justify-between px-44 my-10'>
            <Button onClick={handleDownload}>Download</Button>
            <Button>Share</Button>
          </div>
        </div>
      </div>
      <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
        <div id='print-area'>
          <ResumePreview />
        </div>
      </div>
    </>
  )
}

export default ViewResume
