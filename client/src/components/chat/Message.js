import React, { Fragment } from "react";
import classes from "../../styles/chat/Chat.module.css";

const Message = () => {
  return (
    <Fragment>
      <div className={classes.messageWrap}>
        <div className={classes.messageInfo}></div>
        <div className={classes.messageContent}></div>
      </div>
    </Fragment>
  );
};

export default Message;
