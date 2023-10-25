import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import classes from "../../styles/detail/Detail.module.css";
import defaultProfile from "../../assets/defaultProfile.png";

const ProductSellor = () => {
  const { productDetail } = useSelector((state) => state.product);
  return (
    <Fragment>
      <div className={classes.ProductSellorWrap}>
        <Link
          className={classes.userInfoLink}
          to={`/user/${productDetail?.seller_id}`}
        >
          <img src={defaultProfile} alt="" className={classes.testImg} />
        </Link>

        <div className={classes.sellerName}>
          <Link
            className={classes.userInfoLink}
            to={`/user/${productDetail?.seller_id}`}
          >
            {productDetail?.seller_name}
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductSellor;
