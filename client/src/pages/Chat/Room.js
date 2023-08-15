import { Fragment } from "react";
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import Chat from "./Chat";

import classes from "../../styles/chat/Room.module.css";
const socket = io.connect("http://localhost:5000");

const Room = (props) => {
  return (
    <Fragment>
      <div className={classes.outerContainer}>
        <div className={classes.container}>Room</div>
        <div className={classes.container}>
          <Chat />
        </div>
      </div>
    </Fragment>
  );
};

export default Room;
