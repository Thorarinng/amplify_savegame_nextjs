import React, { useState } from "react";
import userService from "../../service/userService";
import Router from "next/router";
import { useDispatch } from "react-redux";
import { USER_LOGIN_ACTION } from "../../redux/actions/userActions";

import loginStyles from "../../styles/Login.module.css";

const Login = () => {
  // Dispatch
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMsg, setErrorMsg] = useState({});

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    console.log("handle login");

    try {
      console.log("before");
      const user = await userService.login(email, password);
      console.log("after");

      console.log(user);
      dispatch(USER_LOGIN_ACTION(user));
      Router.push("game");
    } catch (e) {
      console.log("log in failed");
      console.log(e.response);
      console.log(e.response.data);
      setErrorMsg(e.response.data);
    }
  };
  return (
    <div className={loginStyles.container}>
      <div className="form-main-outer">
        <div className="form-main-inner">
          <form>
            <h1> Sign in </h1>
            <h3>Email</h3>
            {errorMsg.email}
            {/* {Object.values(errorMsg).map((em) => (
              <p>{em}</p>
            ))} */}
            <input
              placeholder="Enter your email address"
              onChange={handleEmailChange}
            />
            <h3>Password</h3>
            {errorMsg.password}
            <input
              placeholder="Enter your password"
              onChange={handlePasswordChange}
              type="password"
            />

            {errorMsg.detail}
            <button
              className="btn"
              type="button"
              value="Login"
              onClick={handleLogin}
            >
              Login
            </button>
          </form>

          <h3>Don't have account yet?</h3>
          <button className="btn">
            <a href="register">Create Account</a>
          </button>
          <h3>Forgot your password?</h3>
          <button className="btn">
            <a href={"reset/password"}>Reset Password</a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
