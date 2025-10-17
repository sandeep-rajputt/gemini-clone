import { useState, useEffect } from "react";
import HeaderLogo from "./mini-components/HeaderLogo";
import HeaderBtn from "./mini-components/HeaderBtn";
import { LuHistory } from "react-icons/lu";
import { IoMdAdd } from "react-icons/io";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { emptyChat, handleIsChat } from "../Store/Slices";

const Header = () => {
  // eslint-disable-next-line no-unused-vars
  const [isMobile, setIsMobile] = useState(false);
  const { isChat } = useSelector((state) => state.main);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 1000);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function handleNewChatBtn() {
    dispatch(emptyChat());
    dispatch(handleIsChat(false));
  }

  return (
    <div className="flex px-4 pr-5 pb-3 items-center justify-between">
      <HeaderLogo />
      <nav className="flex items-center gap-6">
        {isMobile ? (
          isChat ? (
            <>
              <HeaderBtn
                icon={<IoMdAdd size={"1.1em"} />}
                handleClick={handleNewChatBtn}
              />
              <HeaderBtn icon={<HiOutlineDotsVertical size={"1.1em"} />} />
            </>
          ) : (
            <HeaderBtn icon={<LuHistory size={"1.1em"} />} />
          )
        ) : (
          <button className="flex items-center justify-center px-4 py-2 bg-light-dark-4 tracking-wide text-white gap-3 text-xs rounded-md font-medium">
            <img src="/pro-logo.svg" alt="Gemini Advance" className="h-[70%]" />
            <span>Try Gemini Advance</span>
          </button>
        )}
        <img
          src="/me.jpg"
          alt="Sandeep Rajput"
          className="h-[35px] rounded-full"
        />
      </nav>
    </div>
  );
};

export default Header;
