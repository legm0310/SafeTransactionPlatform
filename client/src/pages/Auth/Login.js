import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { login, getInitUser } from "../../_actions/userAction";
// import Button from "../../components/common/Button";
// import CustomAlert from "../../components/common/Alert";

import classes from "../../styles/auth/Login.module.css";
import { useSnackbar } from "notistack";
import googleIcon from "../../assets/google.svg";
import kakaoIcon from "../../assets/kakao.svg";
import { FaArrowLeft } from "react-icons/fa";
import { Button, TextField, FormControl, Grid, Box } from "@mui/material/";

const Login = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  // const [showAlert, setShowAlert] = useState(false);

  const onEmailHandler = (event) => {
    // 이메일 유효성 체크
    const emailPattern = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isValidEmail = emailPattern.test(event.currentTarget.value);
    if (!isValidEmail) {
      setEmailError("유효한 이메일 주소를 입력해주세요.");
    } else {
      setEmailError("");
    }

    setEmail(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    // 비밀번호 유효성 체크
    const passwordPattern = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{8,}$/;
    const isValidPassword = passwordPattern.test(event.currentTarget.value);
    if (!isValidPassword) {
      setPasswordError("");
    }

    setPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    // 버튼을 누르면 리프레시 되는것을 막아주는 기능
    event.preventDefault();

    if (Password.trim() === "") {
      enqueueSnackbar("비밀번호를 입력해주세요.", {
        variant: "error",
      });
      return;
    }
    // 적은 내용이 이메일이 서버로 보내지고, 이메일을 찾고 비밀번호를 비교한 후 토큰을 생성해서 쿠키에 저장하여 클라이언트에게 전해줌
    let body = {
      email: Email,
      password: Password,
    };

    dispatch(login(body)).then((response) => {
      if (response.payload.loginSuccess) {
        enqueueSnackbar("로그인 성공", {
          variant: "success",
        });
        dispatch(getInitUser());
        navigate("/");
      } else if (
        response.payload.code === 404 ||
        response.payload.code === 401
      ) {
        enqueueSnackbar("이메일 또는 비밀번호를 잘못 입력했습니다", {
          variant: "error",
        });
      } else {
        enqueueSnackbar("로그인 실패", { variant: "error" });
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

          <Box
            component="form"
            noValidate
            sx={{ px: 3 }}
            onSubmit={onSubmitHandler}
          >
            <FormControl component="fieldset" variant="standard" fullWidth>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoFocus
                    fullWidth
                    type="email"
                    value={Email}
                    label="이메일 주소"
                    onChange={onEmailHandler}
                    error={emailError !== ""}
                    helperText={emailError}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type="password"
                    value={Password}
                    label="비밀번호"
                    onChange={onPasswordHandler}
                    error={passwordError !== ""}
                    helperText={passwordError}
                    id="outlined-password-input"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: "#1ecfba",
                  fontFamily: "GongGothicMedium",
                  fontWeight: 500,
                  fontSize: 18,
                  "&:hover": { backgroundColor: "#1ecfba" },
                }}
                size="large"
              >
                로그인
              </Button>
            </FormControl>
          </Box>

          <div className={classes.registerWrap}>
            <Button type="submit" className={classes.registerButton}>
              <Link to="/register" className={classes.textButton}>
                회원가입
              </Link>
            </Button>
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
