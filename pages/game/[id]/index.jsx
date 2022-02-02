import React, { useState, useEffect } from "react";

import router, { useRouter } from "next/router";

import characterService from "../../../service/characterService";
import cookieService from "../../../service/cookieService";
import { Character } from "../../../components/Character";
import { Game } from "../../../components/Game";
import { UserStat } from "../../../components/UserStat";
import gameService from "../../../service/gameService";
import { GoBackButton } from "../../../core/buttons/GoBackButton";

import gameStyles from "../../../styles/Game.module.css";
import Loading from "../../../components/Loading";

const PlayingGame = () => {
  const { query } = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [userStat, setUserStat] = useState(null);
  const [character, setCharacter] = useState(null);
  const [hasCharacter, setHasCharacter] = useState(null);
  const [game, setGame] = useState(null);

  useEffect(async () => {
    const res = await characterService.getAllCharacters();
    // extract data from response
    const characterData = res.data;

    if (characterData.hasCharacter) {
      console.log("I have character");
      const res = await gameService.getGame();
      const gameData = res.data;
      setUserStat(characterData.userStat);
      setCharacter(characterData.character);
      setHasCharacter(characterData.hasCharacter);
      setGame(gameData);
      setIsLoading(false);
    }

    if (!characterData.hasCharacter) {
      console.log("I dont have character");
      router.push(`/game/${query.id}/characters`);
    }
  }, []);

  // get back userstat
  // Pick a character
  return (
    <div className={gameStyles.container}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Character c={character} />
          <UserStat userStat={userStat} />
          <Game game={game} />
          <GoBackButton path="/game" title={"Back"} />
        </>
      )}
    </div>
  );
};

// export async function getServerSideProps({ req, query }) {
//   // Source - SSR: https://imgur.com/a/WhqxKNu
//   // Extract accestoken from cookie
//   const accessToken = cookieService.getAccessToken(req);
//   // get all games to join
//   const res = await characterService.getAllCharacters(accessToken);

//   // extract data from response
//   const characterData = res.data;

//   if (res.status === 401) {
//     return {
//       redirect: {
//         permanent: false,
//         destination: "/login",
//       },
//     };
//   }

//   if (characterData.hasCharacter) {
//     const res = await gameService.getGame(accessToken);
//     const gameData = res.data;
//     return {
//       props: {
//         userStat: characterData.userStat,
//         character: characterData.character,
//         hasCharacter: characterData.hasCharacter,
//         game: gameData,
//       },
//     }; // will be passed to the page component as props
//   }

//   return {
//     redirect: {
//       permanent: false,
//       destination: `/game/${query.id}/characters`,
//     },
//   };
// }

export default PlayingGame;
