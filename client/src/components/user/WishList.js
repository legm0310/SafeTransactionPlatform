import { Fragment } from "react";
import classes from "../../styles/user/WishList.module.css";

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
      </section>
    </Fragment>
  );
};

export default WishList;
