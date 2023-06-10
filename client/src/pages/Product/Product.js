import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getProducts } from "../../_actions/productAction";
import RecentProductsList from "../../components/RecentProductsList";
import ProductCard from "./ProductCard";

import { getItem } from "../../utils";

import classes from "../../styles/Product.module.css";
import Paging from "../../components/UI/Paging";

const Product = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // 선택 카테고리 값 변경
  const onCategoryClick = (productCategory) => {
    const filter = {};
    setSelectedCategory(productCategory);
    const searchWord = getItem("searchWord") ?? "";
    filter.search = searchWord;
    filter.category = selectedCategory ?? "";
    // filter.page = page ?? "";
    filter.status = "";
    dispatch(getProducts(filter)).then((response) => {
      console.log(response);
      setFilteredProducts(response.payload?.products);
    });
  };

  useEffect(() => {
    // 선택한 카테고리에 따라 제품을 필터링

    // const filtered =
    //   selectedCategory === null
    //     ? props.ProductCard
    //     : props.ProductCard.filter(
    //         (card) =>
    //           card.productCategory &&
    //           card.productCategory.includes(selectedCategory)
    //       );
    setFilteredProducts();
  }, [selectedCategory]);

  return (
    <Fragment>
      <div className={classes.mainBox}>
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
            <li onClick={() => onCategoryClick("homeappliances")}>가전제품</li>
            <li onClick={() => onCategoryClick("computerPeripherals")}>
              컴퓨터/주변기기
            </li>
            <li onClick={() => onCategoryClick("electronic")}>전자제품</li>
            <li onClick={() => onCategoryClick("furniture")}>가구</li>
            <li onClick={() => onCategoryClick("etc")}>기타</li>
          </ul>
        </div>

        <div className={classes.productWrap}>
          {selectedCategory ? (
            ((<ProductCard />), (<Paging />))
          ) : (
            <RecentProductsList />
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Product;
