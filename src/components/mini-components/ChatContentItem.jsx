import Loader from "./Loader";
import MarkdownRenderer from "./MarkdownRenderer";

const ChatContentItem = ({ data }) => {
  return (
    <div className="my-5 pb-10 text-white border-b-2 border-light-dark-4">
      <div className="grid grid-cols-[auto_1fr]">
        <div className=" px-1">
          <img
            className="w-10 rounded-full md:w-8"
            src="/me.jpg"
            alt="Developer Sandeep"
          />
        </div>
        <div className="px-2">
          <p className="pt-2 text-base">{data.ques}</p>
        </div>
      </div>
      <div className="grid pt-3  mt-2 grid-cols-[auto_1fr]">
        <div className="px-2">
          <img
            className="w-7 rounded-full"
            src="/logo.svg"
            alt="Developer Sandeep"
          />
        </div>
        <div className="px-2 md:px-0 overflow-x-auto">
          {data.content === "pending" ? (
            <Loader />
          ) : data.content.startsWith("Error: ") ? (
            <div
              className="text-red-500"
              dangerouslySetInnerHTML={{ __html: data.content }}
            />
          ) : (
            <MarkdownRenderer content={data.content} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatContentItem;
