import { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ReleaseReciept from "../Receipt/ReleaseReceipt";
import {
  useSDK,
  useContract,
  useAddress,
  useNetworkMismatch,
} from "@thirdweb-dev/react";
import { getCompleteEvents } from "../../contract/getEvents";
import { getBatchProducts, getProducts } from "../../_actions/productAction";

import classes from "../../styles/user/PurchasedList.module.css";
import { PropagateLoader } from "react-spinners";

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

const PurchasedList = () => {
  const sdk = useSDK();
  const { contract } = useContract(contractAddress);
  const address = useAddress();
  const isMismatched = useNetworkMismatch();
  const dispatch = useDispatch();
  const { isContractLoading } = useSelector((state) => state.ui);
  const [isLoading, setIsLoading] = useState(false);
  const [productList, setProductList] = useState([]);
  const [openReleaseReciept, setOpenReleaseReciept] = useState(false);
  const handleOpenReleaseReceipt = () => {
    setOpenReleaseReciept(true);
  };

  const handleCloseReleaseReceipt = () => {
    setOpenReleaseReciept(false);
  };

  const handleGetEventsLog = async () => {
    const logs = await getCompleteEvents(sdk, "CompleteTransaction", address);
    console.log(logs);
    const prodIdLog = logs?.map((event) => parseInt(event.data?.escrowId));
    return prodIdLog;
  };

  const fetchCompleteProducts = async () => {
    if (!address) return;
    setIsLoading(true);
    const productIds = await handleGetEventsLog();
    const products = await dispatch(getBatchProducts({ productIds }));
    const prodListFromDb = products?.payload?.products || [];
    setProductList([...prodListFromDb]);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchCompleteProducts();
  }, [dispatch, address]);
  return (
    <Fragment>
      {!address ? (
        <div className={classes.notConnectWallet}>
          <h2>연결된 지갑이 없습니다.</h2>
          <p>지갑을 연결해주세요!</p>
        </div>
      ) : isLoading ? (
        <div className={classes.propagateLoader}>
          <PropagateLoader color="#1ECFBA" />
        </div>
      ) : productList.length === 0 ? (
        <div className={classes.notPurchasedList}>
          <h2>구매한 상품이 없습니다.</h2>
          <p>원하는 상품을 구매해보세요!</p>
        </div>
      ) : (
        productList.map((product) => (
          <div key={product.id} className={classes.purchasedList}>
            {
              <div className={classes.purchasedProductWrap} key={product.id}>
                <div className={classes.purchasedProductImage}>
                  <img src={product.image} alt="" />
                </div>
                <div className={classes.purchasedProductInfo}>
                  <p className={classes.productCategory}>{product.category}</p>
                  <p className={classes.productName}>{product.title}</p>
                  <p
                    className={classes.productPrice}
                  >{`${product.price} PDT`}</p>
                </div>

                <div className={classes.purchasedProductReceipt}>
                  <button
                    onClick={handleOpenReleaseReceipt}
                    className={classes.btnSubmit}
                  >
                    거래내역
                  </button>
                </div>

                <ReleaseReciept
                  open={openReleaseReciept}
                  onClose={handleCloseReleaseReceipt}
                />
              </div>
            }
          </div>
        ))
      )}
    </Fragment>
  );
};

export default PurchasedList;
