import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import db from "../../../firebase/firebase";
import "./chats.css";

const ChatItem = ({ name, id, icon }) => {
  const [lastMsg, setLastMsg] = useState("");

  useEffect(() => {
    if (id) {
      db.collection("groups")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setLastMsg(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, []);

  return (
    <div className="chat__item">
      <div className="profile__chat">
        <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8WAEy3go78Kj6HceFaZG9awgF4NGOoxOKrTXJZz7E8hyj7FXgKfBv8ynDky4zsvh-wnI&usqp=CAU" />
        <div className="name__chat">
          <h4>{name}</h4>
          <p>{lastMsg[0]?.message}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatItem;
