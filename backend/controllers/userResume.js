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

export { handleuserResumeinfo };
