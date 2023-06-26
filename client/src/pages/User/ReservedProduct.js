import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  // useContractEvents,
  useSDK,
  useContract,
  useAddress,
} from "@thirdweb-dev/react";
import { getPurchasedProducts, release } from "../../_actions/productAction";
import { setLoadings } from "../../_actions/uiAction";
import { getEventsFromWeb3js } from "../../contract/getEvents";
import Button from "../../components/UI/Button";

import classes from "../../styles/ReservedProduct.module.css";

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

const ReservedProduct = () => {
  const dispatch = useDispatch();
  const prodDetail =
    useSelector((state) => state.product.purchasedProducts?.products) ?? [];
  const [productIds, setProductIds] = useState();

  const sdk = useSDK();
  const { contract } = useContract(contractAddress);
  const address = useAddress();
  // const { data, isLoading, error } = useContractEvents(contract, "");

  const handleGetEventsLog = async () => {
    const log = await getEventsFromWeb3js(address);
    console.log(log);
    const prodIdLog = log.map((event) =>
      parseInt(event.returnValues.productId)
    );
    console.log(prodIdLog);
    setProductIds([...prodIdLog]);
    return prodIdLog;
  };

  const onReleaseHandler = (id) => {
    dispatch(setLoadings({ isLoading: true }));
    const data = {
      productId: id,
      sdk: sdk,
    };
    dispatch(release(data)).then((response) => {
      console.log(response);
      if (response.payload.updated) {
        alert("계약의 예치된 토큰이 판매자에게 전송됩니다.");
      } else {
        alert("구매 확정에 실패했습니다.");
      }
    });
  };

  useEffect(() => {
    handleGetEventsLog().then((value) =>
      dispatch(getPurchasedProducts({ productIds: value }))
        .then(console.log(prodDetail))
        .catch((err) => console.log(err))
    );
  }, []);

  return (
    <Fragment>
      <h1>구매진행상품</h1>
      <div className={classes.reservedWrap}>
        {prodDetail.map((product) => (
          <div key={product?.id} className={classes.reserved}>
            <div className={classes.reservedImg}>
              <img src={product?.image} alt="" />
            </div>

            <div className={classes.reservedDetail}>
              <div className={classes.rservedTitle}>
                <p>{product?.title} </p>
              </div>

              <div className={classes.rservedPrice}>
                <p>{`${product?.price} PDT`}</p>
              </div>
            </div>

            <div className={classes.reservedButtonWrap}>
              <Button onClick={() => onReleaseHandler(product?.id)}>
                <div className={classes.reservedButton}>구매확정</div>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default ReservedProduct;
