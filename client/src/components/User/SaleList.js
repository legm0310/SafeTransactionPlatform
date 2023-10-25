import { Fragment } from "react";

import classes from "../../styles/user/SaleList.module.css";
import deleteBtn from "../../assets/icon-delete.svg";

const SaleList = () => {
  return (
    <Fragment>
      {/* <div className={classes.notSaleList}>
        <h2>판매중인 상품이 없습니다.</h2>
        <p>의미있는 상품을 판매해보세요!</p>
      </div> */}

      <div className={classes.saleList}>
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

              <div className={classes.wishListProductRemove}>
                <img
                  src={deleteBtn}
                  // onClick={() => onDeleteWishListHandler(product.id)}
                />
              </div>
            </div>
          ))} */}
        <div className={classes.saleProductWrap}>
          <div className={classes.saleProductImage}>
            <img src="" alt="" />
          </div>

          <div className={classes.saleProductInfo}>
            <p className={classes.productCategory}>category</p>
            <p className={classes.productName}>상품이름</p>
          </div>

          <div className={classes.productPrice}>
            <p>1000PDT</p>
          </div>

          <div className={classes.saleProductDetail}>
            <button className={classes.btnSubmit}>구매하기</button>
          </div>

          <div className={classes.saleProductRemove}>
            <img
              src={deleteBtn}
              // onClick={() => onDeleteWishListHandler(product.id)}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SaleList;
