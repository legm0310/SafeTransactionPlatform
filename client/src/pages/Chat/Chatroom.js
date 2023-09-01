import React, { Fragment } from "react";
import classes from "../../styles/chat/Chat.module.css";
import { IoCamera } from "react-icons/io5";
import { LuMoreHorizontal } from "react-icons/lu";
import { IoPersonAdd } from "react-icons/io5";
import Messages from "./Messages";
import Input from "./Input";

const Chatroom = () => {
  return (
    <Fragment>
      <div className={classes.chatRoomWrap}>
        <div className={classes.chatInfo}>
          <span>이승훈</span>
          <div className={classes.chatIcons}>
            <IoCamera className={classes.icon} />
            <LuMoreHorizontal className={classes.icon} />
            <IoPersonAdd className={classes.icon} />
          </div>
        </div>
        <Messages />
        <Input />
      </div>
    </Fragment>
  );
};

export default Chatroom;
