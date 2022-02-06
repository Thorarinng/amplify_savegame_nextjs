import React, { useEffect } from "react";
import { useRouter } from "next/router";
import characterService from "../service/characterService";
import charStyles from "../styles/Character.module.css";

// import charImg from "../public/IMG_4938.png";

export const CharacterCard = ({ c, len }) => {
  const router = useRouter();

  useEffect(() => {}, [len]);

  console.log(c, len);

  const handleSelectCharacter = async (characterId) => {
    // Select character for specific game
    await characterService.selectCharacter(characterId);

    // redirect user back to game after selecting character
    const prevPathStr = router.asPath.split("/");
    prevPathStr.pop();
    const prevPath = prevPathStr.join("/");
    router.push(prevPath);
  };
  return (
    <div className={charStyles.card}>
      <strong>
        <p> {c.name}</p>
        {/* <img src={"/IMG_4938.png"} className="charImg" />
        <img src={"/IMG_4939.png"} className="charImg" />
        <img src={"/IMG_4940.png"} className="charImg" /> */}
        <img src={"/IMG_4941.png"} className="charImg" />
      </strong>

      <ul>
        <li>{c.detail1}</li>
        <li>{c.detail2}</li>
      </ul>

      <button onClick={() => handleSelectCharacter(c.id)} className="btn">
        Select
      </button>
    </div>
  );
};
