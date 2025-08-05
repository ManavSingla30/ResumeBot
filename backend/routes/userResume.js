import { Router } from "express";
import { requireAuth } from "@clerk/clerk-sdk-node";
import { getuserResumeInfo, handleuserResumeinfo } from "../controllers/userResume.js";
const router = Router()

router.post("/", handleuserResumeinfo)
router.get("/", getuserResumeInfo)

export default router