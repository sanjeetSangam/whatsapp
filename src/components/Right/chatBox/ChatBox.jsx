import React, { useEffect, useState } from "react";

import "./chatbox.css";

import { ChatPage } from "./ChatPage/Chatpage";

import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import AttachmentIcon from "@mui/icons-material/Attachment";
import MicIcon from "@mui/icons-material/Mic";

import Chat__item from "./Chat__item";

import { useParams } from "react-router-dom";

import db from "../../../firebase/firebase";
import firebase from "firebase/compat/app";
import { useSelector } from "react-redux";

import ReactScrollableFeed from "react-scrollable-feed";

const ChatBox = () => {
  const [massageType, setMassageType] = useState(true);
  const [massageData, setMassageData] = useState([]);
  const [message, setMessage] = useState("");
  const [data, setData] = useState({});
  const { id } = useParams();

  let user = useSelector((store) => store.user.user);
  // console.log(user);

  useEffect(async () => {
    if (id) {
      db.collection("groups")
        .doc(id)
        .onSnapshot((snapshot) => setData(snapshot.data()));
    }

    db.collection("groups")
      .doc(id)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) =>
        setMassageData(snapshot.docs.map((doc) => doc.data()))
      );
  }, [id]);

  useEffect(() => {
    console.log(massageData);
  }, []);

  function sendMessage(e) {
    e.preventDefault();
    // console.log(message);
    let messageBody = {
      message: message,
      name: user.name,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    };

    db.collection("groups").doc(id).collection("messages").add(messageBody);

    setMessage("");
  }

  return (
    <div className="chatBox">
      <ChatPage
        name={data.name}
        lastSeen={
          massageData.length === 0
            ? false
            : new Date(
                massageData[massageData.length - 1]?.timestamp?.toDate()
              ).toUTCString()
        }
      />

      <div className="chat__content">
        <ReactScrollableFeed>
          {massageData.map((msg) => (
            <Chat__item
              key={msg.timestamp}
              message={msg.message}
              sender={msg.name}
              timestamp={msg.timestamp}
              type={msg.name === user.name ? massageType : false}
            />
          ))}
        </ReactScrollableFeed>
      </div>

      <div className="chat__input">
        <div className="chat__emoji">
          <div>
            <SentimentDissatisfiedIcon />
          </div>
          <div>
            <AttachmentIcon />
          </div>
        </div>

        <form action="" onSubmit={sendMessage}>
          <input
            type="text"
            placeholder="Send message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </form>

        <div className="chat__mic">
          <MicIcon />
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
