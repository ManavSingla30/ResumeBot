
import dotenv from 'dotenv'
dotenv.config()


import { GoogleGenAI } from "@google/genai";
import { Router } from "express";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("Missing Gemini API key in GEMINI_API_KEY env variable");
}

const ai = new GoogleGenAI({ apiKey });
const router = Router();

router.post("/generate", async (req, res) => {
  try {
    const { prompt } = req.body; // ✅ Get prompt from request body
    if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
      return res.status(400).json({ message: "Prompt must be a non-empty string." });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    const text = response?.text;
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
