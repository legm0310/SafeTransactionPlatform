import { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../_actions/productAction";

import classes from "../../styles/Detail.module.css";
import Slide from "./DetailSlide";
import { FaHeart } from "react-icons/fa";
import { TbMessageCircle2Filled } from "react-icons/tb";
import { IoCart } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";

const Detail = (props) => {
  const dispatch = useDispatch();
  const productDetail = useSelector(
    (state) => state.product.productDetail?.product
  );
  const { productId } = useParams();
  console.log(productDetail);

  useEffect(() => {
    dispatch(getProduct(productId)).then((response) => console.log(response));
  }, [dispatch, productId]);

  return (
    <Fragment>
      <section className={classes.productDetailWrap}>
        <div className={classes.productDetail}>
          <div className={classes.productImgWrap}>
            <Slide className={classes.Slide} />
          </div>

          <div className={classes.producContentWrap}>
            <div>
              <div className={classes.category}>{productDetail?.category}</div>
              <div className={classes.title}>{productDetail?.title}</div>
              <div className={classes.price}>{productDetail?.price}원</div>
              <div className={classes.time}>올라온 시간 및 조회 찜</div>
            </div>

            <div className={classes.buttonWrap}>
              <button className={classes.productPut}>
                <FaHeart />
                <span>찜하기</span>
              </button>
              <button className={classes.productMessage}>
                <TbMessageCircle2Filled />
                <span>톡하기</span>
              </button>
              <button className={classes.productPurchase}>
                <IoCart />
                <span>구매하기</span>
              </button>
            </div>
          </div>
        </div>

        <div className={classes.informationWrap}>
          <div className={classes.storeInformation}>
            <div className={classes.storeInfoHeader}>상점정보</div>
            <div className={classes.store}>
              <div className={classes.StoreIcon}>
                <FaUserCircle />
              </div>
              이승훈
            </div>
          </div>

          <div className={classes.productInformation}>
            <div className={classes.productInfoHeader}>상품내용</div>
            <div className={classes.productInfoDescription}>
              {productDetail?.detail}
            </div>
          </div>
        </div>

        <div className={classes.relationproductWrap}></div>
      </section>
    </Fragment>
  );
};

export default Detail;
