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
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import {
  addChat,
  addRoom,
  deleteRoom,
  getChats,
  loadMoreChats,
  updateRecentChats,
} from "../../_actions/chatAction";
import { dateOrTimeFormatForChat, dateFormat } from "../../utils/dataParse";

import classes from "../../styles/chat/Chat.module.css";
import { useSnackbar } from "notistack";
import { IoImage } from "react-icons/io5";
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

  const onChatHandler = (e) => {
    setChat(e.currentTarget.value);
  };

  //채팅방 입장 시 초기 데이터 로드
  useEffect(() => {
    if (roomId && roomId != 0) {
      const body = {
        roomId: roomId,
        lastId: -1,
        limit: 20,
      };
      dispatch(getChats(body)).then(() => {
        if (!chatWrapRef.current) return;
        chatWrapRef.current.scrollTop = chatWrapRef.current?.scrollHeight;
      });
    }
  }, [location.pathname, roomId]);

  //무한 스크롤
  const target = useInfiniteScroll(async (entry, observer) => {
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
      if (roomId == 0) {
        const newRoomId = await onAddRoomAndSend();
        if (!newRoomId)
          enqueueSnackbar(`관리자에게 문의하세요`, {
            variant: "error",
          });
        return navigate(`/`);
      }
      return onSendChat(roomId, chat);
    },
    [userId, socket, dispatch, chat, setChat]
  );

  // 첫 채팅 전송 시 채팅방 생성 및 채팅 전송
  const onAddRoomAndSend = async () => {
    const body = {
      sellerId: searchParams.get("seller"),
      userId: searchParams.get("user"),
      roomName: `${searchParams.get("user")}_${searchParams.get("seller")}`,
      chat: chat,
    };
    return new Promise((resolve, reject) => {
      socket?.emit("onAddRoomAndSend", body, (res) => {
        if (res.result === "createdRoom" || res.result === "updatedRoom") {
          dispatch(
            addChat({
              check_read: false,
              content: chat,
              createdAt: new Date().toString(),
              updatedAt: new Date().toString(),
              type: "text",
              id: Date.now(),
              room_id: res.roomId,
              sender_id: userId,
              user: { id: userId, user_name: authCheck?.userData.user_name },
            })
          );
          dispatch(
            updateRecentChats({
              oneSelf: true,
              roomId: res.roomId,
              chat: chat,
              checkRead: false,
            })
          ).then(() => {
            setChat("");
          });
          navigate(`/chat/${res.roomId}`);
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
      roomId: roomId,
      chat,
    });
    dispatch(
      addChat({
        check_read: false,
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
        checkRead: false,
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
        <>
          <button onClick={() => func(key)}>{buttonText}</button>
          <button
            onClick={() => {
              closeSnackbar(key);
            }}
          >
            뒤로가기
          </button>
        </>
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
      } else return;
    });
  };
  return (
    <Fragment>
      <div className={classes.chatRoomWrap}>
        <div className={classes.chatInfo}>
          {/* db의 roomId와 현재 url의 roomId가 같고 db에서 온 파트너값이 있으면 그 파트너의 user_name값을 채팅방 이름 값에 넣음 */}
          <span>
            {roomInfo?.roomId == roomId && roomInfo?.partner
              ? roomInfo.partner.user_name
              : null}
          </span>
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
        </div>
        <form className={classes.inputWrap} onSubmit={onSubmitHandler}>
          <input
            type="textInput"
            name="message"
            value={chat}
            ref={chatRef}
            rows={1}
            placeholder="메시지를 입력해주세요"
            // onInput={resizeTextareaHeight}
            onChange={onChatHandler}
            // onKeyDown={onLineChange}
          />

          <div className={classes.send}>
            <button type="submit" ref={buttonRef}>
              Send
            </button>
            {/* <IoMdAttach className={classes.inputIcon} /> */}
            <input type="file" style={{ display: "none" }} id="file" />
            <label htmlFor="file">
              {/* <IoImage className={classes.inputIcon2} /> */}
            </label>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default ChatRoom;
