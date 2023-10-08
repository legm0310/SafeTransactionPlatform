import React, { Fragment, useCallback, useEffect } from "react";
import {
  Link,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

import classes from "../../styles/chat/Chat.module.css";
import defaultProfile from "../../assets/defaultProfile.png";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";

const Chats = () => {
  const { roomId } = useParams() ?? { roomId: 0 };
  const [searchParams, setSearchParams] = useSearchParams();
  const { rooms } = useSelector((state) => state.chat);

  const exists = searchParams.get("exists");
  const userId = searchParams.get("user");
  const sellerId = searchParams.get("seller");
  const sellerName = searchParams.get("sellerName");
  const productId = searchParams.get("prod");
  // console.log(rooms?.length, userId, exists, sellerName);
  return (
    <Fragment>
      {rooms?.length === 0 && exists != "false" ? (
        <div className={classes.noneChatRoom}>
          <div className={classes.noneChatRoomImg}>
            <IoChatbubbleEllipsesSharp />
          </div>
          <div className={classes.noneChatRoomText}>
            <p>대화중인 방이 없습니다.</p>
            <p>상품판매자와 대화를 시작해보세요.</p>
          </div>
        </div>
      ) : (
        <div className={classes.chatsWrap}>
          {exists == "false" ? (
            <Link
              to={`/chat/0?exists=false&user=${userId}&seller=${sellerId}&sellerName=${sellerName}&prod=${productId}`}
            >
              <div className={classes.userChat}>
                <img src={defaultProfile} alt="" className={classes.testImg} />
                <div className={classes.userChatInfo}>
                  <span>{sellerName}</span>
                </div>
              </div>
            </Link>
          ) : null}
          {rooms?.map((room) => {
            if (room.chat_participant.self_granted === 0) return;
            return (
              <Link
                key={room.id}
                to={roomId == room.id ? `/chat` : `/chat/${room.id}`}
              >
                <div className={classes.userChat}>
                  <img
                    src={defaultProfile}
                    alt=""
                    className={classes.testImg}
                  />
                  <div className={classes.userChatInfo}>
                    <span>{room.RoomUser[0]?.user_name}</span>
                    <p>
                      {room.chat_logs[0]?.content?.length > 14
                        ? `${room.chat_logs[0]?.content?.substr(0, 15)} ...`
                        : room.chat_logs[0]?.content}
                    </p>
                    <p>읽지 않은 메시지: {room.unreadCount}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </Fragment>
  );
};

export default Chats;
