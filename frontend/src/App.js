/* eslint-disable */
import axios from "axios";
import React, { useEffect, useContext } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./App.css";
import AuthScreen from "./screens/Auth/AuthScreen";
import Homescreen from "./screens/Homescreen";

import { AuthContext } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App(props) {
  //AuthContextProvider tag is wrapping the App tag in the index.js file
  const { isLoggedIn, token, user, loginFunc, logoutFunc } = useContext(
    AuthContext
  );
  // socket.on("message", (message) => {
  //   console.log(message);
  // });

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (storedData && storedData.token) {
      loginFunc(storedData.token, storedData.user);
    }
  }, []);

  return (
    <div className="App">
      <ProtectedRoute exact path="/" component={Homescreen} />
      <Route exact path="/auth" component={AuthScreen} />
    </div>
  );
}

export default App;
