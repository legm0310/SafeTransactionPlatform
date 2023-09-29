import React, { Fragment, useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { io } from "socket.io-client";
import { addChat, getChats } from "../../_actions/chatAction";

import classes from "../../styles/chat/Chat.module.css";
import { useSnackbar } from "notistack";
import { IoCamera, IoImage, IoPersonAdd } from "react-icons/io5";
import { IoMdAttach } from "react-icons/io";
import { LuMoreHorizontal } from "react-icons/lu";

const ChatRoom = () => {
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();
  const { roomId } = useParams();
  const { userData } = useSelector((state) => state.user.authCheck);
  const { chats } = useSelector((state) => state.chat);

  const [state, setState] = useState({ message: "", name: "" });
  const [chat, setChat] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!userData) return;

    const curSocket = io("localhost:5000", {
      cors: { origin: "*" },
    });
    setSocket(curSocket);

    curSocket.on("connect", () => {
      curSocket.emit("onJoinRoom", roomId);
    });
    curSocket.on("onRead", () => {});
    curSocket.on("onReceive", ({ user, chat }) => {
      dispatch(
        addChat({
          id: Date.now(),
        })
      );
    });
    // console.log(chatWrapRef.current.scrollTop);
    console.log("before", roomId);
    if (roomId) {
      const body = {
        roomId: roomId,
        lastId: -1,
        limit: 20,
      };
      dispatch(getChats(body)).then(() => console.log(roomId, chats));
    }
    // console.log(roomId, chats);

    return () => {
      curSocket.disconnect();
    };
  }, [dispatch, roomId]);

  const chatWrapRef = useRef();

  return (
    <Fragment>
      <div className={classes.chatRoomWrap}>
        <div className={classes.chatInfo}>
          <span>abc</span>
          <div className={classes.chatIcons}>
            <IoCamera className={classes.icon} />
            <LuMoreHorizontal className={classes.icon} />
            <IoPersonAdd className={classes.icon} />
          </div>
        </div>

        <div ref={chatWrapRef} className={classes.messagesWrap}></div>

        {/* <form className={classes.inputWrap} onSubmit={onMessageSubmit}> */}
        <form className={classes.inputWrap}>
          <input
            type="text"
            name="message"
            placeholder="메시지를 입력해주세요"
            // onChange={(e) => onTextChange(e)}
            onChange={null}
            // value={state.message}
            value={null}
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

export default ChatRoom;

// const onTextChange = (e) => {
//   setState({ ...state, [e.target.name]: e.target.value });
// };

// let body = {
//   content: state.message,
//   check_read: 1,
//   sender_id: userId,
//   room_id: roomId,
// };

// const onMessageSubmit = (e) => {
//   e.preventDefault();

//   if (state.message.trim() === "") {
//     enqueueSnackbar("메세지를 입력해주세요.", {
//       variant: "error",
//     });
//     return;
//   }

//   const { name, message } = state;
//   console.log({ userId, message });

//   dispatch(addChat(body)).then((response) => {
//     console.log(response);
//     if (response.payload.addMessageSuccess) {
//       console.log({ userId, message });
//     } else {
//       enqueueSnackbar("메세지 전송에 실패했습니다.", {
//         variant: "error",
//       });
//       return;
//     }
//   });

//   socket?.emit("message", { userId, message });
//   setState({ message: "", userId });
// };

// const renderChat = () => {
//   // return chat.map(({ userId, message }, index) => (
//   //   <div key={index}>
//   //     <h3>
//   //       {userId}:<span>{message}</span>
//   //     </h3>
//   //   </div>
//   // ));
// };
