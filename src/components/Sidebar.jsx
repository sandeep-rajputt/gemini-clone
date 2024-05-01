import { MdMenu } from "react-icons/md";
import Button from "./mini-components/Button";
import { useSelector } from "react-redux";
import NewChatBtn from "./mini-components/NewChatBtn";
import Recent from "./mini-components/Recent";
import { useDispatch } from "react-redux";
import { openCloseNav } from "../Strore/Slices";
import Controls from "./mini-components/Controls";
import { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
const Sidebar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { isNav } = useSelector((state) => state.main);
  const dispatch = useDispatch();

  function handleMenu() {
    dispatch(openCloseNav());
  }

  // set isMobile according to width of the window
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

  return (
    <div
      id="sidebar"
      className={`min-h-screen max-h-screen  bg-light-dark-2 2xl:absolute 2xl:z-50 2xl:w-80 2xl:max-w-full ${
        isNav ? "w-72 2xl:translate-x-[0%]" : "w-[68px] 2xl:translate-x-[-100%]"
      } transition-[width, translate] duration-500 ease-in-out p-4 overflow-hidden grid grid-rows-[auto_auto_1fr_auto] gap-5 `}
    >
      <div>
        {isMobile ? (
          <div className="flex">
            <Button
              title={"Collapse menu"}
              cls={"ml-auto"}
              clickHandler={handleMenu}
            >
              <AiOutlineClose />
            </Button>
          </div>
        ) : isNav ? (
          <Button title={"Collapse menu"} clickHandler={handleMenu}>
            <MdMenu />
          </Button>
        ) : (
          <Button title={"Expand menu"} clickHandler={handleMenu}>
            <MdMenu />
          </Button>
        )}
      </div>
      <div>
        <NewChatBtn />
      </div>
      <div className="overflow-y-auto">
        <Recent />
      </div>
      <div>
        <Controls />
      </div>
      {isMobile && (
        <div className="flex justify-center">
          <button className="flex items-center w-full justify-center px-4 py-2 bg-light-dark-4 tracking-wide text-white gap-3 text-xs rounded-md font-medium">
            <img src="/pro-logo.svg" alt="Gemini Advance" className="h-[70%]" />
            <span>Try Gemini Advance</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
