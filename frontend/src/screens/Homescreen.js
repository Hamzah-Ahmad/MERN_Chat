/* eslint-disable */

import React, { useState, useContext } from "react";
import ChatScreen from "./ChatScreen";
import { AuthContext } from "../context/AuthContext";

const HomeScreen = (props) => {
  const { isLoggedIn, token, user, loginFunc, logoutFunc } = useContext(
    AuthContext
  );
  const [room, setRoom] = useState("General");
  const handleChange = (e) => {
    setRoom(e.target.value);
  };
  const enterRoom = () => {
    props.history.push(`chat/${room}`);
  };

  // useEffect(() => console.log(room));
  return (
    <div>
      Home Screen _ {user.name}
      <button onClick={logoutFunc}>Logout</button>
      <form>
        <label>
          Rooms:
          <select value={room} onChange={handleChange}>
            <option value="General">General</option>
            <option value="Programming">Programming</option>
            <option value="Video Games">Video Games</option>
            <option value="Music">Music</option>
          </select>
        </label>
      </form>
      <button onClick={enterRoom}>Enter Room</button>
    </div>
  );
};

export default HomeScreen;
