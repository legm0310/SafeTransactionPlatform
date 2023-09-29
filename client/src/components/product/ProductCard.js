import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import Paging from "../common/Paging";

import classes from "../../styles/product/ProductCard.module.css";

const ProductCard = ({ filteredProducts }) => {
  console.log("card", filteredProducts);
  return (
    <Fragment>
      <div className={classes.prodCardWrap}>
        <div className={classes.prodCardContainer}>
          {filteredProducts?.map((product) => (
            <Link to={`/products/${product.id}`}>
              <div className={classes.prodCard}>
                <div className={classes.imgBox}>
                  <img src={product.image} className={classes.prodImg} alt="" />
                </div>
                <div className={classes.prodInfo}>
                  <div className={classes.prodName}>{product.title}</div>
                  <div className={classes.prodPrice}> {product.price}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default ProductCard;
