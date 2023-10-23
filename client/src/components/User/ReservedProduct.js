import { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDepositedProducts, release } from "../../_actions/productAction";
import { setLoadings } from "../../_actions/uiAction";
import { getEventsFromWeb3js } from "../../contract/getEvents";

import {
  // useContractEvents,
  useSDK,
  useContract,
  useAddress,
} from "@thirdweb-dev/react";

import deleteBtn from "../../assets/icon-delete.svg";
import classes from "../../styles/user/ReservedProduct.module.css";

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

const ReservedProduct = () => {
  const dispatch = useDispatch();
  const prodDetail =
    useSelector((state) => state.product.depositedProducts?.products) || [];
  // const prodDetail = useSelector((state) => {
  //   const products = state.product.depositedProducts?.products;
  //   return Array.isArray(products) ? products : [];
  // });

  const [productIds, setProductIds] = useState();
  const sdk = useSDK();
  const { contract } = useContract(contractAddress);
  const address = useAddress();
  // const { data, isLoading, error } = useContractEvents(contract, "");

  const handleGetEventsLog = async () => {
    const log = await getEventsFromWeb3js("EscrowCreate", address);
    console.log(log);
    // const prodIdLog = log.map((event) =>
    //   parseInt(event.returnValues.productId)
    // );
    // console.log(prodIdLog);
    // setProductIds([...prodIdLog]);
    // return prodIdLog;
  }; // map 에러로 인한 임시 주석처리

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
      dispatch(getDepositedProducts({ productIds: value }))
        .then(console.log(prodDetail))
        .catch((err) => console.log(err))
    );
  }, []);

  return (
    <Fragment>
      {/* <div className={classes.notReservedList}>
        <h2>구매진행중인 상품이 없습니다.</h2>
        <p>원하는 상품을 구매해보세요!</p>
      </div> */}
      <div className={classes.reservedList}>
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

              <div className={classes.wishListProductRemove}>
                <img
                  src={deleteBtn}
                  // onClick={() => onDeleteWishListHandler(product.id)}
                />
              </div>
            </div>
          ))} */}
        <div className={classes.reservedProductWrap}>
          <div className={classes.reservedProductImage}>
            <img src="" alt="" />
          </div>

          <div className={classes.reservedProductInfo}>
            <p className={classes.productCategory}>category</p>
            <p className={classes.productName}>상품이름</p>
          </div>

          <div className={classes.productPrice}>
            <p>1000PDT</p>
          </div>

          <div className={classes.reservedProductPurchase}>
            <button className={classes.btnSubmit}>구매확정</button>
          </div>

          <div className={classes.reservedProductRemove}>
            <img
              src={deleteBtn}
              // onClick={() => onDeleteWishListHandler(product.id)}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ReservedProduct;
