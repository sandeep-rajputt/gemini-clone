import { BiImageAdd } from "react-icons/bi";
import { HiMicrophone } from "react-icons/hi2";
import { IoSend } from "react-icons/io5";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getGeminiData } from "../Strore/Slices";
import { handleChat } from "../Strore/Slices";
import { handleScroll } from "../Strore/Slices";
import { handleIsChat } from "../Strore/Slices";
import FooterBtn from "./mini-components/FooterBtn";
import { useSelector } from "react-redux";




const Footer = () => {
  const [inputData, setInputData] = useState("");
  const [isInput, setIsInput] = useState(false);
  const dispatch = useDispatch();
  const { orignalChat } = useSelector((state) => state.main);
  

  function handleSubmit() {
    if (inputData) {
      dispatch(getGeminiData({ prompt: inputData, orignalChat }));
      dispatch(handleChat(inputData));
      dispatch(handleScroll());
      dispatch(handleIsChat(true));
      setInputData("");
      setIsInput(false);
    }
  }

  return (
    <>
      <div className="flex px-3 flex-col gap-3  max-w-[830px] m-auto">
        <div
          className={`grid ${
            isInput
              ? "grid-cols-[1fr_auto_auto_auto]"
              : "grid-cols-[1fr_auto_auto]"
          } gap-2 w-full bg-light-dark-2 px-5 py-3 md:py-2 rounded-full md:px-3`}
        >
          <input
            type="text"
            value={inputData}
            onKeyUp={(e) => {
              if (inputData && e.key === "Enter") {
                handleSubmit();
                setIsInput(false);
              }
            }}
            onChange={(e) => {
              setInputData(e.target.value);
              setIsInput(e.target.value.trim().length > 0);
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
            {isInput && (
              <FooterBtn title={"Submit"} clickHandler={handleSubmit}>
                <IoSend size={"1.4em"} />
              </FooterBtn>
            )}
          </div>
        </div>
        <div>
          <p className="text-xs text-center text-white">
            Gemini may display inaccurate info, including about people, so
            double-check its responses.{" "}
            <span className="underline">Your privacy and Gemini Apps</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
