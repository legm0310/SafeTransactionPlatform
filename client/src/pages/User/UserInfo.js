import React, { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import Button from "../../components/common/Button";
import SaleList from "../../components/user/SaleList";
import ReservedProduct from "../../components/user/ReservedProduct";
import PurchasedProduct from "../../components/user/PurchasedProduct";
import WishList from "../../components/user/WishList";
import UserProfile from "../../components/user/UserProfile";

import classes from "../../styles/user/UserInfo.module.css";

const UserInfo = () => {
  const [activeMenu, setActiveMenu] = useState("SaleList");

  const location = useLocation();
  const { loadWishList } = useSelector((state) => state.user);

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
        <UserProfile />
        <div className={classes.userInfoMenuWrap}>
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

          <div className={classes.userInfoExplanation}>
            {activeMenu === "SaleList" && <SaleList />}
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
