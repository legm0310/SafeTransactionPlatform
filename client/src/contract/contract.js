import Web3 from "web3";
import { abi } from "../utils/abi";

export const contractGetterSDK = async (sdk) => {
  const contract = await sdk?.getContract(
    process.env.REACT_APP_CONTRACT_ADDRESS
  );
  return contract;
};

export const call = async (sdk) => {
  try {
    const contract = await contractGetterSDK(sdk);
    const data = await contract.call();
  } catch (err) {
    console.log(err);
  }
};

export const metadata = async (sdk) =>
  await contractGetterSDK(sdk)?.metadata.get();

export const testCall = async (sdk) => {
  const contract = await contractGetterSDK(sdk);
  const data = await contract.erc20.balance();
  console.log(data);
  return data;
};

export const getBlockNumber = async (sdk) => {
  // await contractGetterSDK(sdk)?.
};

export const contractGetterWeb3 = () => {
  const web3 = new Web3(
    new Web3.providers.HttpProvider(process.env.REACT_APP_INFURA_API)
  );
  const contract = new web3.eth.Contract(
    abi,
    process.env.REACT_APP_CONTRACT_ADDRESS
  );
  return contract;
};
