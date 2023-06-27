import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import store from "./store/store";

import "./index.css";

import { ThirdwebProvider } from "@thirdweb-dev/react";
import { SnackbarProvider } from "notistack";
import { ThemeProvider, createTheme } from "@mui/material";
import { Sepolia, supportedWallets, sdkOptions } from "./config/dappOptions";
import customTheme from "./config/customTheme";

const ThemedApp = () => {
  const basicTheme = createTheme({});
  return (
    <ThemeProvider theme={customTheme(basicTheme)}>
      <App />
    </ThemeProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ThirdwebProvider
      activeChain={Sepolia}
      supportedWallets={supportedWallets}
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
