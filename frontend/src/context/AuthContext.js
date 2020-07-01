import React, { useState, createContext } from "react";
import { withRouter } from "react-router-dom";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [user, setUser] = useState("");

  const loginFunc = (tokenArg, userArg) => {
    setLoggedIn(true);
    setToken(tokenArg);
    setUser(userArg);
    localStorage.setItem(
      "userData",
      JSON.stringify({ user: userArg, token: tokenArg })
    );
    props.history.push("/"); //AuthContext Provider is getting history in props becasue we used withContext whjile exporting it. We also had to wrap the AuthContextProvider tags with BrowserRouter tags to allow withContext to be used AuthContexxtProvider.And AuthContextProvider wrapped the root App in index.js so that we could access AuthContext in the main root App. We did this because we need to run the login func in the root level on each refresh
  };

  const logoutFunc = () => {
    setLoggedIn(false);
    setToken("");
    setUser("");
    localStorage.removeItem("userData");
    props.history.push("/auth");
  };
  // console.log(props);
  return (
    <AuthContext.Provider
      value={{ isLoggedIn, token, user, loginFunc, logoutFunc }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default withRouter(AuthContextProvider);
