import { Fragment } from "react";
import { Link } from "react-router-dom";

import classes from "./Register.module.css";
import { FaArrowLeft } from "react-icons/fa";

const Register = (props) => {
  return (
    <Fragment>
      <div className={classes.wrap}>
        <div className={classes.container}>
          <header className={classes.header}>
            <Link to="/Login" className={classes.backButton}>
              <FaArrowLeft />
            </Link>
          </header>

          <div className={classes.registerTitle}>
            <div className={classes.sectionHeader}>
              <h1 className={classes.title}>판다에 오신 것을 환영합니다</h1>
              <p className={classes.subTitle}>
                블록체인을 활용한 중고거래를 이용해보세요
              </p>
            </div>
          </div>

          <div className={classes.registerInputWrap}>
            <form>
              <div className={classes.nameField}>
                <div className={classes.nameInputGroup}>
                  <input
                    type="text"
                    placeholder="이름"
                    className={classes.nameInput}
                  />
                </div>
              </div>

              <div className={classes.idField}>
                <div className={classes.idInputGroup}>
                  <input
                    type="email"
                    placeholder="이메일"
                    className={classes.idInput}
                  />
                </div>
              </div>

              <div className={classes.pwField}>
                <div className={classes.pwInputGroup}>
                  <input
                    type="password"
                    placeholder="비밀번호"
                    className={classes.pwInput}
                  />
                </div>
              </div>

              <div className={classes.pwField}>
                <div className={classes.pwInputGroup}>
                  <input
                    type="password"
                    placeholder="비밀번호 확인"
                    className={classes.pwInput}
                  />
                </div>
              </div>
              <button className={classes.registerButton}>회원가입</button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Register;
