import React, { Fragment, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getSearchRecentProducts } from "../../_actions/productAction";
import ProductCard from "../../components/Product/ProductCard";

import classes from "../../styles/detail/Detail.module.css";

const RelatedProduct = (prodDetail) => {
  const dispatch = useDispatch();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const category = prodDetail.prodDetail?.category;
    const filter = {};
    filter.category = category;
    filter.status = "SALE";
    console.log(filter);
    dispatch(getSearchRecentProducts(filter)).then((response) => {
      setFilteredProducts(response.payload?.products ?? []);
    });
  }, []);

  return (
    <Fragment>
      <div className={classes.relatedProductWrap}>
        <div className={classes.relatedProduct}>
          <div className={classes.relatedProductHeader}>
            <p>연관상품</p>
            <ProductCard filteredProducts={filteredProducts} />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default RelatedProduct;
