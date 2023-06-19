import { Fragment, useState } from "react";
import ReactDOM from "react-dom";
import Modal from "../UI/Modal";

import classes from "../../styles/Exchange.module.css";
import { Button } from "@mui/material";

const Exchange = (props) => {
  return (
    <Fragment>
      <Modal>
        <div className={classes.modal}>
          <div className={classes.content}>
            <h3>Smart Contract</h3>
            <h3>Interaction</h3>
            <div className={classes.loadingText}>
              <p>Data on the blockchain</p>
              <p>Recording.</p>
            </div>
          </div>
        </div>
      </Modal>

      <Button onClick={props.onOpenExchange}>Exchange money</Button>
    </Fragment>
  );
};

export default Exchange;
