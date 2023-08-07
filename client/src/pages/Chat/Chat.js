import { Fragment } from "react";
import React, { useState, useEffect } from "react";
import io from "socket.io-client";

import classes from "../../styles/chat/Chat.module.css";
const socket = io.connect("http://localhost:5000");

const Chat = (props) => {
  return <Fragment>Chat</Fragment>;
};

export default Chat;
