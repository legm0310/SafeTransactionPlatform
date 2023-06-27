import React, { Fragment, useState } from "react";
import Button from "../../components/UI/Button";
import OnSaleProduct from "./OnSaleProduct";
import ReservedProduct from "./ReservedProduct";
import PurchasedProduct from "./PurchasedProduct";
import WishList from "./WishList";

import classes from "../../styles/UserInfo.module.css";

const UserInfo = () => {
  const [activeMenu, setActiveMenu] = useState("OnSaleProduct");

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
            <Button onClick={() => onMenuHandler("OnSaleProduct")}>
              <div
                className={`${classes.MenuButton} ${
                  activeMenu === "OnSaleProduct" ? classes.active : ""
                }`}
              >
                <span>판매상품</span>
              </div>
            </Button>

            <Button onClick={() => onMenuHandler("ReservedProduct")}>
              <div
                className={`${classes.MenuButton} ${
                  activeMenu === "ReservedProduct" ? classes.active : ""
                }`}
              >
                <span>구매진행상품</span>
              </div>
            </Button>

            <Button onClick={() => onMenuHandler("PurchasedProduct")}>
              <div
                className={`${classes.MenuButton} ${
                  activeMenu === "PurchasedProduct" ? classes.active : ""
                }`}
              >
                <span>구매완료상품</span>
              </div>
            </Button>

            <Button onClick={() => onMenuHandler("WishList")}>
              <div
                className={`${classes.MenuButton} ${
                  activeMenu === "WishList" ? classes.active : ""
                }`}
              >
                <span>찜목록</span>
              </div>
            </Button>
          </div>

          <div className={classes.UserInfoExplanation}>
            {activeMenu === "OnSaleProduct" && <OnSaleProduct />}
            {activeMenu === "ReservedProduct" && <ReservedProduct />}
            {activeMenu === "PurchasedProduct" && <PurchasedProduct />}
            {activeMenu === "WishList" && <WishList />}
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default UserInfo;
