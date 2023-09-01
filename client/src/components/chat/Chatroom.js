import React, { Fragment, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import classes from "../../styles/chat/Chat.module.css";
import io from "socket.io-client";

import { IoCamera } from "react-icons/io5";
import { IoMdAttach } from "react-icons/io";
import { IoImage } from "react-icons/io5";
import { LuMoreHorizontal } from "react-icons/lu";
import { IoPersonAdd } from "react-icons/io5";

const socket = io.connect("localhost:5000", {
  cors: { origin: "*" },
});

const Chatroom = () => {
  // const [state, setState] = useState({ message: "", name: "" });
  // const [chat, setChat] = useState([]);
  // const [value, setValue] = useState("");

  // const userId = useSelector((state) => state.user.userId);

  // useEffect(() => {
  //   console.log("User id = ", userId);
  //   socket.on("message", ({ userId, message }) => {
  //     setChat((prevChat) => [...prevChat, { userId, message }]);
  //   });
  // }, []);

  // const onTextChange = (e) => {
  //   setState({ ...state, [e.target.name]: e.currentTarget.value });
  //   setValue(e.target.value);
  // };

  // const onMessageSubmit = (e) => {
  //   e.preventDefault();

  //   const { name, message } = state;
  //   console.log({ userId, message });
  //   console.log(chat);
  //   socket.emit("message", { userId, message });
  //   setState({ message: "", userId });
  // };
  const [state, setState] = useState({ message: "", name: "" });
  const [chat, setChat] = useState([]);

  const userId = useSelector((state) => state.user.userId);

  useEffect(() => {
    console.log("User id = ", userId);
    socket.on("message", ({ userId, message }) => {
      setChat((prevChat) => [...prevChat, { userId, message }]);
    });
  }, []);

  const onTextChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onMessageSubmit = (e) => {
    e.preventDefault();

    const { name, message } = state;
    console.log({ userId, message });
    console.log(chat);
    socket.emit("message", { userId, message });
    setState({ message: "", userId });
  };

  const renderChat = () => {
    return chat.map(({ userId, message }, index) => (
      <div key={index}>
        <h3>
          {userId}:<span>{message}</span>
        </h3>
      </div>
    ));
  };

  return (
    <Fragment>
      {/* <div className={classes.chatRoomWrap}>
        <div className={classes.chatInfo}>
          <span>abc</span>
          <div className={classes.chatIcons}>
            <IoCamera className={classes.icon} />
            <LuMoreHorizontal className={classes.icon} />
            <IoPersonAdd className={classes.icon} />
          </div>
        </div>
        <Messages />
        <button onClick={(e) => onMessageSubmit(e)}>SEND</button>
        <Input
          onTextChange={onTextChange}
          message={state.message}
          onMessageSubmit={onMessageSubmit}
          type="submit"
        />
      </div> */}

      <div className={classes.chatRoomWrap}>
        <div className={classes.chatInfo}>
          <span>abc</span>
          <div className={classes.chatIcons}>
            <IoCamera className={classes.icon} />
            <LuMoreHorizontal className={classes.icon} />
            <IoPersonAdd className={classes.icon} />
          </div>
        </div>

        <div className={classes.messagesWrap}>{renderChat()}</div>

        <form className={classes.inputWrap} onSubmit={onMessageSubmit}>
          <input
            type="text"
            name="message"
            placeholder="메시지를 입력해주세요"
            onChange={(e) => onTextChange(e)}
            value={state.message}
          />

          <div className={classes.send}>
            <button>Send</button>
            <IoMdAttach className={classes.inputIcon} />
            <input type="file" style={{ display: "none" }} id="file" />
            <label htmlFor="file">
              <IoImage className={classes.inputIcon2} />
            </label>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default Chatroom;
