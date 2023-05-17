import React, { Fragment, useState } from "react";
import classes from "./Purchase.module.css";
import PurchaseCard from "./PurchaseCard";
import { useNavigate } from "react-router-dom";

const Purchase = (props) => {

  const navigate = useNavigate();

  const handleProductClick = (productId) => {

    console.log(productId);
    if (productId) {
      // 상품 페이지로 이동하는 로직을 구현합니다.
      navigate(`/products/${productId}`);
    }
  };

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
        <div className={classes.latestProduct}>
          <h1>최근 등록 상품</h1>
          <div className={classes.latestProdList}>
            <div className={classes.latestProdCard}>
              <div>이미지</div>
              <h4>제목</h4>
              <h4>가격</h4>
            </div>
            <div className={classes.latestProdCard}>
              <div>이미지</div>
              <h4>제목</h4>
              <h4>가격</h4>
            </div>
            <div className={classes.latestProdCard}>
              <div>이미지</div>
              <h4>제목</h4>
              <h4>가격</h4>
            </div>
            <div className={classes.latestProdCard}>
              <div>이미지</div>
              <h4>제목</h4>
              <h4>가격</h4>
            </div>
          </div>
        </div>
        <div className={classes.productWrap}>
          <PurchaseCard products={props.purchaseCard} onProductClick={handleProductClick} />
        </div>
      </div>
    </Fragment>
  );
};

export default Purchase;
