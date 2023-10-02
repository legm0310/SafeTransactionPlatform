import React, { Fragment, useCallback, useEffect, useRef } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Sidebar from "../../components/chat/Sidebar";
import ChatRoom from "../../components/chat/ChatRoom.js";

import classes from "../../styles/chat/Chat.module.css";
import { useParams } from "react-router-dom";
import {
  addChat,
  getChats,
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
  // const isChatPageLoading = useSelector((state) => state.ui.isChatPageLoading);
  // const isChatLoading = useSelector((state) => state.ui.isChatLoading);
  const fetchRoomData = useCallback(() => {
    dispatch(getRooms());
  }, [dispatch, rooms?.length, rooms?.chat_logs?.[0].content, chats?.length]);

  const fetchChatData = useCallback(() => {
    dispatch(
      getChats({
        roomId: roomId,
        lastId: -1,
        limit: 20,
      })
    );
  }, [chats?.length, roomId]);

  useEffect(() => {
    dispatch(getRooms());
  }, [dispatch]);
  // }, [dispatch, fetchRoomData]);

  // useEffect(() => {
  //   console.log(roomId);
  //   if (roomId && roomId != roomInfo?.roomId) {
  //     fetchChatData();
  //   }
  // }, [dispatch, fetchChatData]);

  useEffect(() => {
    if (!userId) return;
    console.log(socketRef.current);
    if (!socketRef.current) {
      const curSocket = io("localhost:5000", {
        cors: { origin: "*" },
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
            sender_id: roomInfo.partner.id,
            user: {
              id: roomInfo.partner.id,
              user_name: roomInfo.partner.user_name,
            },
          })
        );
        console.log("업데이트가 될것이다");
        dispatch(updateRecentChats({ roomId: roomId, chat: chat }));
      });
      curSocket.on("onReceiveRead", ({ user, chat }) => {});
      curSocket.on("onUpdateRecentChat", ({ roomId, chat }) => {
        console.log("이건 따로 핸들러를 또 만들었음");
        dispatch(updateRecentChats({ roomId: roomId, chat: chat }));
      });
      socketRef.current = curSocket;
      dispatch(socketInit(curSocket));
    }
    // return () => {
    //   socketRef.current?.disconnect();
    //   socketRef.current = null;
    // };
  }, [dispatch]);

  return (
    <Fragment>
      {/* {false ? null : ( */}
      <div className={classes.ChatWrap}>
        <div className={classes.container}>
          <Sidebar />
          {!roomId ? null : <ChatRoom />}
        </div>
      </div>
      {/* )} */}
    </Fragment>
  );
};

export default Chat;
