import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Button from "../../components/common/Button";
import PropTypes from "prop-types";
import TransacDetailReceipt from "./TransacDetailReceipt";
// import TransactInfo from "./TransactInfo";
import {
  useSDK,
  useContract,
  useAddress,
  useContractEvents,
} from "@thirdweb-dev/react";
import { getReceipt } from "../../contract/getEvents";

import { styled, Dialog, DialogTitle, IconButton } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import classes from "../../styles/receipt/ReleaseReceipt.module.css";

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: "13px",
    width: "1400px",
    margin: 0,
  },
  "& .MuiPaper-root": {
    borderRadius: "13px",
    maxWidth: "1400px !important",
    margin: 0,
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={props.onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const ReleaseReciept = (props) => {
  const sdk = useSDK();
  const { contract } = useContract(contractAddress);
  const address = useAddress();

  const [activeMenu, setActiveMenu] = useState("TransacDetailReceipt");
  const [txData, setTxData] = useState(null);
  const location = useLocation();

  const handleClose = () => {
    props.onClose();
  };

  const getTxReciept = async (event) => {
    const filter = {
      buyer: address,
    };
    const logs = await getReceipt(sdk, event, filter);
    const filteredLogs =
      event === "EscrowDeposit"
        ? await logs.filter((log) => {
            console.log(log);
            return parseInt(log?.data.productId._hex) == +props.product.id;
          })
        : await logs.filter(
            (log) => parseInt(log?.data.escrowId._hex) == +props.product.id
          );

    return filteredLogs;
  };

  useEffect(() => {
    console.log(props.product);
    getTxReciept(props.event).then((data) => {
      setTxData(data[0] || []);
    });
  }, []);

  const onMenuHandler = (menu) => {
    setActiveMenu(menu);
  };

  return (
    <div>
      <BootstrapDialog
        aria-labelledby="customized-dialog-title"
        open={props.open || false}
        onClose={handleClose}
        sx={{ overflow: "hidden" }}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
          style={{ padding: "15px 30px 15px 30px" }}
        >
          거래내역(영수증)
        </BootstrapDialogTitle>

        <div className={classes.userInfoMenu}>
          <Button onClick={() => onMenuHandler("TransacDetailReceipt")}>
            <div
              className={`${classes.menuButton1} ${
                activeMenu === "TransacDetailReceipt" ? classes.active : ""
              }`}
            >
              <span>거래내역(영수증)</span>
            </div>
          </Button>
        </div>

        <div
          className={classes.userInfoExplanation}
          style={{ overflowY: "auto" }}
        >
          {activeMenu === "TransacDetailReceipt" && (
            <TransacDetailReceipt txData={txData} event={props.event} />
          )}
        </div>
      </BootstrapDialog>
    </div>
  );
};

export default ReleaseReciept;
