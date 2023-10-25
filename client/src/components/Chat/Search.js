import React, { Fragment } from "react";
import classes from "../../styles/chat/Chat.module.css";

import deleteBtn from "../../assets/icon-delete.svg";

const Search = ({ searchRoomName, setSearchRoomName }) => {
  const onSearchHandler = (event) => {
    setSearchRoomName(event.target.value);
  };

  const onSearchValueClear = () => {
    setSearchRoomName("");
  };

  return (
    <Fragment>
      <div className={classes.searchWrap}>
        <div className={classes.searchForm}>
          <input
            type="text"
            className={classes.searchInput}
            placeholder="검색"
            value={searchRoomName}
            onChange={onSearchHandler}
          />
          {searchRoomName.length > 0 ? (
            <div className={classes.clearSearchRoomName}>
              <img src={deleteBtn} onClick={onSearchValueClear} />
            </div>
          ) : null}
        </div>
      </div>
    </Fragment>
  );
};

export default Search;
