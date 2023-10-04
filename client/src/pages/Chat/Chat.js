import React, { Fragment, useCallback, useEffect, useRef } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Sidebar from "../../components/chat/Sidebar";
import ChatRoom from "../../components/chat/ChatRoom.js";
import { isEqual } from "lodash";

import classes from "../../styles/chat/Chat.module.css";
import { useParams } from "react-router-dom";
import {
  addChat,
  getRooms,
  socketInit,
  updateRecentChats,
} from "../../_actions/chatAction";
import { io } from "socket.io-client";
const Chat = () => {
  const dispatch = useDispatch();
  const { roomId } = useParams() ?? { roomId: 0 };
  const { userId } = useSelector((state) => state.user);
  const { rooms, chats, roomInfo, socket } = useSelector((state) => state.chat);
  const socketRef = useRef(null);
  const roomsRef = useRef(null);

  const fetchRoomData = useCallback(() => {
    dispatch(getRooms());
  }, [dispatch, rooms?.chat_logs?.[0].content, chats?.length]);

  useEffect(() => {
    dispatch(getRooms());
  }, []);

  useEffect(() => {
    if (!userId || !rooms || rooms.length === 0) return;
    // console.log(roomsRef.current, rooms, !isEqual(roomsRef.current, rooms));
    // if (socketRef.current && !isEqual(roomsRef.current, rooms)) {
    //   socketRef.current.disconnect();
    //   socketRef.current = null;
    // }
    if (socketRef.current) return;
    const curSocket = io("localhost:5000", {
      cors: { origin: "*" },
    });
    curSocket.on("connect", () => {
      console.log(rooms);
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
        updateRecentChats({ roomId: roomId, chat: chat, checkRead: false })
      );
    });
    curSocket.on("onReceiveRead", ({ user, chat }) => {});
    socketRef.current = curSocket;
    roomsRef.current = rooms;
    dispatch(socketInit(curSocket));
  }, [rooms]);
  useEffect(() => {
    return () => {
      if (!socketRef.current) return;
      socketRef.current?.disconnect();
      socketRef.current = null;
    };
  }, []);

  return (
    <Fragment>
      <div className={classes.ChatWrap}>
        <div className={classes.container}>
          <Sidebar />
          {!roomId ? null : <ChatRoom />}
        </div>
      </div>
    </Fragment>
  );
};

export default Chat;
