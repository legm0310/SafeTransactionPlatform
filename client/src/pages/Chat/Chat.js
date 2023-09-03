import React, { Fragment, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import { TextField } from "@mui/material";
import Sidebar from "../../components/chat/Sidebar";
import Chatroom from "../../components/chat/Chatroom";

import classes from "../../styles/chat/Chat.module.css";

// const socket = io.connect("http://localhost:5000");

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
