import React, { Fragment } from "react";
import classes from "../../styles/chat/Chat.module.css";

const Search = () => {
  return (
    <Fragment>
      <div className={classes.searchWrap}>
        <div className={classes.searchForm}>
          <input
            type="text"
            className={classes.searchInput}
            placeholder="검색"
          />
        </div>
      </div>
    </Fragment>
  );
};

export default Search;
