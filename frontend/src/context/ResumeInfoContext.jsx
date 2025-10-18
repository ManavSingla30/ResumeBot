import { createContext, useState } from "react";
import resumeData from "./../dummy/dummy.jsx"

export const ResumeInfoContext = createContext()

function ResumeInfoProvider({ children }){
  const [resumeInfo, setResumeInfo] = useState(resumeData); 

  return (
    <ResumeInfoContext.Provider value={[resumeInfo, setResumeInfo]}>
      {children}
    </ResumeInfoContext.Provider>
  );
}

export { ResumeInfoProvider }
