import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { signup } from "../../_actions/userAction";
// import Button from "../../components/UI/Button";

import classes from "../../styles/Register.module.css";
import { FaArrowLeft } from "react-icons/fa";

import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControl,
  FormControlLabel,
  Checkbox,
  FormHelperText,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material/";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const Register = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [registerError, setRegisterError] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);

    // 이메일 유효성 체크
    const emailPattern = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isValidEmail = emailPattern.test(event.currentTarget.value);
    if (!isValidEmail) {
      setEmailError("유효한 이메일 주소를 입력해주세요.");
    } else {
      setEmailError("");
    }
  };

  const onNameHandler = (event) => {
    setName(event.currentTarget.value);

    // 이름 유효성 체크
    if (event.currentTarget.value.trim() === "") {
      setNameError("이름을 입력해주세요.");
    } else {
      setNameError("");
    }
  };

  const onPhoneNumberHandler = (event) => {
    setPhoneNumber(event.currentTarget.value);

    // 핸드폰 번호 유효성 체크
    const phoneNumberPattern = /^\d{3}-\d{3,4}-\d{4}$/;
    const isValidPhoneNumber = phoneNumberPattern.test(
      event.currentTarget.value
    );
    if (!isValidPhoneNumber) {
      setPhoneNumberError("유효한 핸드폰 번호를 입력해주세요.");
    } else {
      setPhoneNumberError("");
    }
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);

    // 비밀번호 유효성 체크
    const passwordPattern = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{8,}$/;
    const isValidPassword = passwordPattern.test(event.currentTarget.value);
    if (!isValidPassword) {
      setPasswordError(
        "비밀번호는 숫자와 영문자를 조합하여 8자 이상으로 입력해주세요."
      );
    } else {
      setPasswordError("");
    }
  };

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);

    // 비밀번호 재입력 체크
    if (event.currentTarget.value !== Password) {
      setPasswordError("비밀번호가 일치하지 않습니다.");
    } else {
      setPasswordError("");
    }
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    // 회원가입 요청 보내기
    let body = {
      role: 1,
      email: Email,
      user_name: Name,
      phone_number: PhoneNumber,
      password: Password,
    };

    dispatch(signup(body)).then((response) => {
      if (response.payload.signupSuccess) {
        console.log("회원가입 성공");
        navigate("/login");
      } else if (response.payload.code === 400) {
        alert("존재하는 이메일입니다.");
        setRegisterError("이미 가입된 이메일입니다.");
      } else {
        alert("회원 가입에 실패했습니다.");
        setRegisterError("회원가입에 실패하였습니다. 다시 한번 확인해 주세요.");
      }
    });
  };

  return (
    <Fragment>
      <div className={classes.wrap}>
        <div className={classes.container}>
          <header className={classes.header}>
            <Link to='/login' className={classes.backButton}>
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

          <Box component='form' noValidate sx={{ px: 3 }}>
            <FormControl
              component='fieldset'
              variant='standard'
              onSubmit={onSubmitHandler}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    autoFocus
                    fullWidth
                    type='name'
                    value={Name}
                    label='이름'
                    onChange={onNameHandler}
                    error={nameError !== ""}
                    helperText={nameError}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    autoFocus
                    fullWidth
                    type='email'
                    value={Email}
                    label='이메일 주소'
                    onChange={onEmailHandler}
                    error={emailError !== ""}
                    helperText={emailError}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    autoFocus
                    fullWidth
                    type='number'
                    value={PhoneNumber}
                    label='핸드폰 번호'
                    onChange={onPhoneNumberHandler}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type='password'
                    value={Password}
                    label='비밀번호 (숫자+영문자)'
                    onChange={onPasswordHandler}
                    error={passwordError !== ""}
                    helperText={passwordError}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type='password'
                    value={ConfirmPassword}
                    label='비밀번호 재입력'
                    onChange={onConfirmPasswordHandler}
                    error={passwordError !== "" || false}
                  />
                </Grid>
              </Grid>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
                size='large'
              >
                회원가입
              </Button>
            </FormControl>
          </Box>
        </div>
      </div>
    </Fragment>
  );
};

export default Register;
