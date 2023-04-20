import { Fragment } from "react";

import classes from "./Login.module.css";

const Login = (props) => {
  return (
    <Fragment>
      <div className={classes.wrap}>
        <div className={classes.container}>
          <header className={classes.header}>
            <button className={classes.backButton}>back</button>
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

              <div className={classes.idField}>
                <div className={classes.idInputGroup}>
                  <input
                    type="password"
                    placeholder="비밀번호 입력"
                    className={classes.idInput}
                  />
                </div>
              </div>
              <button className={classes.loginButton}>로그인</button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
