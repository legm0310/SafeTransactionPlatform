import React, { Fragment } from "react";
import { useSelector } from "react-redux";

const ProductInformation = () => {
  const productDetail = useSelector(
    (state) => state.product.productDetail?.product
  );

  return (
    <Fragment>
      <div>{productDetail?.detail}</div>
    </Fragment>
  );
};

export default ProductInformation;
