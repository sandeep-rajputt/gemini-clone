import ChatContent from "./ChatContent";
import Content from "./Content";
import Footer from "./Footer";
import Header from "./Header";
import { useSelector } from "react-redux";

const MainPage = () => {
  const { isChat } = useSelector((state) => state.main);

  return (
    <div className=" max-h-screen  pt-4 pb-3 grid grid-rows-[auto_1fr] h-full ">
      <Header />
      {isChat == [] ? <Content /> : <ChatContent />}
      <div className=" w-full relative  justify-self-center">
        <div className="mt-[1px] absolute left-1/2 -translate-x-2/4 w-[100%] h-[50%] m-auto -top-1/2 bg-gradient-to-t from-dark to-transparent"></div>
        <Footer />
      </div>
    </div>
  );
};

export default MainPage;
