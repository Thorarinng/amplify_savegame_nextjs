import Head from "next/head";
import homeStyles from "../styles/Home.module.css";
import userService from "../service/userService";
import Logout from "../components/Logout";

import { useSelector } from "react-redux";
import GuardImage from "../core/images/GuardImage";

export default function Home() {
  const isLoggedIn = useSelector((state) => state.userReducer.loggedIn);
  const user = useSelector((state) => state.userReducer.data);

  return (
    <>
      <div>
        <GuardImage />
        {isLoggedIn ? (
          <>
            <div className="grid">
              <span className="txt-white">Welcome {user.username} </span>
              <a href={isLoggedIn ? "game" : "login"} className="join-btn">
                Join Game
              </a>
              <Logout />
            </div>
          </>
        ) : (
          <div className="grid">
            <a href={isLoggedIn ? "game" : "login"} className="join-btn">
              Join Game
            </a>
          </div>
        )}
      </div>
    </>
  );
}
