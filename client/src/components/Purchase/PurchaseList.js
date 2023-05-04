import React, { Fragment } from "react";

import classes from "./PurchaseList.module.css";

const PurchaseCard = (props) => {
  return (
    <Fragment>
      <div className={classes.prodCardWrap}>
        <div className={classes.prodCardContainer}>
          {props.products.map((product) => (
            <div className={classes.prodCard}>
              <div className={classes.imgBox}>
                <img src={product.imgFile} className={classes.prodImg} />
              </div>

              <div className={classes.prodInfo}>
                <br /> {product.name} <br /> {product.price}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default PurchaseCard;
