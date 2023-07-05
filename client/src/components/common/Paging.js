import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import Pagination from "react-js-pagination";

const Paging = () => {
  const [page, setPage] = useState(1);
  const products = useSelector(
    (state) => state.product.searchProduct?.products
  );

  const onPageChange = (page) => {
    setPage(page);
  };
  return (
    <Fragment>
      <Pagination
        activePage={page}
        itemsCountPerPage={10}
        totalItemsCount={450}
        pageRangeDisplayed={10}
        prevPageText={"‹"}
        nextPageText={"›"}
        onChange={onPageChange}
      />
    </Fragment>
  );
};

export default Paging;
