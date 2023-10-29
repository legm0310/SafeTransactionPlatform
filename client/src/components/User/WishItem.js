import { Fragment } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteWishList } from "../../_actions/userAction";

import deleteBtn from "../../assets/icon-delete.svg";

import classes from "../../styles/user/WishList.module.css";
import { useSnackbar } from "notistack";

const WishItem = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { loadWishList } = useSelector((state) => state.user);

  const onDeleteWishListHandler = (wishItemId) => {
    dispatch(deleteWishList(wishItemId)).then((response) => {
      enqueueSnackbar("상품이 찜목록에서 삭제되었습니다", {
        variant: "success",
      });
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
            <section key={item.id} className={classes.wishList}>
              <Link
                to={`/products/${item.id}`}
                className={classes.wishListProduct}
              >
                <div className={classes.wishListProductImage}>
                  {item.status === "RESERVED" && (
                    <div className={classes.productStatus}>
                      <h2>구매진행중</h2>
                    </div>
                  )}
                  {item.status === "SOLD" && (
                    <div className={classes.productStatus}>
                      <h2>판매완료</h2>
                    </div>
                  )}
                  <img src={item?.image} alt="" />
                </div>

                <div className={classes.wishListProductInfo}>
                  <p className={classes.productCategory}>{item?.category}</p>
                  <p className={classes.productName}>{item?.title}</p>
                  <p>
                    {item?.price
                      ? item.price.toLocaleString() + "PDT"
                      : item?.price}
                  </p>
                </div>
              </Link>
              <div className={classes.wishListProductRemove}>
                <img
                  src={deleteBtn}
                  onClick={() => onDeleteWishListHandler(item.id)}
                />
              </div>
            </section>
          );
        })
      )}
    </Fragment>
  );
};

export default WishItem;
