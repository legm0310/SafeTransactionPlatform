import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getWishList } from "../../_actions/userAction";

import WishItem from "./WishItem";

import classes from "../../styles/user/WishList.module.css";

const WishList = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.userId);
  const { loadWishList } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getWishList(userId));
  }, [dispatch]);

  console.log(loadWishList);

  console.log("User id = ", userId);

  return (
    <Fragment>
      {loadWishList?.length === 0 ? (
        <div className={classes.notWishList}>
          <h2>찜목록에 담긴 상품이 없습니다.</h2>
          <p>원하는 상품을 찜목록에 담아보세요!</p>
        </div>
      ) : (
        loadWishList?.map((wishItem) => {
          console.log(wishItem.id);
          return <WishItem key={`key-${wishItem?.id}`} wishItem={wishItem} />;
        })
      )}
    </Fragment>
  );
};

export default WishList;
