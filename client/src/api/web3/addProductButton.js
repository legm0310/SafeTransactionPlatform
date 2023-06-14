import { toEther } from "@thirdweb-dev/react";
import { contract } from "./contractCall";
export const AddProductButton = async (address) => {
  try {
    const data = await contract.call("balanceOf", [address]);
    console.log(toEther(data));
    return toEther(data);
  } catch (error) {
    console.log(error);
  }
};
