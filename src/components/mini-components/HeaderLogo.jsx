import { FaCaretDown } from "react-icons/fa";
import HeaderBtn from "./HeaderBtn";
import { MdMenu } from "react-icons/md";
import { useDispatch } from "react-redux";
import { openCloseNav } from "../../Store/Slices";

const HeaderLogo = () => {
  const dispatch = useDispatch();
  function handleMenuBtn() {
    dispatch(openCloseNav());
  }
  return (
    <>
      <div className="flex gap-2 items-center">
        <div id="header-logo-btn">
          <HeaderBtn
            icon={<MdMenu />}
            handleClick={handleMenuBtn}
            zIndex={"z-50"}
          />
        </div>
        <button className="rounded flex gap-2 items-center text-xl text-primary hover:bg-light-dark-2 px-2 py-1">
          Gemini <FaCaretDown size={"0.8em"} />
        </button>
      </div>
    </>
  );
};

export default HeaderLogo;
