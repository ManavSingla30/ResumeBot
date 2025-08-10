import { Router } from "express";
import { requireAuth } from "@clerk/clerk-sdk-node";
import { getuserResumeInfo, handleuserResumeinfo, updateResumeDetail } from "../controllers/userResume.js";
const router = Router()

router.post("/", handleuserResumeinfo)
router.get("/", getuserResumeInfo)
router.post("/:resumeId", updateResumeDetail)

export default router