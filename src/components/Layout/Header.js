import { Fragment } from "react";

import classes from "./Header.module.css";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>SafeTransactionPlatform</h1>
        <p>login</p>
      </header>
    </Fragment>
  );
};

export default Header;
