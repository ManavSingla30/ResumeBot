import mongoose from "mongoose";

const ExperienceSchema = new mongoose.Schema({
    id: Number,
    title: String,
    companyName: String,
    state: String,
    startDate: String,
    endDate: String,
    currentlyWorking: Boolean,
    workSummary: String,
}, { _id: false });

const EducationSchema = new mongoose.Schema({
    id: Number,
    universityName: String,
    startDate: String,
    endDate: String,
    currentlyWorking: Boolean,
    degree: String,
    major: String,
    description: String,
}, { _id: false });

const SkillSchema = new mongoose.Schema({
    name: String,
    rating: Number,
}, { _id: false });

const userResumeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    resumeId: { type: String, required: true },
    userEmail: { type: String, required: true },
    username: { type: String, required: true },

    firstname: { type: String },      // <-- optional now
    lastname: { type: String },
    jobtitle: { type: String },
    address: { type: String },
    phone: { type: String },
    email: { type: String },
    themeColor: { type: String },
    summary: { type: String },
    expirience: [ExperienceSchema],
    education: [EducationSchema],
    skills: [SkillSchema],
});


export const userResume = mongoose.model("userResume", userResumeSchema);
