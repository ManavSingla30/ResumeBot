
import dotenv from 'dotenv'
dotenv.config()


import { GoogleGenerativeAI } from "@google/generative-ai";
import { Router } from "express";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("Missing Gemini API key in GEMINI_API_KEY env variable");
}

const ai = new GoogleGenerativeAI(apiKey);
const router = Router();

router.post("/generate", async (req, res) => {
  try {
    const { prompt } = req.body; // ✅ Get prompt from request body
    if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
      return res.status(400).json({ message: "Prompt must be a non-empty string." });
    }

    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);

    const text = result?.response?.text();
    if (!text) {
      return res.status(500).json({ message: "Empty response from Gemini" });
    }

    res.json({ result: text });
  } catch (err) {
    console.error("Error in Gemini chat:", err);
    res.status(500).json({ message: err.message || "Failed to generate content" });
  }
});

export default router;
