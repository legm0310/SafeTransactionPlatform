import { contractGetterSDK } from "./contractCall";

export const callAddProduct = async (sdk, prodData) => {
  try {
    const contract = await contractGetterSDK(sdk);
    const data = await contract.call(
      "addProduct",
      [prodData.seller_id, prodData.id, prodData.price],
      {
        gasLimit: 1000000, // override default gas limit
      }
    );
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
