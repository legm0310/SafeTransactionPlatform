import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useSDK, useAddress } from "@thirdweb-dev/react";
import { addWishList } from "../../_actions/userAction";
import { setLoadings } from "../../_actions/uiAction";
import { getProduct, purchase } from "../../_actions/productAction";
import { addRoom, getRooms } from "../../_actions/chatAction";

import DetailSlide from "../../components/Detail/DetailSlide";
import { FaHeart } from "react-icons/fa";
import { TbMessageCircle2Filled } from "react-icons/tb";
import { IoCart } from "react-icons/io5";
import Button from "../../components/common/Button";
import ProductSellor from "../../components/Detail/ProductSellor";
import ProductInformation from "../../components/Detail/ProductInformation";
import Loading from "../../components/common/Loading";

import classes from "../../styles/detail/Detail.module.css";
import { closeSnackbar, useSnackbar } from "notistack";

const Detail = () => {
  const [activeMenu, setActiveMenu] = useState("productInformation");
  const { enqueueSnackbar } = useSnackbar();
  const sdk = useSDK();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productId } = useParams();

  const prodDetail = useSelector(
    (state) => state.product.productDetail.product
  );
  const isLoading = useSelector((state) => state.ui.isLoading);
  const { userId, loadWishList } = useSelector((state) => state.user);
  const { rooms } = useSelector((state) => state.chat);
  const sellerId = prodDetail?.seller_id;

  useEffect(() => {
    dispatch(getProduct(productId));
  }, [dispatch, productId]);

  const handleClick = (func, comment) => {
    enqueueSnackbar(comment, {
      variant: "info",
      persist: true, // 자동으로 스낵바를 닫지 않음
      action: (key) => (
        <>
          <button onClick={() => func(key)}>구매하기</button>
          <button
            onClick={() => {
              closeSnackbar(key);
            }}
          >
            뒤로가기
          </button>
        </>
      ),
    });
  };

  const onPurchaseHandler = () => {
    handleClick(purchase, "해당 상품 구매하시겠습니까?");
  };

  const purchase = (key) => {
    closeSnackbar(key);
    if (sellerId == userId) {
      return enqueueSnackbar("판매자와 구매자가 같습니다.", {
        variant: "error",
      });
    }
    dispatch(setLoadings({ isLoading: true }));
    const data = {
      productId,
      userId,
      sdk,
    };

    dispatch(purchase(data)).then((response) => {
      console.log(response);
      if (response.payload.updated) {
        enqueueSnackbar("에스크로 결제가 진행됩니다", {
          variant: "success",
        });
        navigate("/user");
      } else {
        return enqueueSnackbar("구매 요청에 실패했습니다.", {
          variant: "error",
        });
      }
    });
  };

  const startChatHandler = async (event) => {
    event.preventDefault();
    if (sellerId === userId) {
      return enqueueSnackbar("판매자와 구매자가 같습니다.", {
        variant: "error",
      });
    }
    const body = {
      sellerId: sellerId,
      userId: userId,
      roomName: `${userId}_${sellerId}`,
    };
    try {
      const roomData = await dispatch(getRooms());
      const roomExists = roomData.payload.rooms?.find(
        (room) => room.RoomUser[0].id === sellerId
      );
      if (!roomExists) {
        return navigate(
          `/chat/0?exists=false&user=${userId}&seller=${sellerId}&sellerName=${prodDetail?.seller_name}&prod=${productId}`
        );
      }
      if (roomExists.chat_participant?.self_granted === 1) {
        enqueueSnackbar("채팅방 생성에 성공했습니다.", {
          variant: "success",
        });
        return navigate(`/chat/${roomExists.id}`);
      }

      const addResult = await dispatch(addRoom(body));
      if (addResult.payload.result == "updatedRoom") {
        enqueueSnackbar("채팅방 생성에 성공했습니다.", {
          variant: "success",
        });
        return navigate(`/chat/${addResult.payload.room}`);
      }
    } catch (err) {
      console.log(err);
      return enqueueSnackbar("채팅방 생성 실패", {
        variant: "error",
      });
    }
  };

  const addWishListHandler = () => {
    let data = {
      userId,
      productId,
    };
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
                <div className={classes.category}>{prodDetail?.category}</div>
                <div className={classes.title}>{prodDetail?.title}</div>
                <div className={classes.price}>
                  {" "}
                  {prodDetail?.price.toLocaleString()}
                </div>
                <div className={classes.time}>{prodDetail?.createdAt}</div>
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

                  <Button onClick={startChatHandler}>
                    <div className={classes.productMessageWrap}>
                      <div className={classes.productMessage}>
                        <TbMessageCircle2Filled />
                        <span className={classes.buttonText}>판다톡</span>
                      </div>
                    </div>
                  </Button>
                </div>
                <Button
                  onClick={(e) =>
                    handleClick(
                      onPurchaseHandler,
                      "해당 상품 구매하시겠습니까?"
                    )
                  }
                >
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
              <div className={classes.productSellor}>
                <div className={classes.productStoreHeader}>판매자정보</div>
                <div className={classes.prodSellorExplanation}>
                  <ProductSellor />
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
