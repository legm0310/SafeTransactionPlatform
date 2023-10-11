import React, { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import {
  getUser,
  updateUserName,
  updateIntroduce,
} from "../../_actions/userAction";
import classes from "../../styles/user/UserInfo.module.css";
import { dateFormat } from "../../utils/dataParse";
import { TextField } from "@mui/material";
import defaultProfile from "../../assets/defaultProfile.png";

const UserProfile = () => {
  const userDetail = useSelector((state) => state.user.userDetail?.userData);

  const userName = userDetail?.user_name;
  const introduce = userDetail?.introduce;
  const [updateName, setUpdateName] = useState(false);
  const [updateIntro, setUpdateIntro] = useState(false);
  const [newName, setNewName] = useState({ userName });
  const [newIntroduce, setNewIntroduce] = useState("");

  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getUser(id));
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((err) => err);
    // console.log(userDetail);
  }, [dispatch]);

  const onShowNameUpdateHandler = (event) => {
    event.preventDefault();
    setUpdateName(true);
  };

  const onNameUpdateHandler = (event) => {
    event.preventDefault();

    dispatch(updateUserName(id, { new_name: newName }))
      .then((response) => {
        console.log(response);
        dispatch(getUser(id));
      })
      .catch((err) => err);

    setUpdateName(false);
  };

  const onShowIntroUpdateHandler = (event) => {
    event.preventDefault();
    setUpdateIntro(true);
  };

  const onIntroUpdateHandler = (event) => {
    event.preventDefault();

    dispatch(updateIntroduce(id, { new_introduce: newIntroduce }))
      .then((response) => {
        console.log(response);
        dispatch(getUser(id));
      })
      .catch((err) => err);

    setUpdateIntro(false);
  };

  const onNameHandler = (event) => {
    const value = event.target.value;

    setNewName(value);
  };

  const onNewIntroHandler = (event) => {
    const value = event.target.value;

    setNewIntroduce(value);
    console.log("Intro : ", newIntroduce);
  };

  return (
    <Fragment>
      <div className={classes.userInfoWrap}>
        <div className={classes.userProfileWrap}>
          <img src={defaultProfile} alt="" className={classes.testImg} />
          <div style={{ fontSize: "23px" }}>{userName}</div>
        </div>
        <div className={classes.userDetailProfile}>
          <div className={classes.userNameWrap}>
            {updateName ? (
              <div className={classes.userNameInput}>
                <TextField
                  rows={1}
                  InputProps={{
                    style: { padding: 0 },
                  }}
                  defaultValue={userName}
                  className={classes["test"]}
                  onChange={onNameHandler}
                />
                <div>
                  <button
                    className={classes.userNameButton}
                    onClick={onNameUpdateHandler}
                  >
                    확인
                  </button>
                </div>
              </div>
            ) : (
              <div>
                {userName}
                <button
                  className={classes.userNameModifyButton}
                  onClick={onShowNameUpdateHandler}
                >
                  이름 수정
                </button>
              </div>
            )}
          </div>
          <div className={classes.userStateWrap}>
            <time>
              {`가입 날짜 : ${dateFormat(
                userDetail?.created_at,
                "YYYY년 MM월 DD일"
              )} `}
            </time>
            {/* <div>상품 판매 개수</div> */}
          </div>
          {updateIntro ? (
            <div className={classes.userIntroWrap}>
              <TextField
                sx={{
                  padding: "0",
                  width: "100%",
                }}
                InputProps={{
                  style: { padding: 0 }, // padding을 0으로 설정
                }}
                id="outlined-multiline-static"
                multiline
                rows={3.7}
                defaultValue={introduce}
                className={classes.updateIntroInput}
                onChange={onNewIntroHandler}
              />
              <button
                className={classes.userIntroButton}
                onClick={onIntroUpdateHandler}
              >
                확인
              </button>
            </div>
          ) : (
            <div>
              <div
                className={classes.userIntroWrap}
                style={{ whiteSpace: "pre-line" }}
              >
                {introduce}
              </div>
              <button
                className={classes.userIntroModifyButton}
                onClick={onShowIntroUpdateHandler}
              >
                소개글 수정
              </button>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default UserProfile;