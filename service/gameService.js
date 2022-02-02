import buri from "../config/django";
import axios from "axios";
import authService from "./authService";

const gameService = () => {
  const getAllGames = async (accessToken) => {
    console.log(axios.defaults.headers.common.Authorization);
    const res = await axios.get(`${buri}api/game/join/`);
    return res;
  };

  const joinGame = async (gameId) => {
    await axios.post(`${buri}api/game/join/`, { gameId });
  };

  const getGame = async () => {
    const res = await axios.get(`${buri}api/userStat/`);
    return res;
  };

  const makeDecision = async (value) => {
    const res = await axios.post(`${buri}api/userStat/`, { choice: value });
    return res.data;
  };

  const viewStats = async ({ gameId }) => {
    const res = await axios.get(`${buri}api/userStat/history/${gameId}`);
    return res;
  };

  return { getAllGames, joinGame, getGame, makeDecision, viewStats };
};

export default gameService();
