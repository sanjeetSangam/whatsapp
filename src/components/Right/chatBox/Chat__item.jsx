import React from "react";
import "./chatItem.css";

const Chat__item = ({ sender, message, timestamp, type }) => {
  return (
    <div className={type ? "item__chat sent" : "item__chat"}>
      <p>{sender}</p>
      <div className={type ? "chat__message user" : "chat__message"}>
        <h3>{message}</h3>
        <p>{new Date(timestamp?.toDate()).toUTCString()}</p>
      </div>
    </div>
  );
};

export default Chat__item;
