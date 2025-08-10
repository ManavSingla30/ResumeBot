import { userResume } from "../models/userResume.js";

async function handleuserResumeinfo(req, res) {
  try {
    const { title, resumeId, userEmail, username } = req.body;

    if (!title || !resumeId || !userEmail || !username) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newResumeinfo = await userResume.create({
      title,
      resumeId,
      userEmail,
      username,
    });

    return res.status(201).json(newResumeinfo);
  } catch (error) {
    console.error("Error Creating resume: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}


async function getuserResumeInfo(req, res) {
    try {
      const {userEmail} = req.query
      if(!userEmail){
        return res.status(400).json({message: "userEmail is required"})
      }
  
      const getResume = await userResume.find({userEmail});
  
      return res.status(200).json({
        message: "All Resumes fetched successfully",
        data: getResume
      })
    } catch (error) {
      res.status(500).json({message: "Internal Server Error"})
    }
}

async function updateResumeDetail(req, res){
  try{
    const resumeId = req.params
    const updates = req.body
    const updatedResume = await userResume.findOneAndUpdate(
      {resumeId},
      updates,
      {new: true}
    )

    if(!updatedResume){
      return res.status(404).json({message: "Resume not found"})
    }

    return res.status(201).json({
      message: "Resume Created",
      data: updatedResume
    })
  }
  catch(err){
    res.status(500).json({message: "Internal Server Error"})
  }
}

export { handleuserResumeinfo, getuserResumeInfo, updateResumeDetail };
