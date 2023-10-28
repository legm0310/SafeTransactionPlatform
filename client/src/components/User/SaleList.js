import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import classes from "../../styles/user/SaleList.module.css";
import deleteBtn from "../../assets/icon-delete.svg";
import {
  getSearchRecentProducts,
  deleteProduct,
} from "../../_actions/productAction";

import { useSnackbar, closeSnackbar, enqueueSnackbar } from "notistack";

const SaleList = (props) => {
  const dispatch = useDispatch();

  const { userId } = useSelector((state) => state.user);

  const [sellingProducts, setSellingProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, [dispatch, props.id]);

  const getProducts = () => {
    const filter = {
      sellerId: props.id,
    };
    dispatch(getSearchRecentProducts(filter)).then((response) => {
      setSellingProducts(response.payload?.products);
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
            className={classes.purchaseButton}
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
      {sellingProducts?.length == 0 ? (
        <div className={classes.notSaleList}>
          <h2>판매중인 상품이 없습니다.</h2>
          <p>의미있는 상품을 판매해보세요!</p>
        </div>
      ) : (
        sellingProducts.map((product) => (
          <div className={classes.saleList}>
            <div className={classes.saleProductWrap}>
              <Link to={`/products/${product.id}`}>
                <div className={classes.saleProductImage}>
                  <img src={product.image} alt="" />
                </div>
              </Link>
              <Link to={`/products/${product.id}`}>
                <div className={classes.saleProductInfo}>
                  <p className={classes.productCategory}>{product.category}</p>
                  <p className={classes.productName}>{product.title}</p>
                  {<p>{product.price.toLocaleString()} PDT</p>}
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
            </div>
          </div>
        ))
      )}
    </Fragment>
  );
};

export default SaleList;
