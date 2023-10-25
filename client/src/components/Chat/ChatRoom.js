import React, {
  Fragment,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import {
  useParams,
  useNavigate,
  useLocation,
  useSearchParams,
  Link,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import {
  addChat,
  deleteRoom,
  loadMoreChats,
  updateRecentChats,
} from "../../_actions/chatAction";
import { dateOrTimeFormatForChat, dateFormat } from "../../utils/dataParse";

import classes from "../../styles/chat/Chat.module.css";
import { useSnackbar } from "notistack";
import { IoChatbubbleEllipsesSharp, IoImage } from "react-icons/io5";
import { IoMdAttach } from "react-icons/io";
import { TbLogout } from "react-icons/tb";

const ChatRoom = () => {
  const { closeSnackbar, enqueueSnackbar } = useSnackbar();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { roomId } = useParams() ?? { roomId: 0 };
  const [searchParams, setSearchParams] = useSearchParams();
  const { userId, authCheck } = useSelector((state) => state.user);
  const { chats, roomInfo, socket, hasMoreChatLoad } = useSelector(
    (state) => state.chat
  );
  const isChatLoading = useSelector((state) => state.ui.isChatLoading);

  const chatRef = useRef(null);
  const buttonRef = useRef(null);
  const chatWrapRef = useRef(null);
  const [chat, setChat] = useState("");

  const { sellerId, sellerName } = sellerInfo();

  function sellerInfo() {
    let sellerId, sellerName;
    if (roomInfo?.roomId == roomId && roomInfo?.partner) {
      sellerId = roomInfo.partner.id;
      sellerName = roomInfo.partner.user_name;
    } else {
      sellerId = +roomId === 0 ? searchParams.get("seller") : null;
      sellerName = +roomId === 0 ? searchParams.get("sellerName") : null;
    }
    return { sellerId, sellerName };
  }

  const onChatHandler = (e) => {
    setChat(e.currentTarget.value);
  };

  //채팅방 입장 시 초기 데이터 로드
  useEffect(() => {
    if (roomId && roomId != 0) {
      if (!chatWrapRef.current) return;
      chatWrapRef.current.scrollTop = chatWrapRef.current?.scrollHeight;
    }
    return () => {
      socket?.emit("DeactiveRoom", userId);
    };
  }, [location.pathname, roomId]);

  useEffect(() => {
    if (!chatWrapRef.current) return;
    const curScrollTop = chatWrapRef.current?.scrollTop;
    const curScrollHeight = chatWrapRef.current?.scrollHeight;
    const curClientHeight = chatWrapRef.current?.clientHeight;
    if (curScrollHeight - (curScrollTop + curClientHeight) <= 350)
      chatWrapRef.current.scrollTop = chatWrapRef.current?.scrollHeight;
  }, [chats]);
  //무한 스크롤
  const target = useInfiniteScroll(async (entry, observer) => {
    if (chatWrapRef?.current.scrollTop == 0)
      return (chatWrapRef.current.scrollTop =
        chatWrapRef.current?.scrollHeight);
    if (isChatLoading || roomId == 0) return;
    dispatch(loadMoreChats({ roomId: roomId, lastId: chats[0].id, limit: 20 }));
    chatWrapRef.current.scrollTop = 1200;
  });

  // 채팅 전송 핸들러
  const onSubmitHandler = useCallback(
    async (e) => {
      e.preventDefault();
      if (!userId) return;
      if (chat.trim() === "")
        return enqueueSnackbar("메세지를 입력해주세요.", {
          variant: "error",
        });
      if (chat.length > 200)
        return enqueueSnackbar(
          `최대 200자까지 가능합니다. (현재 ${chat.length}자)`,
          {
            variant: "error",
          }
        );
      //채팅방 미생성 상태 시
      if (roomId == 0) {
        const newRoomId = await onAddRoomAndSend();
        console.log(newRoomId);
        if (!newRoomId) {
          enqueueSnackbar(`관리자에게 문의하세요`, {
            variant: "error",
          });
        }
        return navigate(`/chat/${newRoomId}`);
      }
      //이미 채팅방이 생성되어있을 시
      return onSendChat(roomId, chat);
    },
    [userId, socket, dispatch, chat, setChat]
  );

  // 첫 채팅 전송 시 채팅방 생성 및 채팅 전송
  const onAddRoomAndSend = async () => {
    const body = {
      seller: {
        id: searchParams.get("seller"),
        name: searchParams.get("sellerName"),
      },
      buyer: {
        id: searchParams.get("user"),
        name: authCheck?.userData.user_name,
      },
      roomName: `${searchParams.get("user")}_${searchParams.get("seller")}`,
      chat: chat,
    };
    console.log(body);
    return new Promise((resolve, reject) => {
      socket?.emit("onAddRoomAndSend", body, (res) => {
        if (res.result === "createdRoom" || res.result === "updatedRoom") {
          setChat("");
          resolve(res.roomId);
        } else {
          console.log(res);
          reject(res.error);
        }
      });
    });
  };

  // 채팅 전송 함수
  const onSendChat = (roomId, chat) => {
    socket?.emit("onSend", {
      user: {
        id: userId,
        name: authCheck.userData?.user_name,
      },
      receiver: {
        id: roomInfo?.partner.id,
        name: roomInfo.partner.user_name,
      },
      roomId: roomId,
      chat,
    });
    dispatch(
      addChat({
        check_read: true,
        content: chat,
        createdAt: new Date().toString(),
        updatedAt: new Date().toString(),
        type: "text",
        id: Date.now(),
        room_id: roomId,
        sender_id: userId,
        user: { id: userId, user_name: authCheck?.userData.user_name },
      })
    );
    dispatch(
      updateRecentChats({
        oneSelf: true,
        roomId: roomId,
        chat: chat,
        checkRead: true,
      })
    ).then(
      () => (chatWrapRef.current.scrollTop = chatWrapRef.current.scrollHeight)
    );
    setChat("");
  };

  //채팅방 삭제 함수
  const exitRoom = (key) => {
    closeSnackbar(key);
    if (!roomId) {
      return enqueueSnackbar("관리자에게 문의하세요.", {
        variant: "error",
      });
    }
    socket?.emit("onLeftRoom", { userId, roomId }, (res) => {
      if (res) {
        dispatch(deleteRoom(roomId)).then(() => {
          enqueueSnackbar("채팅방이 삭제되었습니다.", {
            variant: "success",
          });
          return navigate(`/chat`);
        });
      }
    });
  };

  //채팅방 삭제 핸들러
  const onExitRoomHandler = useCallback(() => {
    handleClick(exitRoom, "정말로 채팅방에서 나가시겠습니까?", "나가기");
  }, [exitRoom]);

  const handleClick = (func, comment, buttonText) => {
    enqueueSnackbar(comment, {
      variant: "info",
      persist: true, // 자동으로 스낵바를 닫지 않음
      action: (key) => (
        <div>
          <button onClick={() => func(key)} className={classes.outButton}>
            {buttonText}
          </button>
          <button
            onClick={() => {
              closeSnackbar(key);
            }}
            className={classes.backButton}
          >
            뒤로가기
          </button>
        </div>
      ),
    });
  };

  const renderChat = () => {
    return chats?.map((chat, index) => {
      //url의 roomid가 가져온 채팅들의 roomId와 같으면 렌더링
      if (chat.room_id == roomId) {
        //나와 상대방 채팅 양쪽으로 나눠서 렌더링
        return (
          <div key={index} ref={chatRef} className={classes.message}>
            <div
              className={
                chat.sender_id == userId
                  ? classes.positionForMe
                  : classes.positionForOther
              }
            >
              <br></br>
              <div>
                <div className={classes.name}>
                  {chat.sender_id != userId
                    ? `${chat.user?.user_name}  `
                    : null}
                </div>

                <div className={classes.text}>
                  <span>{chat.content}</span>
                </div>
              </div>

              <br></br>
              <time className={classes.time}>
                {new Date(chats[index - 1]?.createdAt).getDate() !=
                new Date(chat.createdAt).getDate()
                  ? `${dateFormat(chat.createdAt, "YYYY년 MM월 DD일")} `
                  : null}
                {dateOrTimeFormatForChat(chat.createdAt, "hh:mm")}
              </time>
            </div>
          </div>
        );
      }
    });
  };
  return (
    <Fragment>
      <div className={classes.chatRoomWrap}>
        <div className={classes.chatInfo}>
          {/* db의 roomId와 현재 url의 roomId가 같고 db에서 온 파트너값이 있으면 그 파트너의 user_name값을 채팅방 이름 값에 넣음 */}
          <Link to={`/user/${sellerId}`}>
            <span>{sellerName}</span>
          </Link>
          <div className={classes.chatIcons}>
            <TbLogout onClick={onExitRoomHandler} className={classes.icon} />
          </div>
        </div>
        <div ref={chatWrapRef} className={classes.messagesWrap}>
          {hasMoreChatLoad && chats.length !== 0 ? (
            <div
              ref={target}
              // style={{ height: "50px", backgroundColor: "red" }}
              style={{ height: "50px" }}
            ></div>
          ) : null}
          {renderChat()}
          {+roomId === 0 || +chats?.length === 0 ? (
            <div className={classes.noneChatRoom}>
              <div className={classes.noneChatRoomImg}>
                <IoChatbubbleEllipsesSharp />
              </div>
              <div className={classes.noneChatRoomText}>
                <p>이전 대화 기록이 없습니다.</p>
                <p>메시지를 보내 대화를 시작해보세요.</p>
              </div>
            </div>
          ) : null}
        </div>
        <form className={classes.inputWrap} onSubmit={onSubmitHandler}>
          <input
            type="textInput"
            name="message"
            value={chat}
            ref={chatRef}
            rows={1}
            placeholder="메시지를 입력해주세요"
            onChange={onChatHandler}
          />

          <div className={classes.send}>
            <button type="submit" ref={buttonRef}>
              Send
            </button>

            <input type="file" style={{ display: "none" }} id="file" />
            <label htmlFor="file"></label>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default ChatRoom;
