import { Fragment } from "react";
import classes from "../../styles/user/PurchasedProduct.module.css";

const PurchasedProduct = () => {
  return (
    <Fragment>
      <div className={classes.notPurchasedList}>
        <h2>구매한 상품이 없습니다.</h2>
        <p>원하는 상품을 구매해보세요!</p>
      </div>
    </Fragment>
  );
};

export default PurchasedProduct;
