import { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  useAddress,
  useContract,
  useContractRead,
  useContractWrite,
} from "@thirdweb-dev/react";

const AddProductButton = (props) => {
  const dispatch = useDispatch();
  const { contract } = useContract(process.env.REACT_APP_CONTRACT_ADDRESS);
  const address = useAddress();
  const { mutateAsync: addProduct, isLoading } = useContractWrite(
    contract,
    "addProduct"
  );

  const callAddProduct = async () => {
    try {
      const data = await addProduct({
        args: [props.sellerId, props.id, props.price],
        gasLimit: 1000000,
      });
    } catch (error) {
      console.error("failed to transfer batch tokens", error);
    }
  };

  useEffect(async () => {
    if (isLoading) {
      dispatch();
    }
  }, [isLoading]);

  return (
    <Fragment>
      <button onClick={() => console.log(balance)}>테스트버튼</button>
    </Fragment>
  );
};

export default AddProductButton;
