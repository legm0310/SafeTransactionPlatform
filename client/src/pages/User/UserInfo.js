import React, { Fragment, useState } from "react";
import Button from "../../components/UI/Button";
import UserAddProduct from "./UserAddProduct";
import UserPurchaseProduct from "./UserPurchaseProduct";
import UserWishList from "./UserWishList";

import classes from "../../styles/UserInfo.module.css";

const UserInfo = () => {
  const [activeMenu, setActiveMenu] = useState("UserAddProduct");

  const onMenuHandler = (menu) => {
    setActiveMenu(menu);
  };

  return (
    <Fragment>
      <section className={classes.UserInfoSection}>
        <div className={classes.UserInfoWrap}>
          <div></div>
          <div></div>
        </div>

        <div className={classes.UserInfoMenuWrap}>
          <div className={classes.UserInfoMenu}>
            <Button onClick={() => onMenuHandler("UserAddProduct")}>
              <div
                className={`${classes.MenuButton} ${
                  activeMenu === "UserAddProduct"
                    ? classes.AddProductButton
                    : ""
                }`}
              >
                판매상품
              </div>
            </Button>
            <Button onClick={() => onMenuHandler("UserPurchaseProduct")}>
              <div
                className={`${classes.MenuButton} ${
                  activeMenu === "UserPurchaseProduct"
                    ? classes.PurchaseProductButton
                    : ""
                }`}
              >
                구매상품
              </div>
            </Button>
            <Button onClick={() => onMenuHandler("UserWishList")}>
              <div
                className={`${classes.MenuButton} ${
                  activeMenu === "UserWishList" ? classes.wishListButton : ""
                }`}
              >
                찜목록
              </div>
            </Button>
          </div>

          <div className={classes.UserInfoExplanation}>
            {activeMenu === "UserAddProduct" && <UserAddProduct />}
            {activeMenu === "UserPurchaseProduct" && <UserPurchaseProduct />}
            {activeMenu === "UserWishList" && <UserWishList />}
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default UserInfo;
