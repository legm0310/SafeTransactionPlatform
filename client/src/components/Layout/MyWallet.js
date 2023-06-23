import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import Exchange from "../User/Exchange";
import { getLatestBlocks } from "../../utils/eventQuery";

import {
  ConnectWallet,
  useContract,
  useAddress,
  useSwitchChain,
  useNetworkMismatch,
  useSDK,
  useTokenBalance,
  useContractEvents,
  getBlockNumber,
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
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import {
  getEscrowCreateEvents,
  getEscrowEventsFromWeb3js,
} from "../../contract/getEvents";

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

export default function MyWallet(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [showExchange, setShowExchange] = useState(false);

  const sdk = useSDK();
  const { contract } = useContract(process.env.REACT_APP_CONTRACT_ADDRESS);
  const address = useAddress();
  const isMismatched = useNetworkMismatch();
  const switchNetwork = useSwitchChain();
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
        >
          내 지갑 관리
        </BootstrapDialogTitle>

        <DialogContent dividers>
          <Typography gutterBottom>
            {/* Praesent commodo cursus magna, vel scelerisque nisl consectetur et. */}
          </Typography>
          <Typography gutterBottom>
            {/* Aenean lacinia bibendum nulla sed consectetur. Praesent commodo */}
          </Typography>

          {address && isMismatched ? (
            <div>
              <div>
                판다에서는 Sepolia 네트워크만 사용할 수 있습니다. <br />
                네트워크를 전환해주세요.
              </div>
              <br />
              <Button onClick={handleSwitchNetwork} sx={{ color: "black" }}>
                네트워크 전환하기
              </Button>
            </div>
          ) : (
            <div>
              <ConnectWallet
                type="submit"
                theme="white"
                btnTitle="지갑 연결"
                dropdownPosition={{
                  align: "center",
                  side: "bottom",
                }}
              />
              <Button onClick={handleOpenExchange} sx={{ color: "black" }}>
                <p>토큰 발급받기</p>
              </Button>
              <Exchange
                open={showExchange}
                handleCloseExchange={handleCloseExchange}
              />
            </div>
          )}
        </DialogContent>

        <DialogActions>
          <div>
            <h3>
              {address && !isMismatched
                ? `${tokenData?.displayValue || 0} ${tokenData?.symbol || ""}`
                : null}
            </h3>
          </div>
          {/* <Button autoFocus sx={{ color: "black" }}>
            테스트호출
          </Button> */}
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
