import React, { Fragment } from "react";

import classes from "./PurchaseList.module.css";

const PurchaseCard = (props) => {
  console.log(props.products);
  return (
    <Fragment>
      <div className={classes.prodCardWrap}>
        <div className={classes.prodCardContainer}>
          {props.products.map((product) => (
            <div className={classes.prodCard} onClick={() => props.onProductClick(product.productId)}
            key={product.id}>
              <div className={classes.imgBox}>
                <img src={product.imgFile} className={classes.prodImg} />
              </div>

              <div className={classes.prodInfo}>
                <br /> {product.name} <br /> {product.price} <br /> {product.productId}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default PurchaseCard;
