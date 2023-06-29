import { contractGetterSDK } from "./contract";

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

export const callPurchaseDeposit = async (sdk, productId, buyerId) => {
  try {
    const contract = await contractGetterSDK(sdk);
    const data = await contract.call(
      "purchaseAmountDeposit",
      [productId, buyerId],
      {
        gasLimit: 1000000,
      }
    );
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const callRelease = async (sdk, productId) => {
  try {
    const contract = await contractGetterSDK(sdk);
    const data = await contract.call("purchaseConfirmation", [productId], {
      gasLimit: 1000000,
    });
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
