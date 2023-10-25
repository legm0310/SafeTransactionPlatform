import { Fragment } from "react";
import PropTypes from "prop-types";

import {
  styled,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Modal,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  // "& .MuiDialogContent-root": {
  //   padding: theme.spacing(2),
  // },
  // "& .MuiDialogActions-root": {
  //   padding: theme.spacing(1),
  // },
  "& .MuiDialog-paper": {
    borderRadius: "13px",
    width: "500px",
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

const Reciept = (props) => {
  const handleClose = () => {
    props.onClose();
  };

  return (
    <Fragment>
      <div>
        <BootstrapDialog></BootstrapDialog>
      </div>
    </Fragment>
  );
};

export default Reciept;
