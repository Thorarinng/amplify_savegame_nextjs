import React from "react";

export const UserStat = ({ userStat }) => {
  return (
    <>
      Health: {userStat.health}
      <br />
      Balance: ${userStat.money}
    </>
  );
};
