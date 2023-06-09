import { Fragment, useEffect, useState } from "react";

import classes from "../styles/RecentProductsList.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getRecentProducts } from "../_actions/productAction";

const RecentProductsList = () => {
  const dispatch = useDispatch();
  const [lastProdId, setLastProdId] = useState(null);
  const [productsList, setProductsList] = useState([]);
  const [displayMore, setDisplayMore] = useState(true);

  const onClickMoreProduct = () => {
    setLastProdId(productsList[productsList.length - 1].id);
  };

  useEffect(() => {
    console.log("lastProdId", lastProdId);
    dispatch(getRecentProducts(lastProdId))
      .then((response) => {
        const prodListFromDb = response.payload.products ?? [];
        console.log(prodListFromDb);
        setProductsList((productsList) => [...productsList, ...prodListFromDb]);

        if (prodListFromDb.length < 12 || prodListFromDb[0]?.id <= 12) {
          setDisplayMore(false);
        }
      })
      .catch((err) => err);
  }, [lastProdId]);

  return (
    <Fragment>
      <div className={classes.latestProductContainer}>
        <h1>판다의 최근 상품</h1>
        <div className={classes.prodCardWrap}>
          <div className={classes.prodCardContainer}>
            {productsList.map((product) => (
              <div key={product.id} className={classes.prodCard}>
                <div className={classes.imgBox}>
                  <img src={product.image} className={classes.prodImg} alt="" />
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

export default RecentProductsList;
