import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { UserStat } from "./UserStat";
import { Blood } from "./Blood";

import goStyles from "../styles/GameOver.module.css";

export const GameOver = () => {
  const userStat = useSelector((state) => state.userStatReducer.data);

  const [isWinner, setIsWinner] = useState(
    userStat.money !== 0 && parseInt(userStat.health) !== 0
  );

  useEffect(() => {
    setIsWinner(userStat.money !== 0 && parseInt(userStat.health) !== 0);
  }, [userStat.money, userStat.health]);

  return (
    <div className="txt-white">
      {isWinner ? (
        <h1>Congratulations!</h1>
      ) : (
        <>
          <h1>You lost!</h1>
        </>
      )}
    </div>
  );
};
