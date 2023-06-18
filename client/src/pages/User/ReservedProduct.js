import { Fragment } from "react";
import {
  useContractEvents,
  useContract,
  useAddress,
} from "@thirdweb-dev/react";

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

const ReservedProduct = () => {
  const { contract } = useContract(contractAddress);
  const address = useAddress();

  return (
    <Fragment>
      <h1>구매진행상품</h1>
    </Fragment>
  );
};

export default ReservedProduct;
