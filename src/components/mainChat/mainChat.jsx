import { Link } from "@mui/material";
import ChatBox from "../Right/chatBox/ChatBox";
import { Right } from "../Right/Right";

import { Routes, Route } from "react-router-dom";

import "./main.css";

const Main = () => {
  return (
    <div className="main__chat">
      <Routes>
        <Route path="/" element={<Right />} />
        <Route path="/:id" element={<ChatBox />} />
      </Routes>
    </div>
  );
};

export default Main;
