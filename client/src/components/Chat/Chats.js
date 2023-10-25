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

const Chats = ({ searchRoomName }) => {
  const { roomId } = useParams() ?? { roomId: 0 };
  const [searchParams, setSearchParams] = useSearchParams();
  const { rooms, chats } = useSelector((state) => state.chat);

  const exists = searchParams.get("exists");
  const userId = searchParams.get("user");
  const sellerId = searchParams.get("seller");
  const sellerName = searchParams.get("sellerName");
  const productId = searchParams.get("prod");
  const filteredJoinRooms = rooms?.filter((room) => {
    return (
      room.chat_participant.self_granted === 1 &&
      room.RoomUser[0]?.user_name.includes(searchRoomName)
    );
  });

  return (
    <Fragment>
      {filteredJoinRooms?.length === 0 && exists != "false" ? (
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
                <img src={defaultProfile} alt="" />

                <div className={classes.userChatInfo}>
                  <span>{sellerName}</span>
                </div>
              </div>
            </Link>
          ) : null}
          {filteredJoinRooms?.map((room) => {
            const latestChat =
              new Date(room?.chat_participant.updatedAt) <=
                new Date(room?.chat_logs[0].createdAt) &&
              room?.chat_logs[0]?.content;
            return (
              <Link
                key={room.id}
                to={roomId == room?.id ? `/chat` : `/chat/${room?.id}`}
              >
                <div className={classes.userChat}>
                  <img
                    src={defaultProfile}
                    alt=""
                    className={classes.testImg}
                  />
                  <div className={classes.userChatInfo}>
                    <div className={classes.userChatInfoTop}>
                      <span>{room?.RoomUser[0]?.user_name}</span>

                      <div className={classes.unreadCountText}>
                        <p>
                          {+room?.unreadCount !== 0 ? room?.unreadCount : null}
                        </p>
                      </div>
                    </div>

                    <p>
                      {latestChat?.length > 9
                        ? `${latestChat?.substr(0, 10)} ...`
                        : latestChat}
                    </p>
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
