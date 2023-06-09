import React, { Fragment, useState, useEffect } from "react";
import RecentProductsList from "../../components/RecentProductsList";

import classes from "../../styles/Product.module.css";

const Product = (props) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredProducts, setFilteredProducts] = useState([]);

  // 선택 카테고리 값 변경
  const onCategoryClick = (productCategory) => {
    setSelectedCategory(productCategory);
    console.log(productCategory);
  };

  useEffect(() => {
    // 선택한 카테고리에 따라 제품을 필터링
    const filtered =
      selectedCategory === "all"
        ? props.ProductCard
        : props.ProductCard.filter(
            (card) =>
              card.productCategory &&
              card.productCategory.includes(selectedCategory)
          );
    setFilteredProducts(filtered);
  }, [selectedCategory, props.ProductCard]);

  return (
    <Fragment>
      <div className={classes.mainBox}>
        <div className={classes.categoryBox}>
          <div onClick={() => onCategoryClick("전체")}>전체</div>
          <ul className={classes.category1}>
            <li onClick={() => onCategoryClick("남성의류")}>남성의류</li>
            <li onClick={() => onCategoryClick("여성의류")}>여성의류</li>
            <li onClick={() => onCategoryClick("패션잡화")}>패션잡화</li>
            <li onClick={() => onCategoryClick("스포츠 용품")}>스포츠 용품</li>
            <li onClick={() => onCategoryClick("신발")}>신발</li>
          </ul>
          <ul className={classes.category2}>
            <li onClick={() => onCategoryClick("가전제품")}>가전제품</li>
            <li onClick={() => onCategoryClick("컴퓨터/주변기기")}>
              컴퓨터/주변기기
            </li>
            <li onClick={() => onCategoryClick("전자제품")}>전자제품</li>
            <li onClick={() => onCategoryClick("가구")}>가구</li>
            <li onClick={() => onCategoryClick("기타")}>기타</li>
          </ul>
        </div>
        <div className={classes.productWrap}>
          <RecentProductsList />
        </div>
      </div>
    </Fragment>
  );
};

export default Product;
