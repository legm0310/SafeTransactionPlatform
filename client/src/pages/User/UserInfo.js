import React, { Fragment, useState } from "react";
import Button from "../../components/common/Button";
import OnSaleProduct from "../../components/user/OnSaleProduct";
import ReservedProduct from "../../components/user/ReservedProduct";
import PurchasedProduct from "../../components/user/PurchasedProduct";
import Wish from "../../components/user/Wish";

import classes from "../../styles/user/UserInfo.module.css";

const UserInfo = ({ wish, setWish }) => {
  const [activeMenu, setActiveMenu] = useState("OnSaleProduct");

  const onMenuHandler = (menu) => {
    setActiveMenu(menu);
  };

  return (
    <Fragment>
      <section className={classes.userInfoSection}>
        <div className={classes.userInfoWrap}>
          <div></div>
          <div></div>
        </div>

        <div className={classes.userInfoMenuWrap}>
          <div className={classes.userInfoMenu}>
            <Button onClick={() => onMenuHandler("OnSaleProduct")}>
              <div
                className={`${classes.menuButton1} ${
                  activeMenu === "OnSaleProduct" ? classes.active : ""
                }`}
              >
                <span>판매상품</span>
              </div>
            </Button>

            <Button onClick={() => onMenuHandler("ReservedProduct")}>
              <div
                className={`${classes.menuButton} ${
                  activeMenu === "ReservedProduct" ? classes.active : ""
                }`}
              >
                <span>구매진행상품</span>
              </div>
            </Button>

            <Button onClick={() => onMenuHandler("PurchasedProduct")}>
              <div
                className={`${classes.menuButton} ${
                  activeMenu === "PurchasedProduct" ? classes.active : ""
                }`}
              >
                <span>구매완료상품</span>
              </div>
            </Button>

            <Button onClick={() => onMenuHandler("Wish")}>
              <div
                className={`${classes.menuButton} ${
                  activeMenu === "Wish" ? classes.active : ""
                }`}
              >
                <span>찜목록</span>
                {wish.length >= 1 ? (
                  <div className={classes.wishListLength}>
                    {" "}
                    <p>{wish.length}</p>{" "}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </Button>
          </div>

          <div className={classes.userInfoExplanation}>
            {activeMenu === "OnSaleProduct" && <OnSaleProduct />}
            {activeMenu === "ReservedProduct" && <ReservedProduct />}
            {activeMenu === "PurchasedProduct" && <PurchasedProduct />}
            {activeMenu === "Wish" && <Wish wish={wish} setWish={setWish} />}
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default UserInfo;
