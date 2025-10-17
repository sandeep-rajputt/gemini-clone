import { BiImageAdd } from "react-icons/bi";
import { HiMicrophone } from "react-icons/hi2";
import { IoSend } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getGeminiData } from "../Store/Slices";
import { handleChat } from "../Store/Slices";
import { handleScroll } from "../Store/Slices";
import { handleIsChat } from "../Store/Slices";
import FooterBtn from "./mini-components/FooterBtn";
import { useSelector } from "react-redux";

const Footer = () => {
  const [inputData, setInputData] = useState("");
  const dispatch = useDispatch();
  const { chat, orignalChat } = useSelector((state) => state.main);
  const [showSubmitButton, setShowInputButton] = useState(chat.length > 0);

  function handleSubmit() {
    if (inputData) {
      dispatch(getGeminiData({ prompt: inputData, orignalChat }));
      dispatch(handleChat(inputData));
      dispatch(handleScroll());
      dispatch(handleIsChat(true));
      setInputData("");
    }
  }

  useEffect(() => {
    if (chat.length > 0 && chat[chat.length - 1].content === "pending") {
      setShowInputButton(false);
    } else if (inputData.trim().length > 0) {
      setShowInputButton(true);
    } else {
      setShowInputButton(false);
    }
  }, [chat, inputData]);

  return (
    <>
      <div className="flex px-3 flex-col gap-3  max-w-[830px] m-auto">
        <div
          className={`grid ${
            showSubmitButton
              ? "grid-cols-[1fr_auto_auto_auto]"
              : "grid-cols-[1fr_auto_auto]"
          } gap-2 w-full bg-light-dark-2 px-5 py-3 md:py-2 rounded-full md:px-3`}
        >
          <input
            type="text"
            value={inputData}
            onKeyUp={(e) => {
              if (inputData && e.key === "Enter") {
                if (chat.length > 0) {
                  if (chat[chat.length - 1].content !== "pending") {
                    handleSubmit();
                    setShowInputButton(false);
                  }
                } else {
                  handleSubmit();
                  setShowInputButton(false);
                }
              }
            }}
            onChange={(e) => {
              setInputData(e.target.value);
              setShowInputButton(
                e.target.value.trim().length > 0 &&
                  chat[chat.length - 1].content !== "pending"
              );
            }}
            className="w-full bg-transparent focus:outline-none text-primary"
          />
          <div className="flex items-center">
            <FooterBtn title={"Upload image"}>
              <BiImageAdd size={"1.4em"} />
            </FooterBtn>
            <FooterBtn title={"Use Microphone"}>
              <HiMicrophone size={"1.4em"} />
            </FooterBtn>
            {showSubmitButton && (
              <FooterBtn title={"Submit"} clickHandler={handleSubmit}>
                <IoSend size={"1.4em"} />
              </FooterBtn>
            )}
          </div>
        </div>
        <div>
          <p className="text-xs text-center text-white">
            Gemini may display inaccurate info, including about people, so
            double-check its responses.
            <span className="underline">Your privacy and Gemini Apps</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
