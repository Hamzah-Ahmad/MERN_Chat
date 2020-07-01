import React from "react";

const ChatBubble = ({ user, message }) => {
  return (
    <div style={styles.chatbubble}>
      <div style={styles.username}>{user}:</div>
      <span style={styles.messageText}>{message}</span>
    </div>
  );
};
const styles = {
  chatbubble: {
    marginBottom: 20,
    padding: 10,
    border: "0.1px solid #33a0ff",
    borderRadius: "5px 20px 5px",
  },
  username: {
    fontSize: 12,
    color: "#808080",
  },
  messageText: {},
};
export default ChatBubble;
