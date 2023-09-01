import React, { Fragment } from "react";
import classes from "../../styles/chat/Chat.module.css";
import test from "../../assets/test.jpg";

const Chats = () => {
  return (
    <Fragment>
      <div className={classes.chatsWrap}>
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
