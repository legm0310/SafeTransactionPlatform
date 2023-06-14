import { Sepolia } from "@thirdweb-dev/chains";
import { ThirdwebSDK } from "@thirdweb-dev/sdk/evm";

export const sdk = new ThirdwebSDK(Sepolia);
export const contract = await sdk.getContract(
  process.env.REACT_APP_CONTRACT_ADDRESS
);
