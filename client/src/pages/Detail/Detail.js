import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useSDK, useAddress } from "@thirdweb-dev/react";
import {
  addWishList,
  deleteWishList,
  getWishList,
} from "../../_actions/userAction";
import { setLoadings } from "../../_actions/uiAction";
import { getProduct, purchase } from "../../_actions/productAction";
import { addRoom, getRooms } from "../../_actions/chatAction";

import DetailSlide from "../../components/Detail/DetailSlide";
import { FaHeart } from "react-icons/fa";
import { TbMessageCircle2Filled } from "react-icons/tb";
import { IoCart } from "react-icons/io5";
import Button from "../../components/common/Button";
import ProductSellor from "../../components/Detail/ProductSellor";
import RelatedProduct from "../../components/Detail/RelatedProduct";
import ProductInformation from "../../components/Detail/ProductInformation";
import Loading from "../../components/common/Loading";

import classes from "../../styles/detail/Detail.module.css";
import { closeSnackbar, useSnackbar } from "notistack";

const Detail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const sdk = useSDK();

  const { userId, loadWishList } = useSelector((state) => state.user);
  const { productDetail } = useSelector((state) => state.product);
  const isLoading = useSelector((state) => state.ui.isLoading);
  const { productId } = useParams();

  const [activeWish, setActiveWish] = useState(false);
  const [wishCount, setWishCount] = useState(0);

  const wishListId = loadWishList.map((item) => item.id);

  const sellerId = productDetail?.seller_id;
  const status = productDetail?.status;

  useEffect(() => {
    dispatch(getProduct(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    if (productDetail?.wishCount) {
      setWishCount(+productDetail?.wishCount);
      setActiveWish(wishListId.indexOf(+productId) == -1 ? false : true);
    }
  }, [productDetail?.wishCount]);

  const handleClick = (func, comment) => {
    if (userId == undefined) {
      navigate("/login");
    } else {
      enqueueSnackbar(comment, {
        variant: "info",
        persist: true, // 자동으로 스낵바를 닫지 않음
        action: (key) => (
          <div>
            <button
              onClick={() => func(key)}
              className={classes.purchaseButton}
            >
              구매하기
            </button>
            <button
              onClick={() => {
                closeSnackbar(key);
              }}
              className={classes.backButton}
            >
              뒤로가기
            </button>
          </div>
        ),
      });
    }
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
          `/chat/0?exists=false&user=${userId}&seller=${sellerId}&sellerName=${productDetail?.seller_name}&prod=${productId}`
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
    if (userId == undefined) {
      navigate("/login");
    } else {
      let data = {
        userId,
        productId,
      };
      activeWish
        ? dispatch(deleteWishList(productId)).then((response) => {
            enqueueSnackbar("찜이 해제 되었습니다. ", {
              variant: "error",
            });
            dispatch(getWishList(userId));
            setWishCount(wishCount - 1);
            setActiveWish(false);
          })
        : dispatch(addWishList(data)).then((response) => {
            if (response.payload.addWishListSuccess) {
              enqueueSnackbar("상품을 찜 했습니다.", {
                variant: "success",
              });
              setActiveWish(true);
              setWishCount(wishCount + 1);
            } else {
              console.log(wishListId.indexOf(+productId));
              setActiveWish(
                wishListId.indexOf(+productId) == -1 ? true : false
              );
              enqueueSnackbar("이미 찜한 상품입니다. ", {
                variant: "error",
              });
            }
          });
    }
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
                  {productDetail?.price?.toLocaleString()}
                </div>
                <div className={classes.time}>{productDetail?.createdAt}</div>
              </div>

              <div className={classes.buttonWrap}>
                <div className={classes.putMessageButton}>
                  <Button onClick={() => addWishListHandler()}>
                    <div className={classes.productPutWrap}>
                      {activeWish ? (
                        <div>
                          <div className={classes.productPut}>
                            <FaHeart style={{ color: "red" }} />
                            <span className={classes.buttonText}>찜하기</span>
                            <span className={classes.wishCount}>
                              {wishCount}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className={classes.previousProductPut}>
                          <FaHeart />
                          <span className={classes.buttonText}>찜하기</span>
                          <span className={classes.wishCount}>
                            &nbsp;{wishCount}
                          </span>
                        </div>
                      )}
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
                {status === "SALE" ? (
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
                ) : status === "RESERVED" ? (
                  <div className={classes.productPurchaseWrap}>
                    <div className={classes.productReserved}>
                      <IoCart />
                      <span className={classes.buttonText}>구매진행중</span>
                    </div>
                  </div>
                ) : (
                  <div className={classes.productPurchaseWrap}>
                    <div className={classes.productSold}>
                      <IoCart />
                      <span className={classes.buttonText}>판매완료</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          <section className={classes.informationWrap}>
            <div className={classes.prodInformation}>
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
            </div>
          </section>

          <div className={classes.relatedProductHeader}>연관상품</div>
          <RelatedProduct prodDetail={productDetail} />
        </div>
      )}
    </Fragment>
  );
};

export default Detail;
