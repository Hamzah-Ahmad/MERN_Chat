/* eslint-disable */

import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const Register = () => {
  const [name, setName] = useState("Hamzah");
  const [error, setError] = useState("");
  const [email, setEmail] = useState("Hamzah@email.com");
  const [password, setPassword] = useState("12345");

  const { isLoggedIn, token, user, loginFunc, logoutFunc } = useContext(
    AuthContext
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    let body = { name, email, password };
    body = JSON.stringify(body);

    axios
      .post("/auth/register", body, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
      })
      .then((res) => {
        console.log(res);
        loginFunc(res.data.token, res.data.user);
      })
      .catch((err) => {
        // console.log(body);
        console.log(err.response.data);
        setError(err.response.data);
      });

    // setEmail("");
    // setPassword("");
  };
  return (
    <div>
      <h1>Register</h1>
      {error && <div>{error.msg}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <br />
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <br />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <br />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Register;
