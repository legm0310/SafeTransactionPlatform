import { Fragment } from "react";
import { Link } from "react-router-dom";

import classes from "./Login.module.css";
import { FaArrowLeft } from "react-icons/fa";
import googleIcon from "../../assets/google.svg";
import kakaoIcon from "../../assets/kakao.svg";

const Login = (props) => {
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
            <form>
              <div className={classes.idField}>
                <div className={classes.idInputGroup}>
                  <input
                    type="email"
                    placeholder="이메일 입력"
                    className={classes.idInput}
                  />
                </div>
              </div>

              <div className={classes.pwField}>
                <div className={classes.pwInputGroup}>
                  <input
                    type="password"
                    placeholder="비밀번호 입력"
                    className={classes.pwInput}
                  />
                </div>
              </div>
              <button className={classes.loginButton}>로그인</button>
            </form>
          </div>

          <div className={classes.registerWrap}>
            <button className={classes.registerButton}>
              <Link to="/Register" className={classes.textButton}>
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
