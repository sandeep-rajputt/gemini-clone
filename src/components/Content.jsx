/* eslint-disable react/no-unescaped-entities */
import { useDispatch } from "react-redux";
import SuggestedItem from "./mini-components/SuggestedItem";

import { TiWarning } from "react-icons/ti";
import { setHowWork } from "../Store/Slices";
import { useState } from "react";

const Content = () => {
  const dispatch = useDispatch();
  const [isHowItWorks, setIsHowWork] = useState(true);
  let suggestedData = [];

  (function shuffleArray() {
    const randomSuggestedData = [
      {
        title: "Youtube",
        content:
          "What are the best AI-powered video editing tools for Youtubers?",
      },
      {
        title: "Youtube",
        content:
          "How can AI help creators optimize their YouTube content for better engagement?",
      },
      {
        title: "Youtube",
        content:
          "What are some innovative ways AI is being used to enhance the YouTube user experience?",
      },
      {
        title: "Coding",
        content:
          "How can AI assist software developers in writing more efficient and bug-free code?",
      },
      {
        title: "Coding",
        content:
          "What are the latest AI tools and techniques that can help coders improve their productivity?",
      },
      {
        title: "Coding",
        content:
          "How is AI impacting the future of software development and what new possibilities does it present?",
      },
      {
        title: "Idea",
        content:
          "How can AI help entrepreneurs generate innovative business ideas and identify new market opportunities?",
      },
      {
        title: "Idea",
        content:
          "What AI tools can assist creatives in brainstorming and developing original ideas?",
      },
      {
        title: "Idea",
        content:
          "How is AI being used to predict consumer trends and identify emerging industry needs?",
      },
      {
        title: "Sports",
        content:
          "How is AI transforming the way we analyze and predict sports performance?",
      },
      {
        title: "Sports",
        content:
          "What AI-powered tools are available to help athletes improve their training and recovery?",
      },
      {
        title: "Sports",
        content:
          "How can AI assist sports organizations in enhancing fan engagement and creating personalized experiences?",
      },
      {
        title: "Youtube",
        content:
          "What AI algorithms are used to recommend personalized content on YouTube?",
      },
      {
        title: "Youtube",
        content:
          "How is AI being used to detect and remove harmful content from YouTube?",
      },
      {
        title: "Coding",
        content:
          "What AI technologies can assist developers in identifying and resolving security vulnerabilities in code?",
      },
      {
        title: "Coding",
        content:
          "How can AI tools improve the quality and maintainability of software code?",
      },
      {
        title: "Idea",
        content:
          "What AI-powered brainstorming techniques can help teams generate more creative and impactful ideas?",
      },
      {
        title: "Idea",
        content:
          "How is AI being used to identify and nurture promising business ideas with high growth potential?",
      },
      {
        title: "Sports",
        content:
          "How is AI enhancing the safety and fairness of sports events by detecting rule violations and officiating disputes?",
      },
      {
        title: "Sports",
        content:
          "What AI applications are available to help fans track their favorite players and teams, and receive personalized content?",
      },
    ];

    const randoms = [];
    const data = [];

    while (randoms.length < 4) {
      const random = Math.round(Math.random() * 19);
      if (!randoms.includes(random)) {
        data.push(randomSuggestedData[random]);
        randoms.push(random);
      }
    }

    suggestedData = data;
  })();

  return (
    <div className="overflow-x-auto px-5 relative pb-10 custom-vertical-scrollbar">
      <div className="max-w-[830px] m-auto">
        <div className=" mt-16 flex flex-col gap-3 ">
          <p
            className="text-5xl font-medium w-fit bg-gradient-to-r from-[#3478ff] to-[#ff8282] inline"
            style={{
              WebkitTextFillColor: "transparent",
              WebkitBackgroundClip: "text",
            }}
          >
            Hello, Sandeep
          </p>
          <p className=" text-5xl  text-light-dark-4 font-normal">
            How can I help you today?
          </p>
        </div>
        <div className="flex  2xl:grid- custom-horizontal-scrollbar gap-2 w-full overflow-x-auto justify-between mt-16">
          {suggestedData.map((item, index) => (
            <SuggestedItem
              key={index}
              title={item.title}
              prompt={item.content}
            />
          ))}
        </div>
        {isHowItWorks && (
          <div className="grid gap-5 grid-cols-[auto_1fr] p-5 bg-light-dark-2 rounded-xl mt-5 text-white">
            <div className="mt-1">
              <TiWarning />
            </div>

            <div className="flex flex-col gap-4 text-sky-200">
              <p>
                Your conversations are processed by human reviewers to improve
                the technologies powering Gemini Apps. Don't enter anything that
                you wouldn't want to be reviewed or used.
              </p>

              <div className="flex items-center gap-2 text-sm">
                <button
                  onClick={() => {
                    dispatch(setHowWork(true));
                    console.log("click");
                  }}
                  className="rounded-full px-3 py-2 hover:bg-light-dark-4"
                >
                  How it works
                </button>
                <button
                  onClick={() => {
                    setIsHowWork(false);
                  }}
                  className="rounded-full px-3 py-2 hover:bg-light-dark-4"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Content;
