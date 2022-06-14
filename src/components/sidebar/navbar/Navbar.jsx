import React, { useState, useEffect } from "react";

import { Avatar, Modal } from "@mui/material";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import AutorenewOutlinedIcon from "@mui/icons-material/AutorenewOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import GroupAddIcon from "@mui/icons-material/GroupAdd";

import db from "../../../firebase/firebase";
import firebase from "firebase/compat/app";

import "./navbar.css";
import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [group, setGroup] = useState(undefined);
  const [gotGroups, setGotGroups] = useState([]);
  const navigate = useNavigate();

  const [logout, setLogout] = useState(false);

  const user = useSelector((store) => store.user.user);

  useEffect(() => {
    db.collection("groups").onSnapshot((snapshot) =>
      setGotGroups(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
  }, []);

  const handleSubmit = (a) => {
    a.preventDefault();

    let check = true;
    gotGroups.forEach((e) => {
      if (e.data.name == group) {
        alert(`Group exists ${e.data.name}`);
        check = false;
      }
    });

    if (check) {
      db.collection("groups").add({
        name: group,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }

    setGroup(undefined);
  };

  const signOut = () => {
    localStorage.remove("user");
    navigate("/");
    window.location.reload(false);
  };

  return (
    <div className="navbar">
      <div className="top__nav">
        <div className="div">
          <Avatar src={user.avatar} />
        </div>

        <div className="nav__options">
          <div className="div">
            {" "}
            <AutorenewOutlinedIcon />
          </div>
          <div className="div">
            {" "}
            <ChatOutlinedIcon />
          </div>
          <div className="div">
            {" "}
            <div onClick={() => setLogout(!logout)}>
              <MoreVertOutlinedIcon />
            </div>
            <div
              onClick={signOut}
              className={logout ? "signOut display" : "signOut"}
            >
              <p>Sign out</p>
            </div>
          </div>
        </div>
      </div>

      <div className="search__nav">
        <form action="" onSubmit={handleSubmit}>
          <GroupAddIcon />
          <input
            type="text"
            value={group}
            onChange={(e) => setGroup(e.target.value)}
            placeholder="Add new group"
          />
        </form>
      </div>
    </div>
  );
};

export default Navbar;
