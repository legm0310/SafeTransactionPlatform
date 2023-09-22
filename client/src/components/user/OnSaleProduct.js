import { Fragment } from "react";
import classes from "../../styles/user/OnSaleProduct.module.css";

const OnSaleProduct = () => {
  return (
    <Fragment>
      <div className={classes.notSaleList}>
        <h2>판매중인 상품이 없습니다.</h2>
        <p>의미있는 상품을 판매해보세요!</p>
      </div>
    </Fragment>
  );
};

export default OnSaleProduct;
