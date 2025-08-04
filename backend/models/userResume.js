import mongoose from "mongoose";

const userResumeSchema = new mongoose.Schema({
    title:{
        required: true,
        type: String
    },
    resumeId: {
        required: true,
        type: String
    },
    userEmail: {
        required: true,
        type: String
    },
    username: {
        required: true,
        type: String
    }
})

export const userResume = mongoose.model("userResume", userResumeSchema)