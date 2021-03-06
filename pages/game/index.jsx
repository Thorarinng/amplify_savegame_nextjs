import React, { useEffect, useState } from "react";

import { GamesList } from "../../components/GamesList";

import gameService from "../../service/gameService";
import cookieService from "../../service/cookieService";
import { GoBackButton } from "../../core/buttons/GoBackButton";

import GuardImage from "../../core/images/GuardImage";

import Loading from "../../components/Loading";
import router from "next/router";
import { useDispatch } from "react-redux";
import { CHARACTER_UPDATE_ACTION } from "../../redux/actions/characterActions";

const Game = ({ games }) => {
  const dispatch = useDispatch();
  // const [isLoading, setIsLoading] = useState(true);
  console.log(games);

  //
  const [currGames, setCurrGames] = useState(games.filter((g) => g.isPlaying));
  const [playedGames, setPlayedGames] = useState(
    games.filter((g) => g.isFinished)
  );
  const [otherGames, setOtherGames] = useState(
    games.filter((g) => !g.isFinished && !g.isPlaying)
  );

  const [isInGame, setIsInGame] = useState(
    games.filter((g) => g.isPlaying).length !== 0
  );

  const handleJoinGame = async (gameId) => {
    await gameService.joinGame(gameId);
    router.push(`/game/${gameId}`);
  };

  // const filterGames = (toFiltGames) => {
  //   const localCurrGames = toFiltGames.filter((g) => g.isPlaying);
  //   setCurrGames(localCurrGames);
  //   setPlayedGames(toFiltGames.filter((g) => g.isFinished));
  //   setOtherGames(toFiltGames.filter((g) => !g.isFinished && !g.isPlaying));

  //   setIsInGame(localCurrGames.length !== 0);
  // };

  // const getGames = async () => {
  //   const res = await gameService.getAllGames();
  //   const data = res.data;
  //   filterGames(data.lis);
  //   setIsLoading(false);
  // };

  // useEffect(async () => {
  //   dispatch(CHARACTER_UPDATE_ACTION(1));
  //   await getGames();
  // }, []);

  // useEffect(async () => {
  //   console.log("read");
  // }, [isLoading]);

  return (
    <>
      <GuardImage />
      {isInGame ? (
        <>
          <GamesList
            games={currGames}
            title={"Currently Playing"}
            buttonMsg="Play"
            onClickFunc={handleJoinGame}
            path={"/game"}
            options={{}}
          />
          <GamesList
            games={otherGames}
            title={"Other Games"}
            buttonMsg="Must finish ongoing games first"
            onClickFunc={() => alert("Finish ongoing matches first")}
            path={null}
            options={{}}
          />
        </>
      ) : (
        <GamesList
          games={otherGames}
          title={"Games To Play"}
          buttonMsg="Join"
          path={"/game"}
          onClickFunc={handleJoinGame}
          options={{}}
        />
      )}
      <GamesList
        games={playedGames}
        title={"Games Already Played"}
        buttonMsg="View Stats"
        onClickFunc={() => {}}
        path={"/game/stats"}
        options={{ isStats: true }}
      />
      <GoBackButton path={"/"} title={"Home"} />
    </>
  );
};

export async function getServerSideProps({ req }) {
  // Source - SSR: https://imgur.com/a/WhqxKNu
  // Extract accestoken from cookie
  const accessToken = cookieService.getAccessToken(req);
  console.log("retrieving token");
  console.log(accessToken);
  // // get all games to join
  const res = await gameService.getAllGames(accessToken);

  // // extract data from response
  const data = res.data;

  if (res.status === 401) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }

  return {
    props: { games: data.lis }, // will be passed to the page component as props
  };
}

export default Game;
