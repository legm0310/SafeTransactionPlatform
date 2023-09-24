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
  const initCategory = searchParams.get("category");
  console.log(initCategory);

  const onCategoryClick = async (e) => {
    updateSearchParams(e);
  };

  const updateSearchParams = (e) => {
    setSearchParams(e);
  };

  useEffect(() => {
    const filter = {};
    const category = searchParams.get("category");
    setSelectedCategory(category);
    filter.category = category;
    filter.status = "SALE";
    dispatch(
      getSearchRecentProducts({
        status: filter.status,
        category: filter.category,
      })
    ).then((response) => {
      console.log("response", response);
      setFilteredProducts(response.payload?.products ?? []);
      console.log("prod :", response.payload?.products);
      console.log("filtered", filteredProducts);
    });
  }, [searchParams.get("category")]);

  return (
    <Fragment>
      <div className={classes.mainBox}>
        <div className={classes.productWrap}>
          <div className={classes.categoryBar}>
            <CategoryBar onCategoryClick={onCategoryClick} />
          </div>

          {selectedCategory ? (
            <ProductCard filteredProducts={filteredProducts} />
          ) : (
            // (<Paging />)
            <RecentProductsList />
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Product;
