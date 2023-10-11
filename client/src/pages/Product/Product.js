import React, { Fragment, useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getSearchRecentProducts } from "../../_actions/productAction";
import RecentProductsList from "../../components/product/RecentProducts";
import CategoryBar from "../../components/product/CategoryBar";
import ProductCard from "../../components/product/ProductCard";
import Paging from "../../components/common/Paging";
import { getItem } from "../../utils";

import classes from "../../styles/product/Product.module.css";

const Product = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const onCategoryClick = async (e) => {
    updateSearchParams(e);
  };

  const updateSearchParams = (e) => {
    searchParams.set("category", e.category);
    setSearchParams(searchParams);
  };

  const handleResetFilter = (e) => {
    searchParams.set("category", "");
    searchParams.set("search", "");
    setSearchParams(searchParams);
  };

  useEffect(() => {
    const filter = {};
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    setSelectedCategory(category);
    filter.category = category;
    filter.status = "SALE";
    filter.search = search;
    dispatch(
      getSearchRecentProducts({
        status: filter.status,
        category: filter.category,
        search: filter.search,
      })
    ).then((response) => {
      setFilteredProducts(response.payload?.products ?? []);
    });
  }, [searchParams.get("category"), searchParams.get("search")]);

  return (
    <Fragment>
      <div className={classes.mainBox}>
        <div className={classes.categoryBar}>
          <CategoryBar onCategoryClick={onCategoryClick} />
          {/* <button onClick={handleResetFilter}>필터링 초기화</button> */}
        </div>
        <div className={classes.prdouctCardWrap}>
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
