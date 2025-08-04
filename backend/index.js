import express from "express"
import mongoose from "mongoose"
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import cors from "cors"
import { connectionDB } from "./connection.js";
const app = express();
const PORT = 8000
app.use(cors())


app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
await connectionDB();

import userResumeRoutes from "./routes/userResume.js";
app.use("/resumes", userResumeRoutes)


app.listen(PORT, () => console.log(`SERVER STARTED AT ${PORT}`))




