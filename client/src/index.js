import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import store from "./store/store";

import {
  ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
  walletConnectV1,
} from "@thirdweb-dev/react";
import { Sepolia } from "@thirdweb-dev/chains";

import "./index.css";
import { SnackbarProvider } from "notistack";
import { ThemeProvider, createTheme } from "@mui/material";
import customTheme from "./config/customTheme";

const sdkOptions = {
  gasSettings: {
    speed: "fastest",
  },
  // gasless: {},
};
// const smartWalletConfig = {
//   factoryAddress: "",
//   gasless: true,
//   thirdwebApiKey: process.env.REACT_APP_THIRDWEB_API_KEY,
//   personalWallets: [metamaskWallet(), coinbaseWallet(), walletConnectV1()],
// };

const ThemedApp = () => {
  const basicTheme = createTheme({});
  return (
    <ThemeProvider theme={basicTheme}>
      <ThemeProvider theme={customTheme}>
        <App />
      </ThemeProvider>
    </ThemeProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ThirdwebProvider
      activeChain={Sepolia}
      supportedWallets={[metamaskWallet(), coinbaseWallet(), walletConnectV1()]}
      sdkOptions={sdkOptions}
    >
      <SnackbarProvider
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
          marginTop: "70px",
        }}
        autoHideDuration={2500}
      >
        <ThemedApp />
      </SnackbarProvider>
    </ThirdwebProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
