import { Fragment } from "react";
import {
  useContractEvents,
  useContract,
  useAddress,
} from "@thirdweb-dev/react";
import Button from "../../components/UI/Button";
import testImg from "../../assets/mainImg.png";

import classes from "../../styles/ReservedProduct.module.css";

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

const ReservedProduct = () => {
  const { contract } = useContract(contractAddress);
  const address = useAddress();

  return (
    <Fragment>
      <div className={classes.reservedWrap}>
        <div className={classes.reserved}>
          <div className={classes.reservedImg}>
            <img src={testImg} alt="" />
          </div>

          <div className={classes.reservedDetail}>
            <div className={classes.rservedTitle}>
              <p>구매진행상품 1</p>
            </div>

            <div className={classes.rservedPrice}>
              <p>1,500PDT</p>
            </div>
          </div>

          <div className={classes.reservedButtonWrap}>
            <Button>
              <div className={classes.reservedButton}>구매확정</div>
            </Button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ReservedProduct;
