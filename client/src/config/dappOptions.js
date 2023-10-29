import {
  metamaskWallet,
  embeddedWallet,
  coinbaseWallet,
  smartWallet,
  localWallet,
  magicLink,
} from "@thirdweb-dev/react";
import { Sepolia } from "@thirdweb-dev/chains";

const sdkOptions = {
  gasSettings: {
    speed: "fastest",
  },
};
const smartWalletConfig = {
  factoryAddress: process.env.REACT_APP_ACCOUNT_FACTORY_ADDRESS,
  gasless: true,
  personalWallet: [],
};

const smartWalletConfigThroughMetamask = metamaskWallet();
smartWalletConfigThroughMetamask.meta.name = "스마트 지갑(메타마스크)";

const metamaskConfig = metamaskWallet({ recommended: true });
metamaskConfig.meta.name = "메타마스크 지갑";
console.log(metamaskConfig.connectUI);
const coinbaseConfig = coinbaseWallet();
coinbaseConfig.meta.name = "코인베이스 지갑";

const supportedWallets = [
  smartWallet(localWallet(), smartWalletConfig),
  smartWallet(smartWalletConfigThroughMetamask, smartWalletConfig),
  smartWallet(coinbaseConfig, smartWalletConfig),
  smartWallet(embeddedWallet(), smartWalletConfig),
  smartWallet(
    magicLink({
      apiKey: process.env.REACT_APP_MAGIC_LINK_API,
      oauthOptions: {
        providers: ["google", "facebook", "twitter", "apple"],
      },
    })
  ),

  metamaskConfig,
  // coinbaseConfig,
];

export { Sepolia, supportedWallets, sdkOptions };
