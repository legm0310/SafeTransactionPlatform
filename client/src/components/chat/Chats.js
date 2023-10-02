import React, { Fragment, useCallback, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { getRooms } from "../../_actions/chatAction";

import classes from "../../styles/chat/Chat.module.css";
import defaultProfile from "../../assets/defaultProfile.png";

const Chats = () => {
  console.log("chatRender");
  const dispatch = useDispatch();
  const { rooms } = useSelector((state) => state.chat);
  const { userId } = useSelector((state) => state.user, shallowEqual);
  const { authCheck } = useSelector((state) => state.user, shallowEqual);
  const { roomId } = useParams() ?? { roomId: 0 };

  // useEffect(() => {
  //   if (!userId) return;
  //   if (!rooms || rooms.length === 0) dispatch(getRooms());
  // }, [dispatch]);

  return (
    <Fragment>
      <div className={classes.chatsWrap}>
        {rooms?.map((room) => (
          <Link
            key={room.id}
            to={roomId == room.id ? `/chat` : `/chat/${room.id}`}
          >
            <div className={classes.userChat}>
              <img src={defaultProfile} alt="" className={classes.testImg} />
              <div className={classes.userChatInfo}>
                <span>{room.RoomUser[0].user_name}</span>
                <p>
                  {room.chat_logs[0].content.length > 14
                    ? `${room.chat_logs[0].content.substr(0, 15)} ...`
                    : room.chat_logs[0].content}
                </p>
                <p>읽지 않은 메시지: {room.unreadCount}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Fragment>
  );
};

export default Chats;
