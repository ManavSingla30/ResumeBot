import { Router } from "express";
// import { requireAuth } from "@clerk/clerk-sdk-node";
import { getuserResumeInfo, handleuserResumeinfo, updateResumeDetail, deleteResume } from "../controllers/userResume.js";
const router = Router()

router.post("/", handleuserResumeinfo)
router.get("/", getuserResumeInfo)
router.post("/:resumeId", updateResumeDetail)
router.delete("/:resumeId", deleteResume)

export default router