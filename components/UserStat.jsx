import React from "react";

export const UserStat = ({ userStat }) => {
  return (
    <div className="txt-white">
      Health: {userStat.health}
      <br />
      Balance: ${userStat.money}
    </div>
  );
};
