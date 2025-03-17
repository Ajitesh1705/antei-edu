import express from "express";
import axios from "axios";
import { verifyToken } from "../middleware/authMiddleware.js";
import systemPrompts from "../config/systemPrompts.js";

const router = express.Router();

router.post("/gemini", verifyToken, async (req, res) => {
    try {
        const { prompt, agentType } = req.body;
        const systemPrompt = systemPrompts[agentType] || systemPrompts.default;
        const messages = [systemPrompt, { role: "user", content: prompt }];

        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions", 
            {
                model: "google/gemini-2.0-flash-exp:free",
                messages: messages
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.VITE_OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        console.log("AI API Response from OpenRouter:", response.data);

        if (!response.data || !response.data.choices) {
            return res.status(500).json({ error: "Invalid API response structure" });
        }

        res.json(response.data);
    } catch (error) {
        console.error("AI API Request Failed:", error?.response?.data || error.message);
        res.status(500).json({ error: "AI API Request Failed" });
    }
});

export default router;

