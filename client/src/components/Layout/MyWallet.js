import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import {
  ConnectWallet,
  useMetamask,
  useDisconnect,
  useContract,
  useAddress,
  Web3Button,
  useSwitchChain,
  useNetworkMismatch,
  useSDK,
  useTokenBalance,
} from "@thirdweb-dev/react";
import { Sepolia } from "@thirdweb-dev/chains";
import { testCall } from "../../api/web3/contractCall";

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
import {
  Close as CloseIcon,
  WalletRounded as WalletRoundedIcon,
} from "@mui/icons-material";

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
          onClick={onClose}
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

export default function MyWallet() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [open, setOpen] = useState(false);

  const sdk = useSDK();
  const { contract } = useContract(process.env.REACT_APP_CONTRACT_ADDRESS);
  const address = useAddress();
  const connectMetamask = useMetamask();
  const disconnectWallet = useDisconnect();
  const isMismatched = useNetworkMismatch();
  const switchNetwork = useSwitchChain();
  const {
    data: tokenData,
    isLoading,
    error,
  } = useTokenBalance(contract, address);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleConnectWallet = async () => {
    try {
      await connectMetamask();
      if (isMismatched) {
        await switchNetwork(Sepolia.chainId);
      }
    } catch (error) {
      console.error("Failed to connect wallet", error);
    }
  };

  const handleSwitchNetwork = async () => {
    try {
      await switchNetwork(Sepolia.chainId);
    } catch (error) {
      console.error("Failed to switch network", error);
    }
  };

  const handleTestButton = async () => {
    const data = await testCall(sdk);
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>
        <WalletRoundedIcon sx={{ fontSize: 30, color: "#1ecfba" }} />
        <Typography sx={{ color: "#707070" }}>지갑</Typography>
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          내 지갑 관리
        </BootstrapDialogTitle>
        <DialogContent dividers>
          {/* <Typography gutterBottom>내 돈 5조 5억 BB</Typography> */}
          <Typography gutterBottom>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
          </Typography>
          <Typography gutterBottom>
            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo
          </Typography>

          {/* // <button onClick={handleConnectWallet}>지갑 연결하기</button> */}
          {address && isMismatched ? (
            <div>
              <div>지갑 네트워크를 전환해주세요</div>
              <button onClick={handleSwitchNetwork}>네트워크 전환하기</button>
            </div>
          ) : (
            <ConnectWallet
              type="submit"
              theme="white"
              btnTitle="지갑 연결"
              // detailsBtn={() => {
              //   return <button>hi</button>;
              // }}
              dropdownPosition={{
                align: "center",
                side: "bottom",
              }}
            />
          )}
          <Web3Button />
          <h3>{`잔액: ${tokenData?.displayValue || 0} ${
            tokenData?.symbol || ""
          }`}</h3>
          <button onClick={handleTestButton}>테스트 호출</button>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}