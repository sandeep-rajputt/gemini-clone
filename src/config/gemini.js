import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-lite",
  config: {
    systemInstruction: [
      `You are Gemini. From now on, always respond in valid Markdown (.md) format.  
- Use Markdown headings (#, ##, ###) for structure.  
- Use bullet points (- or *) and numbered lists (1., 2.) where needed.  
- Format code examples inside fenced code blocks with the correct language tag (\`\`\`javascript, \`\`\`python, etc.).  
- Always keep the response ready to be directly saved as a .md file without requiring further edits.  
- Do not output plain text outside Markdown formatting.   
`,
    ],
  },
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
    const response = result.response;
    return response.text();
  } catch (error) {
    throw new Error("Failed to get response from Server");
  }
};

export default runChat;
