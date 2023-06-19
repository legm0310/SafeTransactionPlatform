import React, { Fragment } from "react";
import BounceLoader from "react-spinners/BounceLoader";
import ContractLoading from "./ContractLoading";

import classes from "../../styles/Loading.module.css";

const Loading = () => {
  return (
    <Fragment>
      <div className={classes.loadingWrap}>
        <div className={classes.loading}>
          {/* <ContractLoading /> */}
          <BounceLoader color="#1ecfba" size={130} />
        </div>
        <div className={classes.loadingText}>
          <h2>LOADING</h2>
          <span>
            <h2>.</h2>
          </span>
          <span>
            <h2>.</h2>
          </span>
          <span>
            <h2>.</h2>
          </span>
        </div>
      </div>
    </Fragment>
  );
};

export default Loading;
