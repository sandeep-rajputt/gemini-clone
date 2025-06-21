import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-lite",
  generationConfig: {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
  },
});

const runChat = async (prompt, history = []) => {
  try {
    const chat = model.startChat({
      history: history.map((msg) => ({
        role: msg.role,
        parts: msg.parts,
      })),
    });

    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    throw new Error("Failed to get response from Server");
  }
};

export default runChat;
