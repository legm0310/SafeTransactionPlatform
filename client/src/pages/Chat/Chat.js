import React, { Fragment, useState, useEffect } from "react";
import io from "socket.io-client";
import Sidebar from "./Sidebar";
import Chatroom from "./Chatroom";

import classes from "../../styles/chat/Chat.module.css";

const socket = io.connect("http://localhost:5000");

const Chat = (props) => {
  return (
    <Fragment>
      <div className={classes.ChatWrap}>
        <div className={classes.container}>
          <Sidebar />
          <Chatroom />
        </div>
      </div>
    </Fragment>
  );
};

export default Chat;
