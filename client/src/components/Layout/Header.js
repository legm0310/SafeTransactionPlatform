import { Fragment } from "react";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

import classes from "./Header.module.css";
import DropdownMenu from "./DropdownMenu";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <div className={classes.list}>
          <Link to="/" className={classes.link}>
            <h1 className={classes.logo}>PANDA.</h1>
          </Link>
          <ul className={classes.list2}>
            <Link to="/Purchase/" className={classes.link}>
              <div className={classes.dropdown}>
                <li className={classes.list2Item}>구매하기</li>
                <div className={classes.dropdownContent}>
                  <DropdownMenu />
                </div>
              </div>
            </Link>
            <Link to="/AddProduct/" className={classes.link}>
              <li className={classes.list2Item}>판매하기</li>
            </Link>
          </ul>
          <div className={classes.searchBox}>
            <input type="text" className={classes.search} />
            <button>
              <FiSearch />
            </button>
          </div>
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
