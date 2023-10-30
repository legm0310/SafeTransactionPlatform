import { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ReleaseReciept from "../Receipt/ReleaseReceipt";
import { useSDK, useContract, useAddress } from "@thirdweb-dev/react";
import { getCompleteEvents } from "../../contract/getEvents";
import { getBatchProducts } from "../../_actions/productAction";

import classes from "../../styles/user/PurchasedList.module.css";
import { PropagateLoader } from "react-spinners";

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

const PurchasedList = () => {
  const sdk = useSDK();
  const { contract } = useContract(contractAddress);
  const address = useAddress();
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
    const prodIdLog = logs?.map((event) => parseInt(event.data?.escrowId));
    return prodIdLog;
  };

  const fetchCompleteProducts = async () => {
    const productIds = await handleGetEventsLog();
    const products = await dispatch(getBatchProducts({ productIds }));
    setProductList([...products?.payload?.products] || []);
    console.log(products);
  };
  useEffect(() => {
    fetchCompleteProducts();
  }, [dispatch, address]);
  return (
    <Fragment>
      {/* <div className={classes.notPurchasedList}>
        <h2>구매한 상품이 없습니다.</h2>
        <p>원하는 상품을 구매해보세요!</p>
      </div> */}

      <div className={classes.purchasedList}>
        {/* {prodDetail &&
          prodDetail.map((product) => (
            <div className={classes.wishListProductWrap}>
              <div className={classes.wishListProductImage}>
                <img src={product?.image} alt="" />
              </div>

              <div className={classes.wishListProductInfo}>
                <p className={classes.productCategory}>{product?.category}</p>
                <p className={classes.productName}>{product?.title}</p>
              </div>

              <div className={classes.productPrice}>
                <p>{product?.price}PDT</p>
              </div>

              <div className={classes.wishListProductPurchase}>
                <p className={classes.totalPrice}></p>
                <button className={classes.btnSubmit}>구매확정</button>
              </div>
            </div>
          ))} */}
        {productList.map((product) => (
          <div className={classes.purchasedProductWrap}>
            <div className={classes.purchasedProductImage}>
              <img src="" alt="" />
            </div>
            <div className={classes.purchasedProductInfo}>
              <p className={classes.productCategory}>category</p>
              <p className={classes.productName}>{product.title}</p>
              <p className={classes.productPrice}>{product.price}PDT</p>
            </div>

            <div className={classes.purchasedProductReceipt}>
              <button
                onClick={handleOpenReleaseReceipt}
                className={classes.btnSubmit}
              >
                거래내역
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className={classes.purchasedList}>
        {/* {prodDetail &&
          prodDetail.map((product) => (
            <div className={classes.wishListProductWrap}>
              <div className={classes.wishListProductImage}>
                <img src={product?.image} alt="" />
              </div>

              <div className={classes.wishListProductInfo}>
                <p className={classes.productCategory}>{product?.category}</p>
                <p className={classes.productName}>{product?.title}</p>
              </div>

              <div className={classes.productPrice}>
                <p>{product?.price}PDT</p>
              </div>

              <div className={classes.wishListProductPurchase}>
                <p className={classes.totalPrice}></p>
                <button className={classes.btnSubmit}>구매확정</button>
              </div>
            </div>
          ))} */}
        <div className={classes.purchasedProductWrap}>
          <div className={classes.purchasedProductImage}>
            <img src="" alt="" />
          </div>

          <div className={classes.purchasedProductInfo}>
            <p className={classes.productCategory}>category</p>
            <p className={classes.productName}>상품이름</p>
            <p className={classes.productPrice}>1000PDT</p>
          </div>

          <div className={classes.purchasedProductReceipt}>
            <button
              onClick={handleOpenReleaseReceipt}
              className={classes.btnSubmit}
            >
              거래내역
            </button>
          </div>
        </div>
      </div>

      <ReleaseReciept
        open={openReleaseReciept}
        onClose={handleCloseReleaseReceipt}
      />
    </Fragment>
  );
};

export default PurchasedList;
