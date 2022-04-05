import React, { useEffect, useState } from "react";
import db from "../../firebase/firebase";
import ChatItem from "./chats/ChatItem";
import Navbar from "./navbar/Navbar";
import "./Sidebar.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [groups, setGroups] = useState([]);

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

  return (
    <div className="sidebar">
      <Navbar />

      <div className="chat__list">
        {groups.map((item) => {
          return (
            <>
              <Link
                key={item.id}
                style={{ textDecoration: "none", color: "black" }}
                to={`/${item.id}`}
              >
                <ChatItem
                  key={item.id}
                  id={item.id}
                  name={item.group.name}
                  icon=""
                />
              </Link>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
