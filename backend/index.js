import express from "express"
import mongoose from "mongoose"
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import cors from "cors"
import { connectionDB } from "./connection.js";
import geminiRouter from "./gemini.js"
import dotenv from 'dotenv'
dotenv.config()
const app = express();
const PORT = 8000
app.use(cors())



app.use(express.json())
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
await connectionDB();

import userResumeRoutes from "./routes/userResume.js";
app.use("/resumes", userResumeRoutes)
app.use("/api/gemini", geminiRouter);


app.listen(PORT, () => console.log(`SERVER STARTED AT ${PORT}`))




