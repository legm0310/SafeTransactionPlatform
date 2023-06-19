import { Fragment } from "react";
import PropTypes from "prop-types";
import Modal from "../UI/Modal";

import classes from "../../styles/Exchange.module.css";
import {
  styled,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Input,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
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

const Exchange = (props) => {
  const handleClose = () => {
    props.handleCloseExchange();
  };

  return (
    <Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.open || false}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          환전하기
        </BootstrapDialogTitle>

        <DialogContent dividers>
          {/* <Typography gutterBottom></Typography>
          <Typography gutterBottom></Typography> */}
          <div>
            <Input placeholder="환전할 금액" />
          </div>
        </DialogContent>

        <DialogActions>
          <Button autoFocus onClick={handleClose} sx={{ color: "black" }}>
            환전하기
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </Fragment>
  );
};

export default Exchange;
