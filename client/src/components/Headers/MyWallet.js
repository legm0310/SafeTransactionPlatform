import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ErrorBoundary } from "react-error-boundary";
import PropTypes from "prop-types";
import Exchange from "./Exchange";
import classes from "../../styles/headers/MyWallet.module.css";

import {
  ConnectWallet,
  useContract,
  useAddress,
  useSwitchChain,
  useNetworkMismatch,
  useSDK,
  useTokenBalance,
  useSwitchAccount,
} from "@thirdweb-dev/react";
import { Sepolia } from "@thirdweb-dev/chains";

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
import pandaImg from "../../assets/platformImage.png";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
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

export default function MyWallet(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [showExchange, setShowExchange] = useState(false);

  const sdk = useSDK();
  const { contract } = useContract(process.env.REACT_APP_CONTRACT_ADDRESS);
  const address = useAddress();
  const isMismatched = useNetworkMismatch();
  const switchNetwork = useSwitchChain();
  const logError = (error, info) => {
    console.log(error, info);
  };
  const supportedTokens = {
    [Sepolia.chainId]: [
      {
        address: process.env.REACT_APP_CONTRACT_ADDRESS,
        name: "Panda",
        symbol: "PDT",
        icon: pandaImg,
      },
    ],
  };

  const displayToken = {
    [Sepolia.chainId]: process.env.REACT_APP_CONTRACT_ADDRESS,
  };

  const {
    data: tokenData,
    isLoading: balanceLoading,
    error: balanceError,
  } = useTokenBalance(contract, address);

  const handleClose = () => {
    props.onClose();
  };

  const handleOpenExchange = () => {
    if (!address) {
      return alert("지갑을 연결 해주세요.");
    }
    setShowExchange(true);
  };

  const handleCloseExchange = () => {
    setShowExchange(false);
  };

  const handleSwitchNetwork = async () => {
    try {
      await switchNetwork(Sepolia.chainId);
    } catch (error) {
      console.error("Failed to switch network", error);
    }
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.open || false}
        disableEnforceFocus
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
          className={classes["walletHeader"]}
        >
          지갑 관리
        </BootstrapDialogTitle>
        <DialogActions>
          <div className={classes.pdtOnHand}>
            <h4>
              잔여토큰:{" "}
              {address && !isMismatched
                ? `${tokenData?.displayValue || 0} ${tokenData?.symbol || ""}`
                : "-"}
            </h4>
          </div>
        </DialogActions>
        <DialogContent>
          <Typography gutterBottom></Typography>
          <Typography gutterBottom></Typography>

          {address && isMismatched ? (
            <div>
              <p>판다에서는 Sepolia 네트워크만 사용할 수 있습니다.</p>
              <p>네트워크를 전환해주세요.</p>

              <br />
              <Button
                onClick={handleSwitchNetwork}
                className={classes["networkSwitchButton"]}
              >
                네트워크 전환하기
              </Button>
            </div>
          ) : (
            <div className={classes.wallet}>
              <Button
                onClick={handleOpenExchange}
                className={classes["tokenIssuanceButton"]}
              >
                <p>토큰 발급받기</p>
              </Button>
              <ErrorBoundary onError={(error) => console.log(error)}>
                <ConnectWallet
                  type="submit"
                  theme="light"
                  btnTitle="지갑 연결"
                  dropdownPosition={{
                    align: "center",
                    side: "bottom",
                  }}
                  className={classes["connectWallet"]}
                  modalTitleIconUrl={""}
                  welcomeScreen={{
                    title: "연결할 지갑 선택하기",
                    subtitle: "지갑 연결 이후 서비스를 이용하실 수 있습니다.",
                  }}
                  hideTestnetFaucet={false}
                  supportedTokens={supportedTokens}
                  displayBalanceToken={displayToken}
                />
              </ErrorBoundary>
              <Exchange
                open={showExchange}
                handleCloseExchange={handleCloseExchange}
              />
            </div>
          )}
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
