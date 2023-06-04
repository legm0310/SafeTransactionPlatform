import React, { Fragment, useState, useEffect } from "react";
import classes from "../../styles/Product.module.css";
import ProductCard from "./ProductCard";
import { Link, useNavigate } from "react-router-dom";

const Product = (props) => {
  const navigate = useNavigate();

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
  }, [selectedCategory]);

  return (
    <Fragment>
      <div className={classes.mainBox}>
        <Link to="/detail" className={classes.detail}>
          <div className={classes.categoryBox}>
            <div onClick={() => onCategoryClick("all")}>전체</div>
            <ul className={classes.category1}>
              <li onClick={() => onCategoryClick("men")}>남성의류</li>
              <li onClick={() => onCategoryClick("women")}>여성의류</li>
              <li onClick={() => onCategoryClick("acc")}>패션잡화</li>
              <li onClick={() => onCategoryClick("sports")}>스포츠 용품</li>
              <li onClick={() => onCategoryClick("shoes")}>신발</li>
            </ul>
            <ul className={classes.category2}>
              <li onClick={() => onCategoryClick("homeappliances")}>
                가전제품
              </li>
              <li onClick={() => onCategoryClick("computerPeripherals")}>
                컴퓨터/주변기기
              </li>
              <li onClick={() => onCategoryClick("electronic")}>전자제품</li>
              <li onClick={() => onCategoryClick("furniture")}>가구</li>
              <li onClick={() => onCategoryClick("etc")}>기타</li>
            </ul>
          </div>
        </Link>
        <div className={classes.productWrap}>
          <Link to="/detail" className={classes.detail}>
            <ProductCard products={filteredProducts} />
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default Product;
