import React, { Fragment, useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getSearchRecentProducts } from "../../_actions/productAction";
import RecentProductsList from "../../components/Product/RecentProducts";
import CategoryBar from "../../components/Product/CategoryBar";
import ProductCard from "../../components/Product/ProductCard";
import Paging from "../../components/common/Paging";

import classes from "../../styles/product/Product.module.css";

const Product = (props) => {
  const dispatch = useDispatch();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();

  const onCategoryClick = async (e) => {
    updateSearchParams(e);
    setPage(1);
  };

  const updateSearchParams = (e) => {
    searchParams.set("category", e.category);
    setSearchParams(searchParams);
  };

  const onPageChange = (page) => {
    setPage(page);
    searchParams.set("page", page);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    const filter = {};
    const category = searchParams.get("category") ?? "%";
    const search = searchParams.get("search") ?? "%";
    const page = searchParams.get("page") ?? "1";
    filter.category = category;
    filter.search = search;
    filter.page = page;

    dispatch(getSearchRecentProducts(filter)).then((response) => {
      setFilteredProducts(response.payload?.products ?? []);
      setCount(response.payload?.count);
    });
  }, [searchParams.get("category"), searchParams.get("search"), page]);

  return (
    <Fragment>
      <div className={classes.mainBox}>
        <div className={classes.productWrap}>
          <div className={classes.categoryBar}>
            <CategoryBar onCategoryClick={onCategoryClick} />
          </div>
          <div className={classes.prdouctCardWrap}>
            {searchParams.get("category") ? (
              <div>
                <ProductCard filteredProducts={filteredProducts} />
                {filteredProducts.length !== 0 ? (
                  <Paging
                    count={count}
                    onPageChange={onPageChange}
                    page={page}
                  />
                ) : null}
              </div>
            ) : (
              <RecentProductsList />
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Product;
