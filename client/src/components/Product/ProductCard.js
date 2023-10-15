import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import Paging from "../common/Paging";

import classes from "../../styles/product/ProductCard.module.css";

const ProductCard = ({ filteredProducts }) => {
  console.log("card", filteredProducts);
  return (
    <Fragment>
      {filteredProducts.length === 0 ? (
        <p>상품이 등록되어 있지 않습니다.</p>
      ) : (
        <div className={classes.prodCardWrap}>
          <div className={classes.prodCardContainer}>
            {filteredProducts?.map((product) => (
              <div key={product.id} className={classes.prodCard}>
                <Link to={`/products/${product.id}`}>
                  <div className={classes.imgBox}>
                    <img
                      src={product.image}
                      className={classes.prodImg}
                      alt=""
                    />

                    {product.status === "RESERVED" && (
                      <div className={classes.reserved}>
                        <h2>구매진행중</h2>
                      </div>
                    )}

                    {product.status == "SOLD" ? (
                      <div className={classes.reserved}>
                        <h2>판매완료</h2>
                      </div>
                    ) : null}
                  </div>
                  <div className={classes.prodInfo}>
                    <div className={classes.prodName}>{product.title}</div>
                    <div className={classes.prodPrice}>
                      {" "}
                      {product.price.toLocaleString()}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default ProductCard;
