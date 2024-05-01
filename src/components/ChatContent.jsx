import ChatContentItem from "./mini-components/ChatContentItem";
import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";

const ChatContent = () => {
  const { chat, scroll } = useSelector((state) => state.main);

  const divRef = useRef(null);

  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollTop = divRef.current.scrollHeight;
    }
  }, [scroll, chat]);

  return (
    <div
      ref={divRef}
      className=" scroll-smooth px-2 overflow-y-auto relative custom-vertical-scrollbar"
    >
      <div className="max-w-[830px]  mx-auto w-full">
        {chat.map((item, index) => (
          <ChatContentItem key={index} data={item} />
        ))}
      </div>
    </div>
  );
};

export default ChatContent;
