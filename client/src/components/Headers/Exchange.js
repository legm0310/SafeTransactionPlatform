import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import {
  useContract,
  useAddress,
  useMintToken,
  useContractWrite,
} from "@thirdweb-dev/react";
import { setLoadings } from "../../_actions/uiAction";

import classes from "../../styles/headers/Exchange.module.css";
import {
  styled,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Input,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

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
  const dispatch = useDispatch();
  const [mintAmount, setMintAmount] = useState("");
  const { contract } = useContract(contractAddress);
  const address = useAddress();

  const { mutateAsync: tempExchangeToken, isLoading: mintLoading } =
    useContractWrite(contract, "tempExchangeToken");

  const handleClose = () => {
    props.handleCloseExchange();
  };

  const exchangeCall = async () => {
    try {
      const data = await tempExchangeToken({ args: [address, mintAmount] });
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  const callMintToken = () => {
    if (!mintAmount || isNaN(parseInt(mintAmount, 10))) {
      alert("토큰 갯수를 확인해주세요.");
      return;
    }

    dispatch(setLoadings({ isContractLoading: true }));
    exchangeCall()
      .then(() => dispatch(setLoadings({ isContractLoading: false })))
      .catch((err) => console.log(err));
    props.handleCloseExchange();
  };

  const onMintAmountHandler = (event) => {
    setMintAmount(event.currentTarget.value);
  };

  return (
    <Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.open || false}
        disableEnforceFocus
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          토큰 발급받기
        </BootstrapDialogTitle>

        <DialogContent dividers>
          <div>
            <Input
              required
              type="number"
              value={mintAmount}
              onChange={onMintAmountHandler}
              placeholder="발급할 토큰 갯수"
            />
          </div>
        </DialogContent>

        <DialogActions>
          <Button autoFocus onClick={callMintToken} sx={{ color: "black" }}>
            발급받기
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </Fragment>
  );
};

export default Exchange;
