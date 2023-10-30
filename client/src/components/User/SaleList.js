import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { useSDK, useContract, useAddress } from "@thirdweb-dev/react";
import {
  getSearchRecentProducts,
  deleteProduct,
  onRelease,
} from "../../_actions/productAction";

import classes from "../../styles/user/SaleList.module.css";
import deleteBtn from "../../assets/icon-delete.svg";
import { PropagateLoader } from "react-spinners";
import { useSnackbar, closeSnackbar, enqueueSnackbar } from "notistack";

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

const SaleList = (props) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.ui);
  const { userId } = useSelector((state) => state.user);
  const location = useLocation();
  const [sellingProducts, setSellingProducts] = useState([]);
  const sdk = useSDK();
  const { contract } = useContract(contractAddress);
  const address = useAddress();

  useEffect(() => {
    getProducts();
  }, [dispatch, props.id, location.pathname]);

  const getProducts = () => {
    const filter = {
      sellerId: props.id,
    };
    dispatch(getSearchRecentProducts(filter)).then((response) => {
      setSellingProducts(response.payload?.products);
    });
  };

  const onReleaseClick = (productId) => {
    if (!address) {
      return enqueueSnackbar("지갑을 연결해주세요.", {
        variant: "error",
      });
    }
    const seller = sellingProducts.find((v) => v.id == productId);
    if (address != seller.seller_wallet) {
      return enqueueSnackbar("지갑을 확인해주세요.", {
        variant: "error",
      });
    }

    enqueueSnackbar("토큰을 수령하시겠습니까?", {
      variant: "info",
      persist: true, // 자동으로 스낵바를 닫지 않음
      action: (key) => (
        <div>
          <button
            onClick={() => {
              onReleaseHandler(productId, key);
              closeSnackbar(key);
            }}
            className={classes.receiveButton}
          >
            토큰받기
          </button>
          <button
            onClick={() => {
              closeSnackbar(key);
            }}
            className={classes.backButton}
          >
            뒤로가기
          </button>
        </div>
      ),
    });
  };

  const onReleaseHandler = (productId, key) => {
    const data = {
      sdk: sdk,
      productId: productId,
    };
    enqueueSnackbar("토큰 전송을 진행합니다. 잠시만 기다려주세요.", {
      variant: "success",
    });
    dispatch(onRelease(data)).then((res) => {
      console.log(res);
      if (res.payload.updated) {
        enqueueSnackbar("토큰 전송에 성공했습니다. 지갑을 확인해주세요.", {
          variant: "success",
        });
        return getProducts();
      } else {
        return enqueueSnackbar("토큰 전송에 실패했습니다.", {
          variant: "error",
        });
      }
    });
  };

  const onDeleteClick = (productId) => {
    enqueueSnackbar("정말로 삭제하시겠습니까?", {
      variant: "info",
      persist: true, // 자동으로 스낵바를 닫지 않음
      action: (key) => (
        <div>
          <button
            onClick={() => {
              onDeleteProductHandler(productId);
              closeSnackbar(key);
            }}
            className={classes.deleteButton}
          >
            삭제하기
          </button>
          <button
            onClick={() => {
              closeSnackbar(key);
            }}
            className={classes.backButton}
          >
            뒤로가기
          </button>
        </div>
      ),
    });
  };

  const onDeleteProductHandler = (productId) => {
    dispatch(deleteProduct(productId)).then((response) => {
      enqueueSnackbar("판매 상품이 삭제되었습니다.", {
        variant: "success",
      });
      getProducts();
    });
  };

  return (
    <Fragment>
      {isLoading ? (
        <div className={classes.propagateLoader}>
          <PropagateLoader color="#1ECFBA" />
        </div>
      ) : (sellingProducts || []).length == 0 ? (
        <div className={classes.notSaleList}>
          <h2>판매중인 상품이 없습니다.</h2>
          <p>의미있는 상품을 판매해보세요!</p>
        </div>
      ) : (
        sellingProducts?.map((product) => (
          <div className={classes.saleList} key={product.id}>
            <div className={classes.saleProductWrap}>
              <Link to={`/products/${product.id}`}>
                <div className={classes.saleProductImage}>
                  {product.status === "RESERVED" && (
                    <div className={classes.reserved}>
                      <h2>구매진행중</h2>
                    </div>
                  )}
                  {product.status === "SOLD" && (
                    <div className={classes.reserved}>
                      <h2>판매완료</h2>
                    </div>
                  )}
                  <img src={product.image} alt="" />
                </div>
              </Link>
              <Link to={`/products/${product.id}`}>
                <div className={classes.saleProductInfo}>
                  <p className={classes.productCategory}>{product.category}</p>
                  <p className={classes.productName}>{product.title}</p>
                  {
                    <p className={classes.productPrice}>
                      {product.price.toLocaleString()} PDT
                    </p>
                  }
                </div>
              </Link>

              {props.id == userId ? (
                <div className={classes.saleProductRemove}>
                  <img
                    src={deleteBtn}
                    onClick={() => onDeleteClick(product.id)}
                  />
                </div>
              ) : null}

              {props.id != userId ? null : !product.approve_tx &&
                !product.release_tx ? (
                <button className={classes.onSaleButton}>판매중</button>
              ) : product.approve_tx && !product.release_tx ? (
                <button
                  onClick={() => onReleaseClick(product.id)}
                  className={classes.IssuanceButton}
                >
                  토큰 수령
                </button>
              ) : product.approve_tx && product.release_tx ? (
                <button className={classes.issuanceCompleted}>수령 완료</button>
              ) : null}
            </div>
          </div>
        ))
      )}
    </Fragment>
  );
};

export default SaleList;
