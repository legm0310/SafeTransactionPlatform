import { Fragment } from "react";
import classes from "../../styles/user/WishList.module.css";
import testImg from "../../assets/test.jpg";

const WishList = () => {
  return (
    <Fragment>
      <header className={classes.wishListWrap}>
        <div className={classes.tabTitle}>
          <input type="checkbox" />
          <span>상품정보</span>
          <span>상품금액</span>
          <span>주문하기</span>
        </div>
      </header>

      <section className={classes.wishList}>
        <input type="checkbox" />
        <div className={classes.wishListProductWrap}>
          <div className={classes.wishListProductImage}>
            <img src={testImg} alt="" />
          </div>

          <div className={classes.wishListProductInfo}>
            <p>전자제품</p>
            <p>컴퓨터</p>
            <p>1000PDT</p>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default WishList;
