import React from "react";
import { useSelector } from "react-redux";

export const Character = () => {
  const QTA = useSelector((state) => state.characterReducer.data);
  console.log(QTA);
  return (
    <>
      <h1 className="txt-white">Joel</h1>
      {QTA === 1 && <img src={"/IMG_4938.png"} className="charImg" />}
      {QTA === 2 && <img src={"/IMG_4939.png"} className="charImg" />}
      {QTA === 3 && <img src={"/IMG_4940.png"} className="charImg" />}
      {QTA === 4 && <img src={"/IMG_4941.png"} className="charImg" />}
      {QTA === 5 && <img src={"/IMG_4941.png"} className="charImg" />}
      {QTA === 6 && <img src={"/IMG_4941.png"} className="charImg" />}
    </>
  );
};
