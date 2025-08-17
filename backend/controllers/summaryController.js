import dotenv from "dotenv";
dotenv.config();
import Groq from "groq-sdk";
import Summary from "../models/Summary.js";

// Initialize Groq client
const groq = new Groq({ apiKey:process.env.GROQ_API_KEY});


export const generateSummary = async (req, res) => {
  try {
    const { transcript, instruction } = req.body;

    if (!transcript) return res.status(400).json({ error: "Transcript is required" });

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `Summarize this transcript based on instruction: ${instruction || "Summarize normally"}\n\nTranscript:\n${transcript}`
        }
      ],
      model: "openai/gpt-oss-20b",
      temperature: 1,
      max_completion_tokens: 8192,
    });

    const summaryText = chatCompletion.choices[0]?.message?.content || "";

    const newSummary = await Summary.create({ transcript, instruction, summary: summaryText });

    res.status(200).json(newSummary);

  } catch (error) {
    console.error("Error generating summary:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to generate summary" });
  }
};
