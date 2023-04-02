import { Fragment } from "react";

import classes from "./InfoScreen.module.css";

const InforScreen = (props) => {
  return (
    <Fragment>
      <section className={classes.container}>
        <div className={classes.content1}>
          <h1>안전한 거래플랫폼</h1>
          <p>투명한 거래내역</p>
        </div>
        <div className={classes.content2}>dd</div>
      </section>
    </Fragment>
  );
};

export default InforScreen;
