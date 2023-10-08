import React, { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import Button from "../../components/common/Button";
import SaleList from "../../components/user/SaleList";
import ReservedProduct from "../../components/user/ReservedProduct";
import PurchasedProduct from "../../components/user/PurchasedProduct";
import WishList from "../../components/user/WishList";
import { getUser } from "../../_actions/userAction";
import { dateFormat } from "../../utils/dataParse";

import classes from "../../styles/user/UserInfo.module.css";

import defaultProfile from "../../assets/defaultProfile.png";
import { encodeConstructorParamsForImplementation } from "@thirdweb-dev/sdk";

const UserInfo = () => {
  const [activeMenu, setActiveMenu] = useState("SaleList");
  const location = useLocation();
  const dispatch = useDispatch();
  const { loadWishList } = useSelector((state) => state.user);
  const { id } = useParams();
  const userDetail = useSelector((state) => state.user.userDetail?.userData);

  const userName = userDetail?.user_name;
  const introduce = userDetail?.introduce;

  useEffect(() => {
    console.log("id", id);
    dispatch(getUser(id))
      .then((response) => {
        console.log(response);
      })
      .catch((err) => err);
    console.log(userDetail);
  }, []);

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
          <div className={classes.userProfileWrap}>
            <img src={defaultProfile} alt="" className={classes.testImg} />
            <div>{userName}</div>
          </div>
          <div className={classes.userDetailProfile}>
            <div className={classes.userNameWrap}>{userName}</div>
            <div className={classes.userStateWrap}>
              <time>
                {`가입 날짜 : ${dateFormat(
                  userDetail?.created_at,
                  "YYYY년 MM월 DD일"
                )} `}
              </time>
              {/* <div>상품 판매 개수</div> */}
            </div>
            <div className={classes.userIntroWrap}>{introduce}</div>
            <div className={classes.userIntroUpdateWrap}>
              <button>소개글 수정</button>
            </div>
          </div>
        </div>

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
