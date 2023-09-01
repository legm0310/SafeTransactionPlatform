import React, { Fragment, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import { TextField } from "@mui/material";
import Sidebar from "./Sidebar";
import Chatroom from "./Chatroom";

import classes from "../../styles/chat/Chat.module.css";

const socket = io.connect("http://localhost:5000");

const Chat = (props) => {
  // const [state, setState] = useState({ message: "", name: "" });
  // const [chat, setChat] = useState([]);

  // const userId = useSelector((state) => state.user.userId);

  // useEffect(() => {
  //   console.log("User id = ", userId);
  //   socket.on("message", ({ userId, message }) => {
  //     setChat((prevChat) => [...prevChat, { userId, message }]);
  //   });
  // }, []);

  // const onTextChange = (e) => {
  //   setState({ ...state, [e.target.name]: e.target.value });
  // };

  // const onMessageSubmit = (e) => {
  //   e.preventDefault();

  //   const { name, message } = state;
  //   console.log({ userId, message });
  //   console.log(chat);
  //   socket.emit("message", { userId, message });
  //   setState({ message: "", userId });
  // };

  // const renderChat = () => {
  //   return chat.map(({ userId, message }, index) => (
  //     <div key={index}>
  //       <h3>
  //         {userId}:<span>{message}</span>
  //       </h3>
  //     </div>
  //   ));
  // };

  return (
    <Fragment>
      {/* <div className={classes.outerContainer}>
        <div className="card">
          <form onSubmit={onMessageSubmit}>
            <h1>Message</h1>
            <div>
              <TextField
                name="message"
                onChange={(e) => onTextChange(e)}
                value={state.message}
                id="outlined-multiline-static"
                variant="outlined"
                label="Message"
              />
            </div>
            <button>Send Message</button>
          </form>
          <div className="render-chat">
            <h1>Chat log</h1>
            {renderChat()}
          </div>
        </div>
      </div> */}
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
