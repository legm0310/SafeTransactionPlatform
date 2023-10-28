import React, { Fragment, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import Button from "../../components/common/Button";
import SaleList from "../../components/User/SaleList";
import ReservedList from "../../components/User/ReservedList";
import PurchasedList from "../../components/User/PurchasedList";
import WishList from "../../components/User/WishList";
import UserProfile from "../../components/User/UserProfile";

import classes from "../../styles/user/UserInfo.module.css";

const UserInfo = () => {
  const [activeMenu, setActiveMenu] = useState("SaleList");

  const { id } = useParams();
  const location = useLocation();
  const { loadWishList, userId } = useSelector((state) => state.user);
  
  useEffect(() => {
    if (location.state && location.state.activeMenu)
      setActiveMenu(location.state.activeMenu);
  }, [location.state, id]);

  const onMenuHandler = (menu) => {
    setActiveMenu(menu);
  };

  return (
    <Fragment>
      <section className={classes.userInfoSection}>
        <UserProfile />

        <div className={classes.userInfoMenuWrap}>
          {+id === userId ? (
            <div className={classes.userInfoMenu}>
              <Button onClick={() => onMenuHandler("SaleList")}>
                <div
                  className={`${classes.menuButton1} ${
                    activeMenu === "SaleList" ? classes.active : ""
                  }`}
                >
                  <span>판매상품</span>
                </div>
              </Button>

              <Button onClick={() => onMenuHandler("ReservedList")}>
                <div
                  className={`${classes.menuButton} ${
                    activeMenu === "ReservedList" ? classes.active : ""
                  }`}
                >
                  <span>구매진행상품</span>
                </div>
              </Button>

              <Button onClick={() => onMenuHandler("PurchasedList")}>
                <div
                  className={`${classes.menuButton} ${
                    activeMenu === "PurchasedList" ? classes.active : ""
                  }`}
                >
                  <span>구매완료상품</span>
                </div>
              </Button>

              <Button onClick={() => onMenuHandler("WishList")}>
                <div
                  className={`${classes.menuButton} ${
                    activeMenu === "WishList" ? classes.active : ""
                  }`}
                >
                  <span>찜목록</span>
                  {loadWishList?.length >= 1 ? (
                    <div className={classes.wishListLength}>
                      {" "}
                      <p>{loadWishList?.length}</p>{" "}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </Button>
            </div>
          ) : (
            <div className={classes.userInfoMenu}>
              <Button onClick={() => onMenuHandler("SaleList")}>
                <div
                  className={`${classes.menuButton1} ${
                    activeMenu === "SaleList" ? classes.active : ""
                  }`}
                >
                  <span>판매상품</span>
                </div>
              </Button>
            </div>
          )}

          <div className={classes.userInfoExplanation}>
            {activeMenu === "SaleList" && <SaleList id={+id} />}
            {activeMenu === "ReservedList" && <ReservedList />}
            {activeMenu === "PurchasedList" && <PurchasedList />}
            {activeMenu === "WishList" && <WishList />}
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default UserInfo;
