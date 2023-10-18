import React, { Fragment } from "react";
import Pagination from "react-js-pagination";
import "../../styles/common/Paging.css";

// count : 총 아이템의 개수
// page : 현재 페이지
// items : 가져올 아이템
const Paging = ({ count, onPageChange, page }) => {
  return (
    <Fragment>
      <Pagination
        activePage={page}
        itemsCountPerPage={12}
        totalItemsCount={count}
        pageRangeDisplayed={10}
        prevPageText={"‹"}
        nextPageText={"›"}
        onChange={onPageChange}
      />
    </Fragment>
  );
};

export default Paging;
