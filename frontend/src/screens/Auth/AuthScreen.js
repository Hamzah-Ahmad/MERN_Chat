/* eslint-disable */

import React from "react";
import Login from "./Login";
import Register from "./Register";

const AuthScreen = ({ history }) => {
  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <Register history={history} />
      <Login history={history} />
    </div>
  );
};

export default AuthScreen;
