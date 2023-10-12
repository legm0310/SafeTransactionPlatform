import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import classes from "../../styles/detail/Detail.module.css";
import defaultProfile from "../../assets/defaultProfile.png";

const ProductSellor = () => {
  const prodDetail = useSelector(
    (state) => state.product.productDetail?.product
  );
  console.log(prodDetail);
  return (
    <Fragment>
      <div className={classes.ProductSellorWrap}>
        <Link
          className={classes.userInfoLink}
          to={`/user/${prodDetail?.seller_id}`}
        >
          <img src={defaultProfile} alt="" className={classes.testImg} />
        </Link>

        <div className={classes.sellerName}>
          <Link
            className={classes.userInfoLink}
            to={`/user/${prodDetail?.seller_id}`}
          >
            {prodDetail?.seller_name}
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductSellor;
