import React from "react";
import * as emoji from "node-emoji";

interface LevelProgressBarProps {
  scoreFirst: number;
  name: string;
  emojiName: string;
  description: string;
  userScore: number | undefined;
}

const LevelProgressBar = (props: LevelProgressBarProps) => {
  const { scoreFirst, name, emojiName, description, userScore } = props;
  const progressBarColor =
    userScore && userScore >= scoreFirst ? "#4C9CCD" : "gray";

  return (
    <>
      <div className="p-4 mt-4">
        <div className="container">
          <div className="flex flex-col md:grid grid-cols-12 text-gray-50">
            <div className="flex md:contents">
              <div className="col-start-2 col-end-4 mr-10 md:mx-auto relative">
                {emojiName !== ":fleur_de_lis:" && (
                  <div
                    style={{ backgroundColor: progressBarColor, top: "6rem" }}
                    className="w-0.5 h-5/6 relative left-3.5"
                  ></div>
                )}

                <div
                  style={{ backgroundColor: progressBarColor }}
                  className="w-8 h-8 absolute top-1/2 -mt-3 rounded-full shadow text-center flex items-center justify-center"
                >
                  {emoji.emojify(emojiName)}
                </div>
              </div>
              <div className="bg-red col-start-4 col-end-12 p-4 rounded-xl my-4 mr-auto shadow-md w-full">
                <h3
                  style={{ color: progressBarColor }}
                  className="font-semibold text-lg mb-1"
                >
                  {name}
                </h3>
                <p className="text-neutral-400">{description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LevelProgressBar;
