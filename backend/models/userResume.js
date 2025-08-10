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
    },
    firstname: {
        required: true,
        type: String
    },
    lastname: {
        required: true,
        type: String
    },
    address: {
        required: true,
        type: String
    },
    jobtitle: {
        required: true,
        type: String
    },
    phone: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    summary: {
        type: String,
        required: true
    }
})

export const userResume = mongoose.model("userResume", userResumeSchema)