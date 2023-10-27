import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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
    console.log("실행");
    const filter = {
      sellerId: props.id,
    };
    dispatch(getSearchRecentProducts(filter)).then((response) => {
      setSellingProducts(response.payload?.products);
    });
  }, [dispatch]);

  const onDeleteProductHandler = (productId) => {
    dispatch(deleteProduct(productId)).then((response) => {
      enqueueSnackbar("판매 상품이 삭제되었습니다.", {
        variant: "success",
      });
    });
  };

  // 삭제 시 리렌더링 기능 및 링크 연결, 12개 제한 풀기

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
              <div className={classes.saleProductImage}>
                <img src={product.image} alt="" />
              </div>

              <div className={classes.saleProductInfo}>
                <p className={classes.productCategory}>{product.category}</p>
                <p className={classes.productName}>{product.title}</p>
                {<p>{product.price.toLocaleString()} PDT</p>}
              </div>

              {props.id == userId ? (
                <div className={classes.saleProductRemove}>
                  <img
                    src={deleteBtn}
                    onClick={() => onDeleteProductHandler(product.id)}
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
