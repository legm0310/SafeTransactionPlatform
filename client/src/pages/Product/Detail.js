import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../_actions/productAction";

import Slide from "./DetailSlide";
import { FaHeart } from "react-icons/fa";
import { TbMessageCircle2Filled } from "react-icons/tb";
import { IoCart } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import Button from "../../components/UI/Button";
import ProductStore from "./ProductStore";
import ProductInformation from "./ProductInformation";

import classes from "../../styles/Detail.module.css";

const Detail = (props) => {
  const [activeMenu, setActiveMenu] = useState("productInformation");

  const dispatch = useDispatch();
  const productDetail = useSelector(
    (state) => state.product.productDetail?.product
  );
  const { productId } = useParams();
  console.log(productDetail);

  useEffect(() => {
    dispatch(getProduct(productId)).then((response) => console.log(response));
  }, [dispatch, productId]);

  const onMenuHandler = (menu) => {
    setActiveMenu(menu);
  };

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
              <div className={classes.putMessageButton}>
                <Button>
                  <div className={classes.productPutWrap}>
                    <div className={classes.productPut}>
                      <FaHeart />
                      <span className={classes.buttonText}>찜하기</span>
                    </div>
                    <span className={classes.prodPutborder}></span>
                  </div>
                </Button>

                <Button>
                  <div className={classes.productMessageWrap}>
                    <div className={classes.productMessage}>
                      <TbMessageCircle2Filled />
                      <span className={classes.buttonText}>판다톡</span>
                    </div>
                    <span className={classes.prodMessageborder}></span>
                  </div>
                </Button>
              </div>

              <Button>
                <div className={classes.productPurchaseWrap}>
                  <div className={classes.productPurchase}>
                    <IoCart />
                    <span className={classes.buttonText}>구매하기</span>
                  </div>
                  <span className={classes.prodPurchaseborder}></span>
                </div>
              </Button>
            </div>
          </div>
        </div>

        <div className={classes.informationWrap}>
          <div className={classes.prodInformation}>
            <div className={classes.prodInfoButton}>
              <Button onClick={() => onMenuHandler("productInformation")}>
                <div
                  className={`${classes.infoButton} ${
                    activeMenu === "productInformation" ? classes.active : ""
                  }`}
                >
                  상품정보
                </div>
              </Button>

              <Button onClick={() => onMenuHandler("productStore")}>
                <div
                  className={`${classes.storeButton} ${
                    activeMenu === "productStore" ? classes.storeactive : ""
                  }`}
                >
                  판매자정보
                </div>
              </Button>
            </div>

            <div className={classes.ProdinfoExplanation}>
              {activeMenu === "productStore" && <ProductStore />}
              {activeMenu === "productInformation" && <ProductInformation />}
            </div>
          </div>
        </div>

        <div className={classes.relationproductWrap}>
          <div className={classes.relationProduct}>
            <div className={classes.relationProductHeader}>연관 상품</div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Detail;
