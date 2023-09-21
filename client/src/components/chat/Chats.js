import React, { Fragment, useEffect } from "react";
import classes from "../../styles/chat/Chat.module.css";
import test from "../../assets/test.jpg";
import { useSelector, useDispatch } from "react-redux";
import { getRooms } from "../../_actions/chatAction";

const Chats = () => {
  const dispatch = useDispatch();
  const { rooms } = useSelector((state) => state.chat);
  useEffect(() => {
    dispatch(getRooms());
  }, []);
  console.log(rooms);
  return (
    <Fragment>
      <div className={classes.chatsWrap}>
        {rooms?.map((room) => (
          <div key={room.id} className={classes.userChat}>
            <img src={test} alt="" className={classes.testImg} />
            <div className={classes.userChatInfo}>
              <span>{room.RoomUser[0].user_name}</span>
              <p>{room.chat_logs[0].message}</p>
              <p>읽지 않은 메시지: {room.unreadCount}</p>
            </div>
          </div>
        ))}

        <div className={classes.userChat}>
          <img src={test} alt="" className={classes.testImg} />
          <div className={classes.userChatInfo}>
            <span>이승훈</span>
            <p>Hello</p>
          </div>
        </div>

        <div className={classes.userChat}>
          <img src={test} alt="" className={classes.testImg} />
          <div className={classes.userChatInfo}>
            <span>김준현</span>
            <p>Hello</p>
          </div>
        </div>

        <div className={classes.userChat}>
          <img src={test} alt="" className={classes.testImg} />
          <div className={classes.userChatInfo}>
            <span>이규민</span>
            <p>Hello</p>
          </div>
        </div>

        <div className={classes.userChat}>
          <img src={test} alt="" className={classes.testImg} />
          <div className={classes.userChatInfo}>
            <span>성우상</span>
            <p>Hello</p>
          </div>
        </div>

        <div className={classes.userChat}>
          <img src={test} alt="" className={classes.testImg} />
          <div className={classes.userChatInfo}>
            <span>전준영</span>
            <p>Hello</p>
          </div>
        </div>

        <div className={classes.userChat}>
          <img src={test} alt="" className={classes.testImg} />
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
