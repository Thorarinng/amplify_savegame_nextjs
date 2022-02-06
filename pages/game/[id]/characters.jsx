import React, { useState } from "react";
import cookieService from "../../../service/cookieService";
import characterService from "../../../service/characterService";
import { CharacterCard } from "../../../components/CharacterCard";
import { GoBackButton } from "../../../core/buttons/GoBackButton";
import { useEffect } from "react";

const characterSelection = () => {
  const [characters, setCharacters] = useState([]);

  useEffect(async () => {
    const res = await characterService.getAllCharacters();
    //   // extract data from response
    const data = res.data;
    console.log(data);
    setCharacters(data.characters);
  }, []);

  console.log(characters);

  return (
    <>
      <h1>characterSelection </h1>
      {characters.map((c) => {
        return <CharacterCard key={c.id} c={c} len={characters.length} />;
      })}
      <GoBackButton path={"/game"} title={"Back"} />
    </>
  );
};
// export async function getServerSideProps({ req }) {
//   // Source - SSR: https://imgur.com/a/WhqxKNu
//   // Extract accestoken from cookie
//   const accessToken = cookieService.getAccessToken(req);
//   // get all games to join
//   const res = await characterService.getAllCharacters(accessToken);

//   // extract data from response
//   const data = res.data;

//   console.log("data", data);

//   if (res.status === 401) {
//     return {
//       redirect: {
//         permanent: false,
//         destination: "/login",
//       },
//     };
//   }

//   // if (data.hasCharacter) return {props: { userStat: data.userStat, character: data.character, hasCharacter: data.hasCharacter  }} // will be passed to the page component as props
//   if (!data.hasCharacter) return { props: { characters: data.characters } };

//   return {
//     redirect: {
//       permanent: false,
//       destination: `error`,
//     },
//   };
// }

export default characterSelection;
