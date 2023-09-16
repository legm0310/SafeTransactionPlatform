import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useSDK, useAddress } from "@thirdweb-dev/react";
import { setLoadings } from "../../_actions/uiAction";
import { getProduct, purchase } from "../../_actions/productAction";
import { addRoom } from "../../_actions/chatAction";

import Slide from "./DetailSlide";
import { FaHeart } from "react-icons/fa";
import { TbMessageCircle2Filled } from "react-icons/tb";
import { IoCart } from "react-icons/io5";
import Button from "../../components/common/Button";
import ProductStore from "./ProductStore";
import ProductInformation from "./ProductInformation";

import classes from "../../styles/product/Detail.module.css";

const Detail = (props) => {
  const [activeMenu, setActiveMenu] = useState("productInformation");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productDetail = useSelector(
    (state) => state.product.productDetail?.product
  );
  const userId = useSelector((state) => state.user.userId);
  const sellerId = productDetail?.seller_id;
  const { productId } = useParams();

  const sdk = useSDK();
  console.log(productDetail);

  const roomName = sellerId;
  console.log(`roomName : ${roomName}`);

  useEffect(() => {
    dispatch(getProduct(productId)).then((response) => console.log(response));
  }, [dispatch, productId]);

  const onMenuHandler = (menu) => {
    setActiveMenu(menu);
  };

  const onPurchaseHandler = () => {
    dispatch(setLoadings({ isLoading: true }));
    const data = {
      productId,
      userId,
      sdk,
    };
    dispatch(purchase(data)).then((response) => {
      console.log(response);
      if (response.payload.updated) {
        alert("에스크로 결제가 진행됩니다.");
        navigate("/user");
      } else {
        alert("구매 신청에 실패했습니다.");
      }
    });
  };

  const onCreateRoomHandler = (event) => {
    event.preventDefault();
    // dispatch(setLoadings({ isLoading: true }));

    // let body = {
    //   seller_id: sellerId,
    //   buyer_id: userId,
    //   room_name: roomName,
    // };

    // dispatch(addRoom(body)).then((response) => {
    //   if (response.payload.addRoomSuccess) {
    //     alert("채팅방 생성 완료");
    //     navigate(`/chat/${roomName}`);
    //   } else {
    //     dispatch(setLoadings({ isLoading: false }));
    //     alert("방 생성에 실패했습니다.");
    //   }
    // });
    navigate(`/chat/${roomName}`);
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
              <div className={classes.price}>
                {" "}
                {productDetail?.price.toLocaleString()}
              </div>
              <div className={classes.time}>{productDetail?.createdAt}</div>
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

                <Button onClick={onCreateRoomHandler}>
                  <div className={classes.productMessageWrap}>
                    <div className={classes.productMessage}>
                      <TbMessageCircle2Filled />
                      <span className={classes.buttonText}>판다톡</span>
                    </div>
                    <span className={classes.prodMessageborder}></span>
                  </div>
                </Button>
              </div>

              <Button onClick={onPurchaseHandler}>
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
