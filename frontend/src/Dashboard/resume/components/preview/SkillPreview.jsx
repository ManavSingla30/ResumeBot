import React from 'react'

function SkillPreview({ resumeInfo }) {
  console.log('SkillPreview received resumeInfo: ', resumeInfo)
  return (
    <div className='my-6'>
      <h2
        className='text-center font-bold text-sm mb-2'
        style={{ color: resumeInfo?.themeColor }}
      >
        Skills
      </h2>
      <hr style={{ borderColor: resumeInfo?.themeColor }} />

      <div className='grid grid-cols-2 gap-6 my-4'>
        {resumeInfo?.skills?.map((skill, index) => {
          // Fix rating scale - if rating is 0-100, use as is:
          // If rating is 0-5, multiply by 20.
          const ratingPercent =
            skill.rating > 10 ? skill.rating : skill.rating * 20

          return (
            <div
              key={index}
              className='flex items-center space-x-3' // add consistent spacing
            >
              <h2 className='text-xs w-20'>{skill.name}</h2>
              <div className='relative flex-1 h-2 bg-gray-200 rounded'>
                <div
                  className='h-2 rounded'
                  style={{
                    backgroundColor: resumeInfo?.themeColor,
                    width: `${ratingPercent}%`,
                    transition: 'width 0.3s ease',
                  }}
                ></div>
              </div>
              <span className='w-8 text-xs text-right font-semibold'>
                {Math.round(ratingPercent)}%
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SkillPreview
