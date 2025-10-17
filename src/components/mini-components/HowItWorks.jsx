import { useDispatch } from "react-redux";
import { setHowWork } from "../../Store/Slices";

export const HowItWorks = () => {
  const dispatch = useDispatch();

  return (
    <div className="absolute w-full h-full z-50  bg-[#1e1f207d]">
      <div className="absolute  left-2/4 top-2/4 px-5 -translate-y-2/4 -translate-x-2/4    max-w-[600px] w-full">
        <div className="relative  w-full h-full bg-light-dark-2 p-5 rounded-2xl shadow-xl">
          <h5 className="text-2xl md:text-xl text-white font-semibold">
            How conversations improve Gemini
          </h5>
          <div className="text-primary md:text-sm my-3 flex flex-col gap-5 md:gap-4">
            <p>
              Just by having a conversation with Gemini, you’re making Google
              services better, including the machine-learning models that power
              Gemini.
            </p>
            <p>
              As part of that improvement, trained reviewers need to process
              your conversations.
            </p>
            <p>
              So when using Gemini, don’t enter anything you wouldn’t want a
              reviewer to see or Google to use.
            </p>
            <p>
              Your Google Workspace content, like from Gmail or Drive, is not
              reviewed or used to improve Gemini.
            </p>
            <p>
              You can turn Gemini Apps Activity off If you don’t want future
              conversations reviewed or used to improve machine-learning models,
              turn off Gemini Apps Activity
            </p>
          </div>
          <div className="flex">
            <button
              onClick={() => {
                dispatch(setHowWork(false));
              }}
              className="rounded-full px-3 py-2 text-blue-300 font-semibold ml-auto hover:bg-light-dark-4"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
