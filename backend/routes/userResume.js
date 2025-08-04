import { Router } from "express";
import { requireAuth } from "@clerk/clerk-sdk-node";
import { handleuserResumeinfo } from "../controllers/userResume.js";
const router = Router()

router.post("/", handleuserResumeinfo)

export default router