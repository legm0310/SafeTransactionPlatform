import Modal from "../UI/Modal";
import classes from "./Login.module.css";

const Login = (props) => {
  return (
    <Modal>
      <div className={classes.container}>
        <h1 className={classes.title}>로그인</h1>
        <p>블록체인을 활용한 중고거래를 이용해보세요</p>
        <form className={classes.loginForm}>
          <input type="email" placeholder="Email" className={classes.input} />

          <input
            type="password"
            placeholder="Password"
            className={classes.input}
          />

          <button className={classes.button}>로그인</button>
        </form>
      </div>
    </Modal>
  );
};

export default Login;
