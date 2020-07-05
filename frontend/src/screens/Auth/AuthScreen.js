/* eslint-disable */

import React from "react";
import Login from "./Login";
import Register from "./Register";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const AuthScreen = ({ history }) => {
  const mediaMatch = useMediaQuery("(min-width:760px)");
  return (
    <div style={mediaMatch ? style.container : style.mobileContainer}>
      <Login history={history} mediaMatch={mediaMatch} />

      <Register history={history} mediaMatch={mediaMatch} />
    </div>
  );
};

const style = {
  container: {
    display: "flex",
    justifyContent: "space-around",
    overflow: "hidden",
  },
  mobileContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    height: "100vh",
  },
};

export default AuthScreen;
