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
    return error;
  }
};

export const callPurchaseDeposit = async (sdk, prodTuple, buyerId) => {
  try {
    const contract = await contractGetterSDK(sdk);
    const data = await contract.call(
      "purchaseAmountDeposit",
      [prodTuple, buyerId],
      {
        gasLimit: 1000000,
      }
    );
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const callPurchaseConfirm = async (sdk, escrowId) => {
  try {
    const contract = await contractGetterSDK(sdk);
    const data = await contract.call("purchaseConfirmation", [escrowId], {
      gasLimit: 1000000,
    });
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const callOnRelease = async (sdk, escrowId) => {
  try {
    const contract = await contractGetterSDK(sdk);
    const data = await contract.call("onRelease", [escrowId], {
      gasLimit: 1000000,
    });
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
