import React, { Fragment, useState } from "react";
import classes from "./Purchase.module.css";
import PurchaseCard from "./PurchaseCard";

const Purchase = (props) => {
  return (
    <Fragment>
      <div className={classes.mainBox}>
        <div className={classes.categoryBox}>
          <div>전체</div>
          <ul className={classes.category1}>
            <li>남성의류</li>
            <li>여성의류</li>
            <li>패션잡화</li>
            <li>스포츠 용품</li>
            <li>신발</li>
          </ul>
          <ul className={classes.category2}>
            <li>가전제품</li>
            <li>컴퓨터/주변기기</li>
            <li>전자제품</li>
            <li>가구</li>
            <li>기타</li>
          </ul>
        </div>

        <div className={classes.productWrap}>
          <PurchaseCard products={props.purchaseCard} />
        </div>
      </div>
    </Fragment>
  );
};

export default Purchase;
