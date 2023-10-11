import { Fragment } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteWishList } from "../../_actions/userAction";

import classes from "../../styles/user/WishList.module.css";
import testImg from "../../assets/test.jpg";
import deleteBtn from "../../assets/icon-delete.svg";
import { useSnackbar } from "notistack";

const WishItem = () => {
  const dispatch = useDispatch();
  const { userId, loadWishList } = useSelector((state) => state.user);
  const { enqueueSnackbar } = useSnackbar();
  console.log(loadWishList);
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
          {
            console.log(item);
          }
          return (
            <section className={classes.wishList}>
              <div className={classes.wishListProductImage}>
                <img src={item?.image} alt="" />
              </div>

              <p className={classes.productName}>{item?.title}</p>

              <p>{item?.price}PDT</p>

              <button className={classes.btnSubmit}>구매하기</button>

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
