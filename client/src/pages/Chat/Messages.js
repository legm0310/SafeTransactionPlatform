import React, { Fragment } from "react";
import classes from "../../styles/chat/Chat.module.css";
import Message from "./Message";

const Messages = () => {
  return (
    <Fragment>
      <div className={classes.messagesWrap}>
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
      </div>
    </Fragment>
  );
};

export default Messages;
