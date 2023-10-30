import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  useSDK,
  useAddress,
  useTokenBalance,
  useContract,
  useNetworkMismatch,
} from "@thirdweb-dev/react";
import {
  addWishList,
  deleteWishList,
  getWishList,
} from "../../_actions/userAction";
import { setLoadings } from "../../_actions/uiAction";
import { getProduct, purchaseDeposit } from "../../_actions/productAction";
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

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

const Detail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const sdk = useSDK();
  const curAddress = useAddress();
  const { contract } = useContract(contractAddress);
  const isMismatched = useNetworkMismatch();
  const { userId, loadWishList } = useSelector((state) => state.user);
  const { productDetail } = useSelector((state) => state.product);
  const isLoading = useSelector((state) => state.ui.isLoading);
  const { productId } = useParams();

  const {
    data: tokenData,
    isLoading: balanceLoading,
    error: balanceError,
  } = useTokenBalance(contract, curAddress);

  const {
    status,
    title,
    category,
    price,
    hash,
    seller_id: sellerId,
    seller_wallet: sellerWallet,
    createdAt,
  } = productDetail || {};

  const [activeWish, setActiveWish] = useState(false);
  const [wishCount, setWishCount] = useState(0);

  useEffect(() => {
    dispatch(getProduct(productId)).then(() => console.log(productDetail));
  }, [dispatch, productId]);

  useEffect(() => {
    if (!isNaN(productDetail?.wishCount)) {
      setWishCount(+productDetail?.wishCount);
      setActiveWish(productDetail?.wishCount ? true : false);
    }
  }, [productDetail]);

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
    if (!curAddress) {
      return enqueueSnackbar("지갑을 연결해주세요", {
        variant: "error",
      });
    }
    if (isMismatched) {
      return enqueueSnackbar(
        "네트워크가 일치하지 않습니다. 내 지갑을 확인해주세요.",
        {
          variant: "error",
        }
      );
    }
    if (sellerId == userId || sellerWallet == curAddress) {
      return enqueueSnackbar("판매자와 구매자가 같습니다.", {
        variant: "error",
      });
    }
    if (+tokenData.displayValue < +price) {
      return enqueueSnackbar("토큰 잔액이 부족합니다", {
        variant: "error",
      });
    }
    console.log(tokenData);
    handleClick(purchase, "해당 상품 구매하시겠습니까?");
  };

  const purchase = (key) => {
    closeSnackbar(key);

    const data = {
      prodTuple: [+productId, +price, +sellerId, sellerWallet, hash],
      buyerId: userId,
      sdk,
    };
    enqueueSnackbar("에스크로 결제가 진행됩니다. 잠시만 기다려주세요.", {
      variant: "success",
    });
    dispatch(purchaseDeposit(data)).then((response) => {
      console.log(response);
      if (response.payload.updated) {
        enqueueSnackbar("구매 요청에 성공했습니다. 토큰이 예치 되었습니다.", {
          variant: "success",
        });
        navigate(`/user/${userId}`);
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
    if (!userId) {
      navigate("/login");
    }
    let data = {
      userId,
      productId,
    };
    try {
      activeWish
        ? dispatch(deleteWishList(productId))
            .then((response) => {
              enqueueSnackbar("찜이 해제 되었습니다. ", {
                variant: "error",
              });
            })
            .then(() => {
              dispatch(getWishList(userId));
            })
            .then((value) => {
              console.log(value);
              setWishCount(wishCount - 1);

              return setActiveWish(false);
            })
        : dispatch(addWishList(data)).then((response) => {
            if (response.payload?.addWishListSuccess) {
              enqueueSnackbar("상품을 찜 했습니다.", {
                variant: "success",
              });
              setActiveWish(true);
              setWishCount(wishCount + 1);
            } else {
              setActiveWish(
                loadWishList.indexOf(+productId) == -1 ? true : false
              );
              enqueueSnackbar("이미 찜한 상품입니다. ", {
                variant: "error",
              });
            }
          });
      // .catch((err) =>
      //   err.data?.status === 401 ? navigate("/login") : console.log(err)
      // );
    } catch (err) {
      console.log("catch", err);
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
                  <Link to={`/products/all?category=${category}`}>
                    {category}
                  </Link>
                </div>
                <div className={classes.title}>{title}</div>
                <div className={classes.price}> {price?.toLocaleString()}</div>
                <div className={classes.time}>{createdAt}</div>
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
                  <Button onClick={(e) => onPurchaseHandler()}>
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
