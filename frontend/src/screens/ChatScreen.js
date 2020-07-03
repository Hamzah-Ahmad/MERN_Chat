/* eslint-disable */
import React, { useContext, useState, useEffect } from "react";
import io from "socket.io-client";
const socket = io("http://localhost:5000");
import { AuthContext } from "../context/AuthContext";
import ChatBubble from "../components/ChatBubble";

const ChatScreen = (props) => {
  const { isLoggedIn, token, user, loginFunc, logoutFunc } = useContext(
    AuthContext
  );
  const [message, setMessage] = useState("");
  const room = props.match.params.room;

  const submitHandler = (e) => {
    e.preventDefault();
    socket.emit("message", { user, message, room });
    setMessage("");
  };
  const [messages, setMessages] = useState([
    { user: { name: "User A" }, message: "User A here" },
    { user: { name: "User B" }, message: "User B present" },
    { user: { name: "User C" }, message: "User C here" },
  ]);

  const leaveRoom = () => {
    socket.emit("leaveRoom", room);
    props.history.push("/");
  };
  useEffect(() => {
    // console.log(room);
    let mounted = true;
    socket.emit("joinRoom", { user, room });
    socket.on("message", (message) => {
      setMessages((messages) => [
        ...messages,
        { user: message.user, message: message.message },
      ]);
    });
    socket.on("welcomeUser", (msg) => console.log(msg));
    return () => {
      socket.emit("leaveRoom", room);
      mounted = false;
    };
  }, []);

  // useEffect(() => console.log(props));

  // useEffect(() => {
  //   socket.emit("joinRoom", room);
  // }, [room]);

  return (
    <div>
      <h1>Chat Room __ {user.name}</h1>
      <button onClick={logoutFunc}>Logout</button>
      <button onClick={leaveRoom}>Leave Room</button>
      {messages.map((msg) => (
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

export default ChatScreen;
