import React, { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { getUser, updateUser } from "../../_actions/userAction";
import classes from "../../styles/user/UserInfo.module.css";
import { dateFormat } from "../../utils/dataParse";
import { TextField } from "@mui/material";
import { useSnackbar } from "notistack";
import defaultProfile from "../../assets/defaultProfile.png";

const UserProfile = () => {
  const userDetail = useSelector((state) => state.user.userDetail?.userData);
  const myId = useSelector((state) => state.user?.userId);
  const userName = userDetail?.user_name;
  const introduce = userDetail?.introduce;
  const [updateName, setUpdateName] = useState(false);
  const [updateIntro, setUpdateIntro] = useState(false);
  const [newName, setNewName] = useState(userName);
  const [newIntroduce, setNewIntroduce] = useState(introduce);

  const dispatch = useDispatch();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    dispatch(getUser(id));
  }, [dispatch]);

  const onShowNameUpdateHandler = (event) => {
    event.preventDefault();
    setUpdateName(true);
  };

  const onShowIntroUpdateHandler = (event) => {
    event.preventDefault();
    setUpdateIntro(true);
  };

  const onNameUpdateHandler = (event) => {
    event.preventDefault();
    if (newName == "") return setUpdateName(false);

    dispatch(updateUser(id, { newName: newName, newIntroduce: newIntroduce }))
      .then((response) => {
        console.log(response);
        dispatch(getUser(id));
        enqueueSnackbar("이름 수정이 완료되었습니다.", {
          variant: "success",
        });
      })
      .catch((err) => err);

    setUpdateName(false);
  };

  const onIntroUpdateHandler = (event) => {
    event.preventDefault();

    dispatch(updateUser(id, { newName: newName, newIntroduce: newIntroduce }))
      .then((response) => {
        console.log(response);
        dispatch(getUser(id));
        enqueueSnackbar("소개글 수정이 완료되었습니다.", {
          variant: "success",
        });
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

                <button
                  className={classes.userNameButton}
                  onClick={onNameUpdateHandler}
                >
                  확인
                </button>
              </div>
            ) : (
              <div className={classes.nonBorderUserNameWrap}>
                {userName}
                {+id === myId ? (
                  <div>
                    <button
                      className={classes.userNameModifyButton}
                      onClick={onShowNameUpdateHandler}
                    >
                      이름 수정
                    </button>
                  </div>
                ) : (
                  <div></div>
                )}
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
          <div>
            {updateIntro ? (
              <div className={classes.userIntroWrap}>
                <TextField
                  sx={{
                    padding: "0",
                    width: "100%",
                  }}
                  InputProps={{
                    style: { padding: "1px" }, // padding을 0으로 설정
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
              <div className={classes.userIntroWrap}>
                <div
                  classname={classes.userIntro}
                  style={{ whiteSpace: "pre-line", height: "163px" }}
                >
                  {introduce}
                </div>
                {+id === myId ? (
                  <div>
                    <button
                      className={classes.userIntroModifyButton}
                      onClick={onShowIntroUpdateHandler}
                    >
                      소개글 수정
                    </button>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UserProfile;
