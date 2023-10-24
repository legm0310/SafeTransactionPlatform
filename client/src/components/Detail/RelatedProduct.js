import React, { Fragment, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getSearchRecentProducts } from "../../_actions/productAction";
import ProductCard from "../../components/Product/ProductCard";
import RelatedProductSlide from "./RelateProductSlide";

import classes from "../../styles/detail/Detail.module.css";

const RelatedProduct = (prodDetail) => {
  const dispatch = useDispatch();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const category = prodDetail.prodDetail?.category;
    const productId = prodDetail.prodDetail?.id;
    const filter = {};
    filter.category = category;
    filter.status = "SALE";
    dispatch(getSearchRecentProducts(filter)).then((response) => {
      setFilteredProducts(
        response.payload?.products.filter((item) => item.id !== productId) ?? []
      );
    });
  }, []);

  return (
    <Fragment>
      <RelatedProductSlide filteredProducts={filteredProducts} />
    </Fragment>
  );
};

export default RelatedProduct;
