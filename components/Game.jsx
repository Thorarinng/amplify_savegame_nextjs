import React, { useState, useEffect } from "react";
import gameService from "../service/gameService";
import { Decision } from "./Decision";
import Countdown from "./Countdown";
import gameStyles from "../styles/Game.module.css";

export const Game = ({ game, QTA, setQTA }) => {
  // option - which answer is user answering - choice
  const [option, setOption] = useState(null);
  const [isLocked, setIsLocked] = useState(!game.canMakeDecision);

  const [timeUntil, setTimeUntil] = useState(game.timeUntil);

  // has user finished?
  const [isFinished, setIsFinished] = useState(game.isGameDone);

  const [isFeedback, setIsFeedback] = useState(false);

  const handleFeedback = () => {
    // false -> show next question
    setIsFeedback(false);
    // Reset this var - s.t it does not have selected value for next question
    setOption(null);
  };

  const handleNext = async () => {
    // Handles answering the question

    // If timeUntil has not reached 0 we can not answer
    if (isLocked) return;
    if (option === null) return;
    const data = await gameService.makeDecision(option);
    console.log(data.canMakeDecision);

    console.log(option);

    // user is displayed feedback from the previous question
    setIsFeedback(true);

    // New values set for next question
    setIsLocked(game.canMakeDecision);
    setTimeUntil(data.timeUntil);
    setIsFinished(data.isGameDone);
    setQTA(data.questionToAnswer);
  };

  const handleValueChange = (idx) => {
    // e - event
    if (isLocked) return;
    // console.log(idx.target.value);
    const answ = game.QA[`answer${QTA}`][idx];
    console.log(typeof idx);
    console.log(idx);
    setOption(idx);
  };

  useEffect(() => {
    console.log("refresh page - QTA");
  }, [QTA]);

  useEffect(() => {}, [timeUntil]);

  return (
    <>
      {isFinished ? (
        <> You have finished game </>
      ) : (
        <>
          {isFeedback ? (
            <>
              {QTA - 1 !== 0 && (
                <>
                  <h1 className="title">Aftermath {QTA - 1}</h1>
                  <p className={gameStyles.question}>
                    {game.QA[`actualAnswerText${QTA - 1}`][option]}
                  </p>
                  <button
                    className={"btn"}
                    type="button"
                    onClick={() => handleFeedback()}
                  >
                    Next
                  </button>
                </>
              )}
            </>
          ) : (
            <>
              <br />
              <br />

              <div>
                <h1 className="title">Question {QTA}</h1>
                <p className={gameStyles.question}>
                  {" "}
                  {game.QA[`question${QTA}`]}
                </p>
              </div>

              <br />
              <br />

              <div>
                <Countdown
                  initDays={0}
                  initHours={0}
                  initMinutes={0}
                  initSeconds={timeUntil}
                  setIsLocked={setIsLocked}
                  isLocked={isLocked}
                />
              </div>

              <div className={gameStyles.cardContainer}>
                <div className={gameStyles.cardContent}>
                  <Decision
                    QTA={QTA}
                    game={game}
                    option={option}
                    handleValueChange={handleValueChange}
                  />
                </div>
              </div>

              <button
                disabled={option === null || isLocked}
                className={isLocked ? "btn-disabled" : "btn"}
                type="button"
                onClick={() => handleNext()}
              >
                {isLocked ? "Locked" : "Next"}
              </button>
            </>
          )}
        </>
      )}
    </>
  );
};
