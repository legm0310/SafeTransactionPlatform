import React, { Fragment, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getRooms } from "../../_actions/chatAction";

import classes from "../../styles/chat/Chat.module.css";
import defaultProfile from "../../assets/defaultProfile.png";

const Chats = () => {
  const dispatch = useDispatch();
  const { rooms } = useSelector((state) => state.chat);
  const { userId } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getRooms());
  }, [dispatch]);
  console.log(rooms);
  return (
    <Fragment>
      <div className={classes.chatsWrap}>
        {rooms?.map((room) => (
          <Link key={room.id} to={`/chat/${room.id}`}>
            <div className={classes.userChat}>
              <img src={defaultProfile} alt="" className={classes.testImg} />
              <div className={classes.userChatInfo}>
                <span>{room.RoomUser[0].user_name}</span>
                <p>{room.chat_logs[0].content}</p>
                <p>읽지 않은 메시지: {room.unreadCount}</p>
              </div>
            </div>
          </Link>
        ))}

        <div className={classes.userChat}>
          <img src={defaultProfile} alt="" className={classes.testImg} />
          <div className={classes.userChatInfo}>
            <span>이승훈</span>
            <p>Hello</p>
          </div>
        </div>

        <div className={classes.userChat}>
          <img src={defaultProfile} alt="" className={classes.testImg} />
          <div className={classes.userChatInfo}>
            <span>김준현</span>
            <p>Hello</p>
          </div>
        </div>

        <div className={classes.userChat}>
          <img src={defaultProfile} alt="" className={classes.testImg} />
          <div className={classes.userChatInfo}>
            <span>이규민</span>
            <p>Hello</p>
          </div>
        </div>

        <div className={classes.userChat}>
          <img src={defaultProfile} alt="" className={classes.testImg} />
          <div className={classes.userChatInfo}>
            <span>성우상</span>
            <p>Hello</p>
          </div>
        </div>

        <div className={classes.userChat}>
          <img src={defaultProfile} alt="" className={classes.testImg} />
          <div className={classes.userChatInfo}>
            <span>전준영</span>
            <p>Hello</p>
          </div>
        </div>

        <div className={classes.userChat}>
          <img src={defaultProfile} alt="" className={classes.testImg} />
          <div className={classes.userChatInfo}>
            <span>최병준</span>
            <p>Hello</p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Chats;
