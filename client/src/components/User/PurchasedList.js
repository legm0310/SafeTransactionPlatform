import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ReleaseReciept from "../Receipt/ReleaseReceipt";

import classes from "../../styles/user/PurchasedList.module.css";

const PurchasedList = () => {
  const { isContractLoading } = useSelector((state) => state.ui);
  const [openReleaseReciept, setOpenReleaseReciept] = useState(false);

  const handleOpenReleaseReceipt = () => {
    setOpenReleaseReciept(true);
  };

  const handleCloseReleaseReceipt = () => {
    setOpenReleaseReciept(false);
  };

  return (
    <Fragment>
      {/* <div className={classes.notPurchasedList}>
        <h2>구매한 상품이 없습니다.</h2>
        <p>원하는 상품을 구매해보세요!</p>
      </div> */}

      <div className={classes.purchasedList}>
        {/* {prodDetail &&
          prodDetail.map((product) => (
            <div className={classes.wishListProductWrap}>
              <div className={classes.wishListProductImage}>
                <img src={product?.image} alt="" />
              </div>

              <div className={classes.wishListProductInfo}>
                <p className={classes.productCategory}>{product?.category}</p>
                <p className={classes.productName}>{product?.title}</p>
              </div>

              <div className={classes.productPrice}>
                <p>{product?.price}PDT</p>
              </div>

              <div className={classes.wishListProductPurchase}>
                <p className={classes.totalPrice}></p>
                <button className={classes.btnSubmit}>구매확정</button>
              </div>
            </div>
          ))} */}
        <div className={classes.purchasedProductWrap}>
          <div className={classes.purchasedProductImage}>
            <img src="" alt="" />
          </div>
          <div className={classes.purchasedProductInfo}>
            <p className={classes.productCategory}>category</p>
            <p className={classes.productName}>상품이름</p>
            <p className={classes.productPrice}>1000PDT</p>
          </div>

          <div className={classes.purchasedProductReceipt}>
            <button
              onClick={handleOpenReleaseReceipt}
              className={classes.btnSubmit}
            >
              거래내역
            </button>
          </div>
        </div>
      </div>
      <div className={classes.purchasedList}>
        {/* {prodDetail &&
          prodDetail.map((product) => (
            <div className={classes.wishListProductWrap}>
              <div className={classes.wishListProductImage}>
                <img src={product?.image} alt="" />
              </div>

              <div className={classes.wishListProductInfo}>
                <p className={classes.productCategory}>{product?.category}</p>
                <p className={classes.productName}>{product?.title}</p>
              </div>

              <div className={classes.productPrice}>
                <p>{product?.price}PDT</p>
              </div>

              <div className={classes.wishListProductPurchase}>
                <p className={classes.totalPrice}></p>
                <button className={classes.btnSubmit}>구매확정</button>
              </div>
            </div>
          ))} */}
        <div className={classes.purchasedProductWrap}>
          <div className={classes.purchasedProductImage}>
            <img src="" alt="" />
          </div>

          <div className={classes.purchasedProductInfo}>
            <p className={classes.productCategory}>category</p>
            <p className={classes.productName}>상품이름</p>
            <p className={classes.productPrice}>1000PDT</p>
          </div>

          <div className={classes.purchasedProductReceipt}>
            <button
              onClick={handleOpenReleaseReceipt}
              className={classes.btnSubmit}
            >
              거래내역
            </button>
          </div>
        </div>
      </div>

      <ReleaseReciept
        open={openReleaseReciept}
        onClose={handleCloseReleaseReceipt}
      />
    </Fragment>
  );
};

export default PurchasedList;
