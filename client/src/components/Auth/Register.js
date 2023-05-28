import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { signup } from "../../_actions/user_action";

import classes from "./Register.module.css";
import { FaArrowLeft } from "react-icons/fa";

const Register = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };

  const onPhoneNumberHandler = (event) => {
    setPhoneNumber(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (Password !== ConfirmPassword) {
      return alert("비밀번호가 같지 않습니다.");
    }

    let body = {
      role: 1,
      email: Email,
      user_name: Name,
      phone_number: PhoneNumber,
      password: Password,
    };

    dispatch(signup(body)).then((response) => {
      if (response.payload.signupSuccess) {
        alert("회원 정보 입력 완료");
        navigate("/login");
      } else {
        alert("회원 가입에 실패했습니다.");
      }
    });
  };

  return (
    <Fragment>
      <div className={classes.wrap}>
        <div className={classes.container}>
          <header className={classes.header}>
            <Link to="/login" className={classes.backButton}>
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
            <form onSubmit={onSubmitHandler}>
              <div className={classes.nameField}>
                <div className={classes.nameInputGroup}>
                  <input
                    type="text"
                    placeholder="이름"
                    value={Name}
                    onChange={onNameHandler}
                    className={classes.nameInput}
                  />
                </div>
              </div>

              <div className={classes.idField}>
                <div className={classes.idInputGroup}>
                  <input
                    type="email"
                    placeholder="이메일"
                    value={Email}
                    onChange={onEmailHandler}
                    className={classes.idInput}
                  />
                </div>
              </div>

              <div className={classes.pnField}>
                <div className={classes.pnInputGroup}>
                  <input
                    type="text"
                    placeholder="핸드폰번호"
                    value={PhoneNumber}
                    onChange={onPhoneNumberHandler}
                    className={classes.pnInput}
                  />
                </div>
              </div>

              <div className={classes.pwField}>
                <div className={classes.pwInputGroup}>
                  <input
                    type="password"
                    placeholder="비밀번호"
                    value={Password}
                    onChange={onPasswordHandler}
                    className={classes.pwInput}
                  />
                </div>
              </div>

              <div className={classes.pwField}>
                <div className={classes.pwInputGroup}>
                  <input
                    type="password"
                    placeholder="비밀번호 확인"
                    value={ConfirmPassword}
                    onChange={onConfirmPasswordHandler}
                    className={classes.pwInput}
                  />
                </div>
              </div>
              <button type="submit" className={classes.registerButton}>
                회원가입
              </button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Register;
