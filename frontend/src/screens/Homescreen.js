/* eslint-disable */
import React, { useContext, useState, useEffect } from "react";
import io from "socket.io-client";
const socket = io("http://localhost:5000");
import { AuthContext } from "../context/AuthContext";
import ChatBubble from "../components/ChatBubble";

const Homescreen = () => {
  const { isLoggedIn, token, user, loginFunc, logoutFunc } = useContext(
    AuthContext
  );
  const [message, setMessage] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    socket.emit("message", { user, message });
    setMessage("");
  };
  const [fakeMsgs, setFakeMsgs] = useState([
    { user: { name: "User A" }, message: "User A here" },
    { user: { name: "User B" }, message: "User B present" },
    { user: { name: "User C" }, message: "User C here" },
  ]);
  useEffect(() => {
    console.log("useEffect");
    let mounted = true;
    socket.on("message", (message) => {
      console.log("Client method ran");
      setFakeMsgs((fakeMsgs) => [
        ...fakeMsgs,
        { user: message.user, message: message.message },
      ]);
    });

    return () => (mounted = false);
  }, []);

  return (
    <div>
      <h1>Chat Room __ {user.name}</h1>
      <button onClick={logoutFunc}>Logout</button>
      {fakeMsgs.map((msg) => (
        <ChatBubble
          key={Math.random()}
          user={msg.user.name}
          message={msg.message}
        />
      ))}
      <form onSubmit={submitHandler}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message"
          style={styles.input}
        />
        <button style={styles.button}>Submit</button>
      </form>
    </div>
  );
};

const styles = {
  button: {},
  input: {
    padding: 10,
    marginRight: 10,
    borderRadius: 10,
  },
  ul: {
    listStyle: "none",
    padding: 0,
  },
};

export default Homescreen;
