import Tooltip from "@mui/material/Tooltip";
import { MdOutlineAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { handleIsChat, emptyChat } from "../../Store/Slices";

const NewChatBtn = () => {
  const { isNav, isChat } = useSelector((state) => state.main);
  const dispatch = useDispatch();

  return (
    <Tooltip title={"New chat"}>
      <button
        disabled={!isChat}
        onClick={() => {
          dispatch(emptyChat());
          dispatch(handleIsChat(false));
        }}
        className={`flex ${
          isChat
            ? "cursor-pointer bg-light-dark-3 hover:bg-light-dark-4 text-white"
            : "cursor-default bg-light-dark text-third"
        } items-center justify-center gap-2 text-sm font-normal mt-8 2xl:mt-0  p-2 rounded-full whitespace-nowrap transition-all duration-500 
        `}
      >
        <MdOutlineAdd size={"1.4rem"} />
        <span
          className={` ${
            isNav
              ? " w-fit opacity-100 block pr-1"
              : " w-0 opacity-0 hidden pr-0 2xl:w-fit 2xl:opacity-100 2xl:block 2xl:pr-1"
          }`}
        >
          New Chat
        </span>
      </button>
    </Tooltip>
  );
};

export default NewChatBtn;
