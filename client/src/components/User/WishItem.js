import { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteWishList } from "../../_actions/userAction";
import { setLoadings } from "../../_actions/uiAction";
import { purchaseDeposit } from "../../_actions/productAction";

import { useSDK } from "@thirdweb-dev/react";

import deleteBtn from "../../assets/icon-delete.svg";

import classes from "../../styles/user/WishList.module.css";
import { useSnackbar, closeSnackbar } from "notistack";

const WishItem = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const sdk = useSDK();

  const { userId, loadWishList } = useSelector((state) => state.user);

  const onDeleteWishListHandler = (wishItemId) => {
    dispatch(deleteWishList(wishItemId)).then((response) => {
      enqueueSnackbar("상품이 찜목록에서 삭제되었습니다", {
        variant: "success",
      });
    });
  };

  const handleClick = (func, comment) => {
    enqueueSnackbar(comment, {
      variant: "info",
      persist: true, // 자동으로 스낵바를 닫지 않음
      action: () => (
        <>
          <button onClick={() => func()}>구매하기</button>
          <button
            onClick={() => {
              closeSnackbar();
            }}
          >
            뒤로가기
          </button>
        </>
      ),
    });
  };

  const onClickPurchase = (productId) => {
    closeSnackbar();
    dispatch(setLoadings({ isLoading: true }));
    const data = {
      productId,
      userId,
      sdk,
    };

    dispatch(purchaseDeposit(data)).then((response) => {
      console.log(response);
      if (response.payload.updated) {
        enqueueSnackbar("에스크로 결제가 진행됩니다", {
          variant: "success",
        });
        dispatch(deleteWishList(productId));
        navigate(`/user/${userId}`);
      } else {
        return enqueueSnackbar("구매 요청에 실패했습니다.", {
          variant: "error",
        });
      }
    });
  };
  return (
    <Fragment>
      {loadWishList?.length === 0 ? (
        <div className={classes.notWishList}>
          <h2>찜목록에 담긴 상품이 없습니다.</h2>
          <p>원하는 상품을 찜목록에 담아보세요!</p>
        </div>
      ) : (
        loadWishList.map((item) => {
          return (
            <section className={classes.wishList}>
              {/* <input type="checkbox" /> */}
              <div className={classes.wishListProductWrap}>
                <Link to={`/products/${item.id}`}>
                  <div className={classes.wishListProductImage}>
                    <img src={item?.image} alt="" />
                  </div>
                </Link>

                <Link to={`/products/${item.id}`} style={{ color: "black" }}>
                  <div className={classes.wishListProductInfo}>
                    <p className={classes.productCategory}>{item?.category}</p>
                    <p className={classes.productName}>{item?.title}</p>
                  </div>
                </Link>

                <div className={classes.productPrice}>
                  <p>
                    {item?.price
                      ? item.price.toLocaleString() + "PDT"
                      : item?.price}
                  </p>
                </div>

                <div className={classes.wishListProductPurchase}>
                  <p className={classes.totalPrice}></p>
                  <button
                    onClick={(e) =>
                      handleClick(
                        () => onClickPurchase(item.id),
                        "해당 상품을 구매하시겠습니까?"
                      )
                    }
                    className={classes.btnSubmit}
                  >
                    구매하기
                  </button>
                </div>

                <div className={classes.wishListProductRemove}>
                  <img
                    src={deleteBtn}
                    onClick={() => onDeleteWishListHandler(item.id)}
                  />
                </div>
              </div>
            </section>
          );
        })
      )}
    </Fragment>
  );
};

export default WishItem;
