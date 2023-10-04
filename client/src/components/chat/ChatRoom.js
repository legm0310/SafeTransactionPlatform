import React, {
  Fragment,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import {
  addChat,
  getChats,
  loadMoreChats,
  updateRecentChats,
} from "../../_actions/chatAction";
import { setLoadings } from "../../_actions/uiAction";
import { dateOrTimeFormatForChat, dateFormat } from "../../utils/dataParse";

import classes from "../../styles/chat/Chat.module.css";
import { useSnackbar } from "notistack";
import { IoCamera, IoImage, IoPersonAdd } from "react-icons/io5";
import { IoMdAttach } from "react-icons/io";
import { LuMoreHorizontal } from "react-icons/lu";

const ChatRoom = () => {
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();
  const { roomId } = useParams() ?? { roomId: 0 };
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

  //채팅방 입장 시 스크롤 하단 조정
  useEffect(() => {
    if (!chatWrapRef.current) return;
    // const totalHeight = chatWrapRef.current.scrollHeight;
    // const scrolledTop = chatWrapRef.current.scrollTop;
    // const viewportHeight = chatWrapRef.current.clientHeight;
    // if (
    //   totalHeight - (scrolledTop + viewportHeight) >
    //     Math.floor(totalHeight / 4) &&
    //   totalHeight != 0
    // )
    //   return;
    chatWrapRef.current.scrollTop = chatWrapRef.current.scrollHeight;
  }, [dispatch]);

  useEffect(() => {
    if (roomId && roomId != roomInfo?.roomId) {
      const body = {
        roomId: roomId,
        lastId: -1,
        limit: 20,
      };
      dispatch(getChats(body)).then(
        () => (chatWrapRef.current.scrollTop = chatWrapRef.current.scrollHeight)
      );
    }
  }, [dispatch, roomId]);

  //무한 스크롤
  const target = useInfiniteScroll(async (entry, observer) => {
    if (isChatLoading) return;
    //   dispatch(loadMoreChats({ roomId: roomId, lastId: -1, limit: 20 }));
    // } else {
    dispatch(loadMoreChats({ roomId: roomId, lastId: chats[0].id, limit: 20 }));
    chatWrapRef.current.scrollTop = 1200;
    // }
  });

  // 채팅 전송
  const onSubmitHandler = useCallback(
    (e) => {
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
        updateRecentChats({ roomId: roomId, chat: chat, checkRead: true })
      ).then(
        () => (chatWrapRef.current.scrollTop = chatWrapRef.current.scrollHeight)
      );
      setChat("");
    },
    [userId, socket, dispatch, chat, setChat]
  );

  const renderChat = () => {
    return chats?.map((chat, index) => {
      //url의 roomid가 가져온 채팅들의 roomId와 같으면 렌더링
      if (chat.room_id == roomId) {
        //나와 상대방 채팅 양쪽으로 나눠서 렌더링
        return (
          <div key={index} ref={chatRef} className={classes.positionForOther}>
            <h3
              className={
                chat.sender_id == userId
                  ? classes.positionForMe
                  : classes.positionForOther
              }
            >
              <br></br>
              {chat.sender_id != userId ? `${chat.user?.user_name} : ` : null}
              <span>{chat.content}</span>
              <br></br>
              <time>
                {new Date(chats[index - 1]?.createdAt).getDate() !=
                new Date(chat.createdAt).getDate()
                  ? `${dateFormat(chat.createdAt, "YYYY년 MM월 DD일")} `
                  : null}
                {dateOrTimeFormatForChat(chat.createdAt, "hh:mm")}
              </time>
            </h3>
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
            <IoCamera className={classes.icon} />
            <LuMoreHorizontal className={classes.icon} />
            <IoPersonAdd className={classes.icon} />
          </div>
        </div>
        <div ref={chatWrapRef} className={classes.messagesWrap}>
          {hasMoreChatLoad && chats.length !== 0 ? (
            <div
              ref={target}
              style={{ height: "50px", backgroundColor: "red" }}
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
            <IoMdAttach className={classes.inputIcon} />
            <input type="file" style={{ display: "none" }} id="file" />
            <label htmlFor="file">
              <IoImage className={classes.inputIcon2} />
            </label>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default ChatRoom;

// shift enter입력시 줄바꿈 (미완성)
// const onLineChange = (e) => {
//   console.log(e.shiftKey);
//   if (e.shiftKey && e.code === "Enter") {
//     e.preventDefault();
//     console.log(e.code);
//     const currentValue = e.target.value;
//     setChat(`${currentValue}\n`);
//   }
// };

// //메시지박스 사이즈 조절
// const resizeTextareaHeight = useCallback(() => {
//   if (!chatRef.current) return;

//   chatRef.current.style.height = "auto";
//   chatRef.current.style.height = chatRef.current?.scrollHeight + "px";
// }, [chatRef]);

//무한 스크롤 이벤트
// const scrollEvent = useCallback(() => {

// }, [dispatch, roomId, chats, hasMoreChatLoad, isChatLoading]);

// 무한 스크롤 이벤트 등록, 해제
// useEffect(() => {
//   // chatWrapRef.current.scrollTop = -500;
//   chatWrapRef.current?.addEventListener("scroll", scrollEvent);
//   return () =>
//     chatWrapRef.current?.removeEventListener("scroll", scrollEvent);
// }, [scrollEvent]);
