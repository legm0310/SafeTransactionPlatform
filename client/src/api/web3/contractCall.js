export const contractGetterSDK = async (sdk) => {
  const contract = await sdk?.getContract(
    process.env.REACT_APP_CONTRACT_ADDRESS
  );
  return contract;
};

export const testCall = async (sdk) => {
  const contract = await contractGetterSDK(sdk);
  const data = await contract.erc20.balance();
  console.log(data);
  return data;
};
