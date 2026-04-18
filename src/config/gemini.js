import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEYS_STORAGE = import.meta.env.VITE_GEMINI_API_KEY;
if (!API_KEYS_STORAGE) {
  throw new Error("GEMINI_API_KEY is not defined");
}

const API_KEYS = API_KEYS_STORAGE.split(",");

const runChat = async (prompt, history = []) => {
  const GEMINI_API_KEY = API_KEYS[Math.floor(Math.random() * API_KEYS.length)];
  console.log(GEMINI_API_KEY);

  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

  const model = genAI.getGenerativeModel({
    model: "gemini-3-flash-preview",
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
  });

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
