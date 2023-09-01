import React, { Fragment } from "react";
import classes from "../../styles/chat/Chat.module.css";
import { IoMdAttach } from "react-icons/io";
import { IoImage } from "react-icons/io5";

const Input = ({ message, onMessageSubmit, onTextChange }) => {
  return (
    <Fragment>
      <div className={classes.inputWrap}>
        <input
          type="text"
          placeholder="메시지를 입력해주세요"
          value={message}
          onChange={(e) => onTextChange(e)}
          onKeyDown={(e) => (e.key === "Enter" ? onMessageSubmit(e) : null)}
        />
        <div className={classes.send}>
          <IoMdAttach className={classes.inputIcon} />
          <input type="file" style={{ display: "none" }} id="file" />
          <label htmlFor="file">
            <IoImage className={classes.inputIcon2} />
          </label>
          {/* <button>Send</button> */}
        </div>
      </div>
    </Fragment>
  );
};

export default Input;
