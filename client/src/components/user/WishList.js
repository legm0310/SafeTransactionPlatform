import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getWishList } from "../../_actions/userAction";

import WishItem from "./WishItem";

import classes from "../../styles/user/WishList.module.css";

const WishList = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.userId);

  useEffect(() => {
    console.log("render");
    dispatch(getWishList(userId));
  }, [dispatch]);

  return (
    <Fragment>
      <WishItem />
    </Fragment>
  );
};

export default WishList;
