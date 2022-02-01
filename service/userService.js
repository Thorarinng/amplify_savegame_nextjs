import axios from "axios";

import authService from "./authService";

import uri from "../config/next";
import djangoURL from "../config/django";

const userService = () => {
  const __saveToLocalStorage = (response) => {
    console.log(response.data);
    console.log("HERE");
    const { tokens } = response.data;
    const accessToken = tokens.access;
    const user = response.data;

    localStorage.setItem("tokens", JSON.stringify(tokens));
    localStorage.setItem("user", JSON.stringify(user));
    authService.setAuthorizationToken(accessToken);
  };

  const __removeCachedUserData = () => {
    authService.setAuthorizationToken(); // deletes bearer token from default axios settings
    localStorage.removeItem("tokens");
    localStorage.removeItem("user");
  };

  const register = async ({
    email,
    password,
    password2,
    firstname,
    lastname,
    username,
  }) => {
    /* This function uses /api/logout.js to remove cookies  */

    // request to register with user credentials
    try {
      // const res = await axios.post(`${uri}api/user/register/`, {
      //   email,
      //   password,
      //   password2,
      //   firstname,
      //   lastname,
      //   username,
      // });

      console.log("hallo");

      console.log(email, password, password2, firstname, lastname, username);

      const res = await axios.post(
        `${uri}api/register/`,
        {
          email,
          password,
          password2,
          firstname,
          lastname,
          username,
        },
        { withCredentials: true }
      );

      __saveToLocalStorage(res.data);

      // assign user data to variable and return to component
      const user = res.data;
      return user;
    } catch (e) {
      // Service or user input failed
      // console.log(e);
      console.log(e.response);
      console.log(e.response.status);

      // TODO: Add all exception cases
      // Basis exception s.t
      throw new Error(e.response);
    }
  };

  const login = async (email, password) => {
    /* This function uses /api/logout.js to ADD cookies  */
    console.log("in login func2");
    console.log(uri);
    try {
      // request to login with user credentials
      const res = await axios.post(
        `${uri}api/login/`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      console.log("in login func");

      __saveToLocalStorage(res.data);
      // assign user data to variable and return to component
      const user = res.data;
      return user;
    } catch (e) {
      // Service or user input failed
      console.log(e);
      console.log(e.response);
      console.log(e.response.status);
      throw new Error("Error: login failed");

      // TODO: Add all exception cases
      // Basis exception s.t
      // throw new Error(e.response);
    }
  };

  const logout = async () => {
    /* This function uses /api/logout.js to REMOVE cookies  */

    const tokensStr = localStorage.getItem("tokens");
    const tokens = JSON.parse(tokensStr);

    try {
      await axios.post(`${djangoURL}api/user/logout/`, tokens, {
        headers: {
          Authorization: `Bearer ${tokens.access}`,
        },
      });
      // request to login with user credentials
      // const res = await axios.post(`${uri}api/userlogout/`, tokens, {
      //   withCredentials: true,
      // });
    } catch (e) {
      // Service or user input failed
      console.log(e.response);
      console.log(e.response.status);

      // TODO: Add all exception cases
      // Basis exception s.t
      // throw new Error(e.response);
    }

    __removeCachedUserData();
  };

  return {
    register,
    login,
    logout,
  };
};

export default userService();
