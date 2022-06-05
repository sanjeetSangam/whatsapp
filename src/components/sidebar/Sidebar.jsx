import React, { useEffect, useState } from "react";
import db from "../../firebase/firebase";
import ChatItem from "./chats/ChatItem";
import Navbar from "./navbar/Navbar";
import "./Sidebar.css";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

export const Sidebar = () => {
  const [groups, setGroups] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    db.collection("groups")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setGroups(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            group: doc.data(),
          }))
        )
      );
  }, []);

  const navig = (id) => {
    sessionStorage.setItem("chat_id", JSON.stringify(id));
    navigate(`/${id}`);
  };

  return (
    <div className="sidebar">
      <Navbar />

      <div className="chat__list">
        {groups.map((item) => {
          return (
            <>
              {/* <Link
                key={item.id}
                style={{ textDecoration: "none", color: "black" }}
                to={`/${item.id}`}
              >
                
              </Link> */}

              <div
                className="main__nav"
                key={item.id}
                onClick={() => {
                  navig(item.id);
                }}
              >
                <ChatItem
                  key={item.id}
                  id={item.id}
                  name={item.group.name}
                  icon=""
                />
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};
