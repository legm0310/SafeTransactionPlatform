import { contractGetterSDK } from "./contractCall";

export const callPurchaseDeposit = async (signer, productId, buyerId) => {
  try {
    const contract = await contractGetterSDK(signer);
    const data = await contract.call(
      "purchaseAmountDeposit",
      [productId, buyerId],
      {
        gasLimit: 1000000,
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const callRelease = async (signer, productId) => {
  try {
    const contract = await contractGetterSDK(signer);
    const data = await contract.call("purchaseConfirmation", [productId], {
      gasLimit: 1000000,
    });
  } catch (error) {
    console.log(error);
  }
};
