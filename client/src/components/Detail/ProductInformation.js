import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import classes from "../../styles/detail/Detail.module.css";

const ProductInformation = () => {
  const { productDetail } = useSelector((state) => state.product);
  return (
    <Fragment>
      <div
        className={classes.prodInfoWrap}
        style={{ whiteSpace: "pre-line", overflow: "auto" }}
      >
        {productDetail?.detail}
      </div>
    </Fragment>
  );
};

export default ProductInformation;
