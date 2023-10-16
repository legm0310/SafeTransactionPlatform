import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Sidebar from "../../components/Chat/Sidebar";
import ChatRoom from "../../components/Chat/ChatRoom.js";
import { isEqual } from "lodash";

import classes from "../../styles/chat/Chat.module.css";
import { useLocation, useParams } from "react-router-dom";
import {
  addChat,
  deleteRoom,
  getRooms,
  socketInit,
  updateRecentChats,
} from "../../_actions/chatAction";
import { io } from "socket.io-client";
const Chat = () => {
  const apiBaseUrl =
    process.env.REACT_APP_API_BASE_URL.length > 0
      ? process.env.REACT_APP_API_BASE_URL
      : "localhost:5000";
  const location = useLocation();
  const dispatch = useDispatch();
  const { roomId } = useParams() ?? { roomId: 0 };
  const { rooms } = useSelector((state) => state.chat);
  const socketRef = useRef(null);
  const roomsRef = useRef(null);

  useEffect(() => {
    // if (isEqual(rooms, roomsRef.current)) return;
    if (roomId != 0) dispatch(getRooms());
    if (!socketRef.current) {
      const curSocket = io(apiBaseUrl, {
        withCredentials: true,
        transports: ["websocket"],
      });
      curSocket.on("connect", () => {
        rooms?.forEach((room) => curSocket?.emit("onJoinRoom", room.id));
      });
      curSocket.on("onReceiveSend", ({ user, chat, roomId }) => {
        dispatch(
          addChat({
            check_read: false,
            content: chat,
            createdAt: new Date().toString(),
            updatedAt: new Date().toString(),
            type: "text",
            id: Date.now(),
            room_id: roomId,
            sender_id: user.id,
            user: {
              id: user.id,
              user_name: user.name,
            },
          })
        );
        dispatch(
          updateRecentChats({
            oneSelf: false,
            roomId: roomId,
            chat: chat,
            checkRead: false,
          })
        );
      });
      // curSocket.on("onReceiveRead", ({ user, chat }) => {});
      socketRef.current = curSocket;
      roomsRef.current = rooms;
      dispatch(socketInit(curSocket));
    }
    return () => {
      if (!socketRef.current) return;
      socketRef.current.off("onReceiveSend");
      socketRef.current.off("onReceiveRead");
      socketRef.current.disconnect();
      socketRef.current = null;
    };
  }, [location.pathname]);

  return (
    <Fragment>
      <div className={classes.ChatWrap}>
        <div className={classes.container}>
          <Sidebar />
          {!roomId && roomId != 0 ? null : <ChatRoom />}
        </div>
      </div>
    </Fragment>
  );
};

export default Chat;
