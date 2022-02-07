import React, { useState, useEffect } from "react";

import router, { useRouter } from "next/router";

import characterService from "../../../service/characterService";
import cookieService from "../../../service/cookieService";
import { Game } from "../../../components/Game";
import { UserStat } from "../../../components/UserStat";
import gameService from "../../../service/gameService";
import { GoBackButton } from "../../../core/buttons/GoBackButton";

import gameStyles from "../../../styles/Game.module.css";
import Loading from "../../../components/Loading";
import { Character } from "../../../components/Character";

import { useDispatch, useSelector } from "react-redux";
import { USERSTAT_UPDATE_ACTION } from "../../../redux/actions/userStatActions";

const PlayingGame = () => {
  const { query } = useRouter();

  const userStat = useSelector((state) => state.userStatReducer.data);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  // const [userStat, setUserStat] = useState(null);
  const [character, setCharacter] = useState(null);
  const [hasCharacter, setHasCharacter] = useState(null);
  const [game, setGame] = useState(null);

  const [QTA, setQTA] = useState(null);

  const fetchData = async () => {
    try {
      const res = await characterService.getAllCharacters();
      // extract data from response
      const characterData = res.data;

      if (characterData.hasCharacter) {
        console.log("I have character");
        const res = await gameService.getGame();
        const gameData = res.data;
        console.log("inserting into redux");
        console.log(characterData.userStat);
        dispatch(USERSTAT_UPDATE_ACTION(characterData.userStat));

        setCharacter(characterData.character);
        setHasCharacter(characterData.hasCharacter);
        setGame(gameData);
        setQTA(gameData.questionToAnswer);
        setIsLoading(false);
      }

      if (!characterData.hasCharacter) {
        console.log("I dont have character");
        console.log(query.id);
        router.push(`/game/${query.id}/characters`);
      }
    } catch (e) {
      console.log(e.response);
    }
  };

  useEffect(async () => {
    await fetchData();
  }, []);

  // get back userstat
  // Pick a character
  return (
    <div className={gameStyles.container}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Character />
          <UserStat />
          <Game game={game} QTA={QTA} setQTA={setQTA} />
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
