import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import gameService from "../../../service/gameService";
import cookieService from "../../../service/cookieService";
import { GoBackButton } from "../../../core/buttons/GoBackButton";

const gameStats = ({ stats }) => {
  const router = useRouter();

  // const [isLoading, setIsLoading] = useState(true);

  // const [stats, setStats] = useState({
  //   id: null,
  //   game: { id: null },
  //   health: null,
  //   money: null,
  //   isDead: null,
  //   isPlaying: null,
  // });

  // useEffect(async () => {
  //   if (router.query.id === undefined) return router.push("/game");
  //   const res = await gameService.viewStats({ gameId: router.query.id });
  //   // extract data from response
  //   const data = res.data;
  //   setStats(data);
  //   setIsLoading(false);
  // }, []);

  return (
    <>
      <h1>Stats </h1>
      <div>StatsId: {stats.id}</div>
      <div> GameId: {stats.game.id}</div>
      <div> Health: {stats.health}</div>
      <div> Money: {stats.money}</div>
      <div> isDead: {stats.isDead ? "T" : "F"} </div>
      <div> isPlaying: {stats.isPlaying ? "T" : "F"} </div>
      <GoBackButton />
    </>
  );
};

export async function getServerSideProps({ req, query }) {
  // Source - SSR: https://imgur.com/a/WhqxKNu
  // Extract accestoken from cookie
  const accessToken = cookieService.getAccessToken(req);
  console.log(query.id);
  // get all games to join
  const res = await gameService.viewStats({ accessToken, gameId: query.id });

  // extract data from response
  const data = res.data;

  console.log("data", data);

  if (res.status === 401) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }

  if (res.status === 200) {
    return {
      props: {
        stats: data,
      },
    };
  }

  return {
    redirect: {
      permanent: false,
      destination: `error`,
    },
  };
}

export default gameStats;
