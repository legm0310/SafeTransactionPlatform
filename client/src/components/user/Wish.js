import { Fragment } from "react";
import classes from "../../styles/user/WishList.module.css";
import WishList from "./WishList";

const Wish = ({ wish }) => {
  console.log(wish);
  return (
    <Fragment>
      {wish.length === 0 ? (
        <div className={classes.notWishList}>
          <h2>찜목록에 담긴 상품이 없습니다.</h2>
          <p>원하는 상품을 찜목록에 담아보세요!</p>
        </div>
      ) : (
        wish.map((wish) => {
          return <WishList key={`key-${wish?.id}`} wish={wish} />;
        })
      )}
    </Fragment>
  );
};

export default Wish;
