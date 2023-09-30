import React, { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import Button from "../../components/common/Button";
import SaleList from "../../components/user/SaleList";
import ReservedProduct from "../../components/user/ReservedProduct";
import PurchasedProduct from "../../components/user/PurchasedProduct";
import WishList from "../../components/user/WishList";

import classes from "../../styles/user/UserInfo.module.css";

const UserInfo = ({ wish, setWish }) => {
  const [activeMenu, setActiveMenu] = useState("OnSaleProduct");

  const location = useLocation();
  useEffect(() => {
    if (location.state && location.state.activeMenu)
      setActiveMenu(location.state.activeMenu);
  }, [location.state]);

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
            {activeMenu === "OnSaleProduct" && <SaleList />}
            {activeMenu === "ReservedProduct" && <ReservedProduct />}
            {activeMenu === "PurchasedProduct" && <PurchasedProduct />}
            {activeMenu === "Wish" && (
              <WishList wish={wish} setWish={setWish} />
            )}
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default UserInfo;
