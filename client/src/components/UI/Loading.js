import React, { Fragment } from "react";
import BounceLoader from "react-spinners/BounceLoader";

import classes from "../../styles/Loading.module.css";

const override = {
  display: "flex",

  margin: "0 auto",
  borderColor: "#E50915",
  textAlign: "center",
};

const Loading = () => {
  return (
    <Fragment>
      <div className={classes.loadingWrap}>
        <div clasName={classes.loading}>
          <h2>로딩중...</h2>

          <BounceLoader color="#1ecfba" size={100} />
        </div>
      </div>
    </Fragment>
  );
};

export default Loading;
