import { useState } from "react";
import ChatBox from "./chatBox/ChatBox";
import "./Right.css";

export const Right = () => {
  return (
    <div id="rightDiv">
      <div id="rightCon">
        <div id="forImg">
          <img
            src="https://www.freepnglogos.com/uploads/whatsapp-logo-png-hd-2.png"
            alt=""
          />
        </div>
        <div id="kee">Keep Your Phone Connected</div>
        <br />
        <div className="con">
          WhatsApp connects to your phone to sync messages. To reduce data
          usage, connect your phone to Wi-Fi.
        </div>
        <br />
        <hr />
        <br />
        <div className="con">
          Make calls from desktop with WhatsApp for Windows.
          <a id="llink" href="https://www.whatsapp.com/download">
            Get it here
          </a>
        </div>
      </div>
    </div>
  );
};
