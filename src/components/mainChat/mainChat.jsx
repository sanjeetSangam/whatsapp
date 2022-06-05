import { Link } from "@mui/material";
import { ChatBox } from "../Right/chatBox/ChatBox";
import { Right } from "../Right/Right";

import { Routes, Route } from "react-router-dom";

import "./main.css";

import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();

  // if (window.location.reload()) {
  //   navigate("/");
  // }

  return (
    <div className="main__chat">
      <Routes>
        <Route path="/" element={<Right />} />
        <Route path="/:chat_id" element={<ChatBox />} />
      </Routes>
    </div>
  );
};

export default Main;
