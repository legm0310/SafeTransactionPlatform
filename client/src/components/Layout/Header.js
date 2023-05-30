import { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";

import classes from "./Header.module.css";
import { FiSearch } from "react-icons/fi";
import DropdownMenu from "./DropdownMenu";
import UserAuth from "./UserAuth";

const Header = (props) => {
  const location = useLocation();

  // 현재 경로가 로그인 페이지인 경우 Header를 렌더링하지 않음
  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  return (
    <Fragment>
      <header className={classes.header}>
        <div className={classes.headerTop}>
          <Link to="/" className={classes.logoWrap}>
            <h1 className={classes.logo}>PANDA.</h1>
          </Link>

          <div className={classes.searchBox}>
            <input type="text" className={classes.search} />

            <button>
              <FiSearch />
            </button>
          </div>

          <div className={classes.AuthList}>
            <UserAuth
              setIsLoggedIn={props.setIsLoggedIn}
              isLoggedIn={props.isLoggedIn}
            />
          </div>
        </div>

        <div className={classes.headerBottom}>
          <ul className={classes.list}>
            <div className={classes.dropdown}>
              <li className={classes.purchaseList}>
                <Link to="/products/all" className={classes.purchaseLink}>
                  구매하기
                </Link>
              </li>

              <div className={classes.dropdownContent}>
                <DropdownMenu />
              </div>
            </div>

            <Link to="/products/add" className={classes.AddProductLink}>
              <li className={classes.AddProductList}>판매하기</li>
            </Link>
          </ul>
        </div>
      </header>
    </Fragment>
  );
};

export default Header;
