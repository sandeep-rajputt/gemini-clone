import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import runChat from "../../config/gemini";
import reactUniqueIds from "react-unique-ids";
import geminiResponseHandler from "../../config/gemainiResponseHandler";

export const getGeminiData = createAsyncThunk(
  "main/getGeminiData",
  async ({ prompt, orignalChat }) => {
    const data = await runChat(prompt, orignalChat);
    return geminiResponseHandler(data, prompt);
  }
);

const slice = createSlice({
  name: "main",
  initialState: {
    isNav: false,
    chat: [],
    orignalChat: [],
    isChat: false,
    scroll: "",
    question: "",
    isHowWork: false,
  },
  reducers: {
    openCloseNav(state) {
      state.isNav = !state.isNav;
    },
    handleChat(state, action) {
      const newChat = [
        ...state.chat,
        { ques: action.payload, content: "pending" },
      ];
      state.question = action.payload;
      state.chat = newChat;
    },
    emptyChat(state) {
      state.chat = [];
    },
    setHowWork(state, action) {
      state.isHowWork = action.payload;
    },
    handleIsChat(state, action) {
      state.isChat = action.payload;
    },
    handleScroll(state) {
      state.scroll = reactUniqueIds();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getGeminiData.fulfilled, (state, action) => {
      state.chat[state.chat.length - 1].content = action.payload.customResponse;
      const newPrompt = {
        role: "user",
        parts: [{ text: action.payload.prompt }],
      };
      const newResponse = {
        role: "model",
        parts: [{ text: action.payload.customResponse }],
      };
      state.orignalChat = [...state.orignalChat, newPrompt, newResponse];
    });
    // handle if error
    builder.addCase(getGeminiData.rejected, (state, action) => {
      state.chat[state.chat.length - 1].content =
        "Error: " + action.error.message;
    });
  },
});

export const {
  openCloseNav,
  handleChat,
  handleScroll,
  handleIsChat,
  emptyChat,
  updateChat,
  setHowWork,
} = slice.actions;

export default slice.reducer;
