import { Fragment, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Button from "../../components/common/Button";
import PropTypes from "prop-types";
import TransacDetailReceipt from "./TransacDetailReceipt";
// import TransactInfo from "./TransactInfo";

import { styled, Dialog, DialogTitle, IconButton } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import classes from "../../styles/receipt/ReleaseReceipt.module.css";

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
  const [activeMenu, setActiveMenu] = useState("TransacDetailReceipt");

  const location = useLocation();

  const handleClose = () => {
    props.onClose();
  };

  useEffect(() => {
    if (location.state && location.state.activeMenu)
      setActiveMenu(location.state.activeMenu);
  }, [location.state]);

  const onMenuHandler = (menu) => {
    setActiveMenu(menu);
  };

  return (
    <Fragment>
      <div>
        <BootstrapDialog
          aria-labelledby="customized-dialog-title"
          open={props.open || false}
          onClose={handleClose}
          // disableEnforceFocus
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

            <Button onClick={() => onMenuHandler("TransactInfo")}>
              <div
                className={`${classes.menuButton} ${
                  activeMenu === "TransactInfo" ? classes.active : ""
                }`}
              >
                <span>트랜잭션 정보</span>
              </div>
            </Button>
          </div>

          <div className={classes.userInfoExplanation}>
            {activeMenu === "TransacDetailReceipt" && <TransacDetailReceipt />}
            {/* {activeMenu === "TransactInfo" && (
              <TransactInfo />
            )} */}
          </div>
        </BootstrapDialog>
      </div>
    </Fragment>
  );
};

export default ReleaseReciept;
