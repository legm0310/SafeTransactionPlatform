import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import classes from "../../styles/product/Detail.module.css";
import defaultProfile from "../../assets/defaultProfile.png";

const ProductStore = () => {
  const productDetail = useSelector(
    (state) => state.product.productDetail?.product
  );
  return (
    <Fragment>
      <div className={classes.prodStoreWrap}>
        <div>
          <img src={defaultProfile} alt="" className={classes.testImg} />
        </div>
        <div className={classes.sellerName}>
          <Link
            className={classes.userInfoLink}
            to={`/user/${productDetail.seller_id}`}
          >
            {productDetail.seller_name}
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductStore;
