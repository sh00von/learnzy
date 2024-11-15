// pages/api/generate-quiz.js

import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY; // Your API key
const genAI = new GoogleGenerativeAI(apiKey); // Initialize the Generative AI client

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { category, difficulty, topic } = req.body; // Extract parameters from the request body

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const generationConfig = {
      temperature: 1.2, // Adjusted for more focused responses
      topP: 0.9,
      topK: 50, // Reduced for more manageable output
      maxOutputTokens: 1500, // Limited to fit smaller questions
      responseMimeType: "application/json",
    };

    // Generate a prompt based on user inputs for STEM questions
    const userPrompt = `Generate 5 fun and educational STEM questions for children on the topic of ${topic} with a difficulty level of ${difficulty}. 
The questions should be engaging, promote critical thinking, and include concepts from science, technology, engineering, or mathematics. 
Format the questions as follows:
[
  {
    "question": "<question_text>",
    "answer": "<correct_answer>",
    "options": ["<option1>", "<option2>", "<option3>", "<option4>"],
    "tag": "<tag>"
  },
  ...
]`;

    try {
      const chatSession = model.startChat({
        generationConfig,
        history: [
          {
            role: "user",
            parts: [
              {
                text: userPrompt, // Use the dynamic prompt
              },
            ],
          },
        ],
      });

      const result = await chatSession.sendMessage("Generate Questions");
      const responseText = result.response.text();
      
      // Debugging: Log the raw response to console
      console.log("Raw Response:", responseText);

      // Parse the JSON response
      const questions = JSON.parse(responseText);
      
      // Debugging: Log the parsed questions
      console.log("Parsed Questions:", questions);

      // Respond with the generated questions
      res.status(200).json(questions);
    } catch (error) {
      console.error("Error generating quiz:", error);
      res.status(500).json({ error: "Failed to generate quiz questions." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
