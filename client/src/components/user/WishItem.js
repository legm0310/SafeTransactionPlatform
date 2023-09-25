import { Fragment } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteWishList } from "../../_actions/userAction";

import classes from "../../styles/user/WishList.module.css";
import testImg from "../../assets/test.jpg";
import deleteBtn from "../../assets/icon-delete.svg";
import { useSnackbar } from "notistack";

const WishItem = ({ wishItem }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.userId);

  const { enqueueSnackbar } = useSnackbar();

  const onDeleteWishListHandler = () => {
    dispatch(deleteWishList(wishItem.id)).then((response) => {
      enqueueSnackbar("상품이 찜목록에서 삭제되었습니다", {
        variant: "success",
      });
    });
  };
  return (
    <Fragment>
      <section className={classes.wishList}>
        <input type="checkbox" />
        <div className={classes.wishListProductWrap}>
          <div className={classes.wishListProductImage}>
            <img src={wishItem?.image} alt="" />
          </div>

          <div className={classes.wishListProductInfo}>
            <p className={classes.productCategory}>{wishItem?.category}</p>
            <p className={classes.productName}>{wishItem?.title}</p>
          </div>

          <div className={classes.productPrice}>
            <p>{wishItem?.price}PDT</p>
          </div>

          <div className={classes.wishListProductPurchase}>
            <p className={classes.totalPrice}></p>
            <button className={classes.btnSubmit}>구매하기</button>
          </div>

          <div className={classes.wishListProductRemove}>
            <img src={deleteBtn} onClick={onDeleteWishListHandler} />
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default WishItem;
