import React, { Fragment } from "react";

import classes from "./PurchaseCard.module.css";

const PurchaseCard = (props) => {
  return (
    <Fragment>
      <div className={classes.prodCardWrap}>
        <div className={classes.prodCardContainer}>
          {props.products.map((product) => (
            <div className={classes.prodCard}>
              <div className={classes.imgBox}>
                <img src={product.imgFile} className={classes.prodImg} alt="" />
              </div>

              <div className={classes.prodInfo}>
                <div className={classes.prodName}>{product.name}</div>
                <div className={classes.prodPrice}> {product.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default PurchaseCard;
