import { Fragment } from "react";
import classes from "../../styles/user/WishList.module.css";
import testImg from "../../assets/test.jpg";
import deleteBtn from "../../assets/icon-delete.svg";

const WishList = ({ wish }) => {
  return (
    <Fragment>
      {/* <header className={classes.wishListWrap}>
        <div className={classes.tabTitle}>
          <input type="checkbox" />
          <span>상품정보</span>
          <span>상품금액</span>
          <span>주문하기</span>
        </div>
      </header> */}

      <section className={classes.wishList}>
        <input type="checkbox" />
        <div className={classes.wishListProductWrap}>
          <div className={classes.wishListProductImage}>
            <img src={wish?.image} alt="" />
          </div>

          <div className={classes.wishListProductInfo}>
            <p className={classes.productCategory}>{wish?.category}</p>
            <p className={classes.productName}>{wish?.name}</p>
          </div>

          <div className={classes.productPrice}>
            <p>{wish?.price}PDT</p>
          </div>

          <div className={classes.wishListProductPurchase}>
            <p className={classes.totalPrice}></p>
            <button className={classes.btnSubmit}>구매하기</button>
          </div>

          <div className={classes.wishListProductRemove}>
            <img src={deleteBtn} />
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default WishList;
