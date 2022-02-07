import uri from "../config/django";
import axios from "axios";

const characterService = () => {
  const getAllCharacters = async () => {
    const res = await axios.get(`${uri}api/character/`);
    return res;
  };
  const selectCharacter = async (characterId) => {
    await axios.post(`${uri}api/character/`, { characterId });
  };
  return { getAllCharacters, selectCharacter };
};

export default characterService();
