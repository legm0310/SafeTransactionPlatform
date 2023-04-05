import { Fragment } from "react";
import { Link } from "react-router-dom";

import classes from "./Header.module.css";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <div className={classes.list}>
          <Link to="/" className={classes.link}>
            <h1 className={classes.title}>PANDA.</h1>
          </Link>
          <ul className={classes.list2}>
            <Link to="/Purchase/" className={classes.link}>
              <li>구매하기</li>
            </Link>
            <Link to="/Sale/" className={classes.link}>
              <li>판매하기</li>
            </Link>
          </ul>
          <div className={classes.search}>검색</div>
        </div>
        <ul className={classes.list3}>
          <li>로그인</li>
          <li>회원가입</li>
        </ul>
      </header>
    </Fragment>
  );
};

export default Header;
