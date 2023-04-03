import { Fragment } from "react";

import classes from "./Header.module.css";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <div className={classes.list}>
          <h1 className={classes.title}>거래플랫폼</h1>
          <ul className={classes.list2}>
            <li>구매하기</li>
            <li>판매하기</li>
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
