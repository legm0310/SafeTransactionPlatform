import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useSDK, useAddress } from "@thirdweb-dev/react";
import { addWishList } from "../../_actions/userAction";
import { setLoadings } from "../../_actions/uiAction";
import { getProduct, purchase } from "../../_actions/productAction";
import { addRoom } from "../../_actions/chatAction";

import DetailSlide from "../../components/detailProduct/DetailSlide";
import { FaHeart } from "react-icons/fa";
import { TbMessageCircle2Filled } from "react-icons/tb";
import { IoCart } from "react-icons/io5";
import Button from "../../components/common/Button";
import ProductStore from "../../components/detailProduct/ProductStore";
import ProductInformation from "../../components/detailProduct/ProductInformation";
import Loading from "../../components/common/Loading";

import classes from "../../styles/product/Detail.module.css";
import { useSnackbar } from "notistack";

const Detail = ({ wish, setWish }) => {
  const [activeMenu, setActiveMenu] = useState("productInformation");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const productDetail = useSelector(
    (state) => state.product.productDetail?.product
  );
  const { loadWishList } = useSelector((state) => state.user);
  const isLoading = useSelector((state) => state.ui.isLoading);
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

  const addWishListHandler = () => {
    let data = {
      userId,
      productId,
    };

    console.log(data);

    dispatch(addWishList(data)).then((response) => {
      console.log(loadWishList);
      if (response.payload.addWishListSuccess) {
        enqueueSnackbar("관심상품 등록에 성공했습니다.", {
          variant: "success",
        });
      } else {
        enqueueSnackbar("관심상품 등록에 실패했습니다.", {
          variant: "error",
        });
      }
    });
  };

  return (
    <Fragment>
      {isLoading ? (
        <div>
          <Loading />
        </div>
      ) : (
        <div className={classes.productDetailWrap}>
          <section className={classes.productDetail}>
            <div className={classes.productImgWrap}>
              <DetailSlide className={classes.Slide} />
            </div>

            <div className={classes.producContentWrap}>
              <div>
                <div className={classes.category}>
                  {productDetail?.category}
                </div>
                <div className={classes.title}>{productDetail?.title}</div>
                <div className={classes.price}>
                  {" "}
                  {productDetail?.price.toLocaleString()}
                </div>
                <div className={classes.time}>{productDetail?.createdAt}</div>
              </div>

              <div className={classes.buttonWrap}>
                <div className={classes.putMessageButton}>
                  <Button onClick={() => addWishListHandler()}>
                    <div className={classes.productPutWrap}>
                      <div className={classes.productPut}>
                        <FaHeart />
                        <span className={classes.buttonText}>찜하기</span>
                      </div>
                    </div>
                  </Button>

                  <Button onClick={onCreateRoomHandler}>
                    <div className={classes.productMessageWrap}>
                      <div className={classes.productMessage}>
                        <TbMessageCircle2Filled />
                        <span className={classes.buttonText}>판다톡</span>
                      </div>
                    </div>
                  </Button>
                </div>

                <Button onClick={onPurchaseHandler}>
                  <div className={classes.productPurchaseWrap}>
                    <div className={classes.productPurchase}>
                      <IoCart />
                      <span className={classes.buttonText}>구매하기</span>
                    </div>
                  </div>
                </Button>
              </div>
            </div>
          </section>

          <section className={classes.informationWrap}>
            <div className={classes.prodInformation}>
              <div className={classes.prodInfoHeader}></div>
              {/* <div className={classes.prodInfoButton}>
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
                    activeMenu === "productStore" ? classes.active : ""
                  }`}
                >
                  판매자정보
                </div>
              </Button>
            </div> */}
              <div className={classes.productInfo}>
                <div className={classes.productInfoHeader}>상품정보</div>
                <div className={classes.ProdinfoExplanation}>
                  <ProductInformation />
                </div>
              </div>
              <div className={classes.productStore}>
                <div className={classes.productStoreHeader}>판매자정보</div>
                <div className={classes.ProdStoreExplanation}>
                  <ProductStore />
                </div>
              </div>

              {/* <div className={classes.ProdinfoExplanation}>
              {activeMenu === "productStore" && <ProductStore />}
              {activeMenu === "productInformation" && <ProductInformation />}
            </div> */}
            </div>
          </section>

          <div className={classes.relationproductWrap}>
            <div className={classes.relationProduct}>
              <div className={classes.relationProductHeader}>연관 상품</div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Detail;
