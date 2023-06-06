import { Fragment, useEffect, useState } from "react";

import classes from "../styles/RecentProductList.module.css";
import { useDispatch } from "react-redux";
import { getRecentProduct } from "../_actions/productAction";

const RecentProductList = () => {
  const dispatch = useDispatch();
  const [lastProdId, setLastProdId] = useState(null);
  const [productList, setProductList] = useState([]);
  const [displayMore, setDisplayMore] = useState(true);

  const onClickMoreProduct = () => {
    console.log(
      "newProdId",
      setLastProdId(productList[productList.length - 1].id)
    );

    setLastProdId(productList[productList.length - 1].id);
  };

  useEffect(() => {
    console.log("lastProdId", lastProdId);
    dispatch(getRecentProduct(lastProdId))
      .then((response) => {
        console.log(response.payload.products);
        setProductList((productList) => [
          ...productList,
          ...response.payload.products,
        ]);
        setDisplayMore(productList.length == 0 ? false : true);
      })
      .catch((err) => err);
  }, [lastProdId]);

  return (
    <Fragment>
      <div className={classes.latestProductContainer}>
        <h1>판다의 최근 상품</h1>
        <div className={classes.prodCardWrap}>
          <div className={classes.prodCardContainer}>
            {productList.map((product) => (
              <div className={classes.prodCard}>
                <div className={classes.imgBox}>
                  <img
                    key={product.id}
                    src={product.image}
                    className={classes.prodImg}
                    alt=""
                  />
                </div>

                <div className={classes.prodInfo}>
                  <div className={classes.prodName}>{product.title}</div>
                  <div className={classes.prodPrice}> {product.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {displayMore ? (
          <button onClick={onClickMoreProduct}>더보기</button>
        ) : null}
      </div>
    </Fragment>
  );
};

export default RecentProductList;
