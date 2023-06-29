import { contractGetterSDK } from "./contract";

export const getEscrow = async (sdk, prodData) => {
  try {
    const contract = await contractGetterSDK(sdk);
    const data = await contract.call("getEscrow", [prodData.id], {
      gasLimit: 1000000, // override default gas limit
    });
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
