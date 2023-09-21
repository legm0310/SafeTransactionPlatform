import React, { Fragment, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import { TextField } from "@mui/material";
import Sidebar from "../../components/chat/Sidebar";
import ChatRoom from "../../components/chat/ChatRoom";

import classes from "../../styles/chat/Chat.module.css";

const Chat = (props) => {
  return (
    <Fragment>
      <div className={classes.ChatWrap}>
        <div className={classes.container}>
          <Sidebar />
          <ChatRoom />
        </div>
      </div>
    </Fragment>
  );
};

export default Chat;
