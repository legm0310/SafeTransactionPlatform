import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { login } from "../../_actions/userAction";

import classes from "./Login.module.css";
import { FaArrowLeft } from "react-icons/fa";
import googleIcon from "../../assets/google.svg";
import kakaoIcon from "../../assets/kakao.svg";

const Login = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    // 버튼을 누르면 리프레시 되는것을 막아주는 기능
    event.preventDefault();

    if (Password.trim() === "") {
      alert("비밀번호를 입력해주세요.");
      return;
    }
    // 적은 내용이 이메일이 서버로 보내지고, 이메일을 찾고 비밀번호를 비교한 후 토큰을 생성해서 쿠키에 저장하여 클라이언트에게 전해줌
    let body = {
      email: Email,
      password: Password,
    };

    dispatch(login(body)).then((response) => {
      if (response.payload.loginSuccess) {
        props.setIsLoggedIn(true);
        alert("로그인 성공");
        navigate("/");
      } else if (
        response.payload.code === 404 ||
        response.payload.code === 401
      ) {
        alert("이메일 또는 비밀번호를 잘못 입력했습니다.");
      } else {
        alert("로그인 실패");
      }
    });
  };

  return (
    <Fragment>
      <div className={classes.wrap}>
        <div className={classes.container}>
          <header className={classes.header}>
            <Link to="/" className={classes.backButton}>
              <FaArrowLeft />
            </Link>
          </header>

          <div className={classes.loginTitle}>
            <div className={classes.sectionHeader}>
              <h1 className={classes.title}>판다에 오신 것을 환영합니다</h1>
              <p className={classes.subTitle}>
                블록체인을 활용한 중고거래를 이용해보세요
              </p>
            </div>
          </div>

          <div className={classes.loginInputWrap}>
            <form onSubmit={onSubmitHandler}>
              <div className={classes.idField}>
                <div className={classes.idInputGroup}>
                  <input
                    type="email"
                    placeholder="이메일 입력"
                    value={Email}
                    onChange={onEmailHandler}
                    className={classes.idInput}
                  />
                </div>
              </div>

              <div className={classes.pwField}>
                <div className={classes.pwInputGroup}>
                  <input
                    type="password"
                    placeholder="비밀번호 입력"
                    value={Password}
                    onChange={onPasswordHandler}
                    className={classes.pwInput}
                  />
                </div>
              </div>
              <button className={classes.loginButton}>로그인</button>
            </form>
          </div>

          <div className={classes.registerWrap}>
            <button type="submit" className={classes.registerButton}>
              <Link to="/register" className={classes.textButton}>
                회원가입
              </Link>
            </button>
          </div>

          <div className={classes.snsWrap}>
            <span className={classes.before}></span>
            <p className={classes.snsTitle}>SNS 로그인</p>
            <span className={classes.after}></span>
          </div>

          <div className={classes.snsIconWrap}>
            <a href="1" className={classes.snsIcon}>
              <img src={googleIcon} alt="" />
            </a>
            <a href="1" className={classes.snsIcon}>
              <img src={kakaoIcon} alt="" />
            </a>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
