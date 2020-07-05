/* eslint-disable */
import React, { useContext, useState, useEffect, useRef } from "react";
import io from "socket.io-client";
const socket = io("http://localhost:5000");
import { AuthContext } from "../context/AuthContext";
import ChatBubble from "../components/ChatBubble";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const ChatScreen = (props) => {
  const { isLoggedIn, token, user, loginFunc, logoutFunc } = useContext(
    AuthContext
  );
  const [message, setMessage] = useState("");
  const room = props.match.params.room;
  const messagesRef = useRef();
  const submitHandler = (e) => {
    e.preventDefault();
    socket.emit("message", { user, message, room });
    setMessage("");
  };
  const [messages, setMessages] = useState([
    { user: { name: "User A" }, message: "User A here" },
    { user: { name: "User A" }, message: "User A here" },
    { user: { name: "User A" }, message: "User A here" },
    { user: { name: "User A" }, message: "User A here" },
    { user: { name: "User A" }, message: "User A here" },
    { user: { name: "User A" }, message: "User A here" },
    { user: { name: "User A" }, message: "User A here" },
    { user: { name: "User A" }, message: "User A here" },
    { user: { name: "User A" }, message: "User A here" },
    { user: { name: "User A" }, message: "User A here" },
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
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
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
    <div style={style.container}>
      <div style={style.navbar}>
        <div style={style.logo}>ChatRoomz</div>
        <div>
          <Button onClick={leaveRoom} style={{ color: "#fff" }}>
            Leave Room
          </Button>
          <Button onClick={logoutFunc} style={{ color: "#fff" }}>
            Logout
          </Button>
        </div>
      </div>
      <div style={style.chatContainer}>
        <div style={style.messagesContainer} ref={messagesRef}>
          {messages.map((msg) => (
            <ChatBubble
              key={Math.random()}
              user={msg.user.name}
              message={msg.message}
            />
          ))}
        </div>
        <form onSubmit={submitHandler} style={{ marginTop: 40 }}>
          <TextField
            type="text"
            multiline
            rowsMax={2}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message"
            variant="outlined"
            style={style.input}
          />
          <Button
            variant="contained"
            type="submit"
            style={message ? style.button : style.disabledButton}
            disabled={message ? false : true}
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

const style = {
  button: {
    background: "#407ad6",
    color: "#fff",
    width: "100%",
    marginTop: 10,
  },
  chatContainer: {
    display: "flex",
    flexDirection: "column",
    width: "60%",
    padding: 60,
    margin: "auto",
    borderRadius: 20,
    backgroundColor: "#edf4ff",
    height: "70vh",
  },
  container: {
    width: "80%",
  },
  disabledButton: {
    background: "#e0e0e0",
    color: "#fff",
    width: "100%",
    marginTop: 10,
  },
  input: {
    width: "100%",
    marginTop: 10,
    background: "#f7f7f7",
  },
  logo: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    spaceBetween: "1.5",
  },
  messagesContainer: {
    overflow: "auto",
    padding: 30,
    paddingRight: 60,
    borderRadius: 20,
    border: "1px solid #f7f7f7",
    background: "#f7f7f7",
  },
  navbar: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "end",
    padding: "30px 0px",
  },
};

export default ChatScreen;
