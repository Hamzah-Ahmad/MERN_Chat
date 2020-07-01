import React from "react";
import Login from "./Login";
import Register from "./Register";

const AuthScreen = () => {
  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <Register />
      <Login />
    </div>
  );
};

export default AuthScreen;
