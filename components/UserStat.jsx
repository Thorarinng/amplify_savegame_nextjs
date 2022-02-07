import React from "react";
import { useSelector } from "react-redux";

export const UserStat = () => {
  const userStat = useSelector((state) => state.userStatReducer.data);

  return (
    <div className="txt-white">
      Health: {userStat.health}
      <br />
      Balance: ${userStat.money}
    </div>
  );
};
