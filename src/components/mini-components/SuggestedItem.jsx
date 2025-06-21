import { useDispatch } from "react-redux";
import { getGeminiData } from "../../Strore/Slices";
import { VscLightbulbSparkle } from "react-icons/vsc";
import { FaCode } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { MdOutlineSportsBasketball } from "react-icons/md";
import { handleChat } from "../../Strore/Slices";
import { handleScroll } from "../../Strore/Slices";
import { handleIsChat } from "../../Strore/Slices";

const SuggestedItem = ({ prompt, title }) => {
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => {
        dispatch(getGeminiData({ prompt: prompt }));
        dispatch(handleChat(prompt));
        dispatch(handleScroll());
        dispatch(handleIsChat(true));
      }}
      className="w-[24%] min-w-48 2xl:min-w-52 2xl  rounded-xl text-white flex relative text-left h-52 bg-light-dark-2 px-4 py-3 items-start"
    >
      {prompt}
      <div className="absolute bottom-3 right-3 bg-dark p-3 rounded-full">
        {title === "Youtube" && <FaYoutube size={"1.4em"} />}
        {title === "Sports" && <MdOutlineSportsBasketball size={"1.4em"} />}
        {title === "Idea" && <VscLightbulbSparkle size={"1.4em"} />}
        {title === "Coding" && <FaCode size={"1.4em"} />}
      </div>
    </button>
  );
};

export default SuggestedItem;
