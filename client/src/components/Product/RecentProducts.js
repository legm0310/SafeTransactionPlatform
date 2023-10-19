import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getRecentProducts } from "../../_actions/productAction";
import Button from "../common/Button";

import classes from "../../styles/product/RecentProducts.module.css";

const RecentProductsList = () => {
  const dispatch = useDispatch();
  const [lastProdId, setLastProdId] = useState(null);
  const [productsList, setProductsList] = useState([]);
  const [displayMore, setDisplayMore] = useState(true);

  // const isHome = window.location.pathname === "/";

  const isHome = window.location.pathname;

  // const customStyle = {
  //   width: isHome ? "277.5px" : "297.5px",
  // };

  const onClickMoreProduct = () => {
    setLastProdId(productsList[productsList.length - 1]?.id);
  };

  useEffect(() => {
    dispatch(getRecentProducts(lastProdId))
      .then((response) => {
        const prodListFromDb = response.payload.products ?? [];

        setProductsList((productsList) => [...productsList, ...prodListFromDb]);

        if (prodListFromDb.length < 12 || prodListFromDb[0]?.id <= 12) {
          setDisplayMore(false);
        }
      })
      .catch((err) => err);
  }, [dispatch, lastProdId]);
  return (
    <Fragment>
      {isHome === "/" ? (
        <div className={classes.homeLatestProductSection}>
          <h1>판다의 최근 상품</h1>
          <div className={classes.homeLatestProductWrap}>
            <div className={classes.homeLatestProductContainer}>
              {productsList.map((product) => (
                <div
                  key={product.id}
                  className={classes.homeLatestProduct}
                  // style={customStyle}
                >
                  <Link to={`/products/${product.id}`}>
                    <div className={classes.homeImgBox}>
                      <img
                        src={product.image}
                        className={classes.homeProdImg}
                        alt=""
                      />

                      {product.status === "RESERVED" && (
                        <div className={classes.homeReserved}>
                          <h2>구매진행중</h2>
                        </div>
                      )}

                      {product.status == "SOLD" ? (
                        <div className={classes.homeReserved}>
                          <h2>판매완료</h2>
                        </div>
                      ) : null}
                    </div>
                    <div className={classes.homeProdInfo}>
                      <div className={classes.homeProdName}>
                        {product.title}
                      </div>
                      <div className={classes.homeProdPrice}>
                        {" "}
                        {product.price.toLocaleString()}
                      </div>
                      {/* <div className={classes.prodStatus}>{product.status}</div> */}
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            <div className={classes.homeMoreButtonWrap}>
              {displayMore ? (
                <Button onClick={onClickMoreProduct}>
                  <div className={classes.homeMoreButton}>더보기</div>
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      ) : (
        <div className={classes.latestProductSection}>
          <h1>판다의 최근 상품</h1>
          <div className={classes.latestProductWrap}>
            <div className={classes.latestProductContainer}>
              {productsList.map((product) => (
                <div
                  key={product.id}
                  className={classes.latestProduct}
                  // style={customStyle}
                >
                  <Link to={`/products/${product.id}`}>
                    <div className={classes.imgBox}>
                      <img
                        src={product.image}
                        className={classes.prodImg}
                        alt=""
                      />

                      {product.status === "RESERVED" && (
                        <div className={classes.reserved}>
                          <h2>구매진행중</h2>
                        </div>
                      )}

                      {product.status == "SOLD" ? (
                        <div className={classes.reserved}>
                          <h2>판매완료</h2>
                        </div>
                      ) : null}
                    </div>
                    <div className={classes.prodInfo}>
                      <div className={classes.prodName}>{product.title}</div>
                      <div className={classes.prodPrice}>
                        {" "}
                        {product.price.toLocaleString()}
                      </div>
                      {/* <div className={classes.prodStatus}>{product.status}</div> */}
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            <div className={classes.moreButtonWrap}>
              {displayMore ? (
                <Button onClick={onClickMoreProduct}>
                  <div className={classes.moreButton}>더보기</div>
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default RecentProductsList;
