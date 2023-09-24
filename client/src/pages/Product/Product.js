import React, { Fragment, useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  getSearchRecentProducts,
} from "../../_actions/productAction";
import RecentProductsList from "../../components/product/RecentProducts";
import CategoryBar from "./CategoryBar";
import ProductCard from "./ProductCard";
import Paging from "../../components/common/Paging";
import { getItem } from "../../utils";

import classes from "../../styles/product/Product.module.css";

const Product = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  // 선택 카테고리 값 변경
  // const onCategoryClick = (productCategory) => {
  //   const filter = {};
  //   setSelectedCategory(productCategory);
  //   const searchWord = getItem("searchWord") ?? "";
  //   filter.search = searchWord;
  //   filter.category = selectedCategory ?? "";
  //   // filter.page = page ?? "";
  //   filter.status = "";
  //   dispatch(getProducts(filter)).then((response) => {
  //     console.log(response);
  //     setFilteredProducts(response.payload?.products);
  //   });
  // };

  const onCategoryClick = async (e) => {
    const filter = {};
    setSearchParams({ category: e.category });
    setSelectedCategory(e.category);
    const category = searchParams.get("category");
    console.log("카테고리 : ", category);
    filter.category = category;
    filter.status = "SALE";
    console.log("filter", filter);
    await dispatch(
      getSearchRecentProducts({
        status: filter.status,
        category: filter.category,
      })
    ).then((response) => {
      console.log("response", response);
      setFilteredProducts(response.payload?.products ?? []);
      console.log("prod :", response.payload?.products);
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
        {/* <div className={classes.categoryBox}>
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
        </div> */}

        <div className={classes.productWrap}>
          <div className={classes.categoryBar}>
            <CategoryBar onCategoryClick={onCategoryClick} />
          </div>

          {selectedCategory ? (
            <RecentProductsList />
          ) : (
            ((<ProductCard filteredProducts={filteredProducts} />),
            (<Paging />))
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Product;
