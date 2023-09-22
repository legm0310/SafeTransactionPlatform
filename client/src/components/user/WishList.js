import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getWishList } from "../../_actions/userAction";

import WishItem from "./WishItem";

import classes from "../../styles/user/WishList.module.css";

const WishList = ({ wish }) => {
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.user.userId);

  const { wishList } = useSelector((state) => state.user.getWishListSuccess);
  useEffect(() => {
    dispatch(getWishList(userId));
  }, []);

  console.log(wishList);

  console.log("User id = ", userId);

  console.log(wish);
  return (
    <Fragment>
      {wishList.length === 0 ? (
        <div className={classes.notWishList}>
          <h2>찜목록에 담긴 상품이 없습니다.</h2>
          <p>원하는 상품을 찜목록에 담아보세요!</p>
        </div>
      ) : (
        wishList.map((wishItem) => {
          return (
            <WishItem
              key={`key-${wishItem?.id}`}
              wish={wish}
              wishItem={wishItem}
            />
          );
        })
      )}
    </Fragment>
  );
};

export default WishList;
