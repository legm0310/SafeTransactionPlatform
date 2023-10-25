import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../components/Chat/Sidebar";
import ChatRoom from "../../components/Chat/ChatRoom.js";
import {
  addChat,
  getChats,
  getRooms,
  readChats,
  socketInit,
  updateRecentChats,
} from "../../_actions/chatAction";
import { io } from "socket.io-client";

import classes from "../../styles/chat/Chat.module.css";
const Chat = () => {
  const apiBaseUrl =
    process.env.REACT_APP_API_BASE_URL.length > 0
      ? process.env.REACT_APP_API_BASE_URL
      : "localhost:5000";
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { roomId } = useParams() ?? { roomId: 0 };
  const { rooms } = useSelector((state) => state.chat);
  const { userId } = useSelector((state) => state.user);
  const socketRef = useRef(null);
  const roomsRef = useRef(null);
  const joinRoom = rooms?.filter(
    (room) => room.chat_participant.self_granted === 1
  );

  useEffect(() => {
    console.log(roomId);
    try {
      fetchRoomsAndChats();
    } catch (err) {
      return err.payload.code === 401 ? navigate("/login") : console.log(err);
    }
    return () => {
      if (!socketRef.current) return;
      socketRef.current.off("connect");
      socketRef.current.off("onReceiveSend");
      socketRef.current.disconnect();
      socketRef.current = null;
    };
  }, [location.pathname]);

  const fetchRoomsAndChats = async () => {
    const roomData = await dispatch(getRooms());

    //socket연결 및 이벤트 정의
    if (!socketRef.current) {
      const curSocket = await io(apiBaseUrl, {
        withCredentials: true,
        transports: ["websocket"],
        query: { userId: userId },
      });

      curSocket.on("connect", () => {
        roomData?.payload.rooms?.forEach((room) =>
          curSocket?.emit("onJoinRoom", room.id)
        );
      });
      curSocket.on("onClientJoinRoom", (roomId) => {
        curSocket?.emit("onJoinRoom", roomId);
      });
      curSocket.on("onReceiveSend", ({ user, chat, roomId, allOnline }) => {
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
            checkRead: allOnline ?? false,
          })
        );
      });

      curSocket.on(
        "updateSellerRoom",
        ({ buyer, chat, roomId, selfGranted }) => {
          dispatch(
            updateRecentChats({
              buyer: buyer,
              roomId: roomId,
              chat: chat,
              selfGranted: selfGranted,
            })
          );
        }
      );

      socketRef.current = curSocket;
      roomsRef.current = rooms;
      await dispatch(socketInit(curSocket));

      //채팅방 접속 시 채팅 가져오기
      if (roomId && roomId != 0) {
        await socketRef.current.emit("activeRoom", userId, roomId);
        const body = {
          roomId: roomId,
          lastId: -1,
          limit: 20,
        };
        await socketRef.current.emit("onRead", { userId, roomId }, async () => {
          await dispatch(readChats({ userId, roomId }));
          await dispatch(getChats(body));
        });
      }
    }
  };

  return (
    <Fragment>
      <div className={classes.ChatWrap}>
        <div className={classes.container}>
          <Sidebar />
          {!roomId || (joinRoom?.length === 0 && roomId != 0) ? null : (
            <ChatRoom />
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Chat;
