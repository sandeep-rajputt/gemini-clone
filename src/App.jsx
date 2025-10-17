import { useDispatch, useSelector } from "react-redux";
import MainPage from "./components/MainPage";
import Sidebar from "./components/Sidebar";
import { useState, useEffect } from "react";
import { openCloseNav } from "./Store/Slices";
import { HowItWorks } from "./components/mini-components/HowItWorks";

function App() {
  const { isNav, isHowWork } = useSelector((state) => state.main);
  const [isMobile, setIsMobile] = useState(false);
  const dispatch = useDispatch();

  function handleClick(e) {
    if (
      e.target.closest("div[id='sidebar']") === null &&
      e.target.closest("div[id='header-logo-btn']") === null &&
      isNav &&
      isMobile
    ) {
      dispatch(openCloseNav());
    }
  }

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
    <div className="relative">
      {isHowWork && <HowItWorks />}
      <div
        onClick={(e) => handleClick(e)}
        className="min-h-screen max-h-screen 2xl:relative grid grid-cols-[auto_1fr] 2xl:grid-cols-[1fr] bg-dark"
      >
        <Sidebar />
        <MainPage />
      </div>
    </div>
  );
}

export default App;
