import { Avatar } from "@mui/material";
import "./ChatPage.css";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

export const ChatPage = ({ name, lastSeen }) => {
  return (
    <div id="navlike">
      <div id="navL">
        <div>
          <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8WAEy3go78Kj6HceFaZG9awgF4NGOoxOKrTXJZz7E8hyj7FXgKfBv8ynDky4zsvh-wnI&usqp=CAU"></Avatar>
        </div>

        <div>
          <div id="naam">{name}</div>
          <div id="lastSee">
            {lastSeen ? `Last seen on ${lastSeen} ` : "Start new chat"}
          </div>
        </div>
      </div>

      <div id="navR">
        <div>
          <SearchOutlinedIcon></SearchOutlinedIcon>
        </div>
        <div>
          <MoreVertOutlinedIcon></MoreVertOutlinedIcon>
        </div>
      </div>
    </div>
  );
};
