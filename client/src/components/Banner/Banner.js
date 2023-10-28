import { Fragment, useState } from "react";
import { Link } from "react-router-dom";

import classes from "../../styles/banner/Banner.module.css";

import mainImg from "../../assets/platformImage1.png";
import img2 from "../../assets/onboard/pandaImg6.png";
import img3 from "../../assets/onboard/pandaImgChat.png";
import img4 from "../../assets/onboard/pandaImg3.png";
import img5 from "../../assets/onboard/pandaImg4.png";

import Slider from "react-slick";
import styled from "styled-components";

const Banner = (props) => {
  const customDots = ["지갑 연결", "토큰 발급", "구매 확정"];

  const [backgroundColor, setBackgroundColor] = useState("white");

  const handleDivClick = () => {
    setBackgroundColor("blue"); // 색상을 변경하고 싶은 색으로 바꿉니다.
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    customPaging: function (i) {
      return (
        <div className="custom-dot-wrapper">
          <button className="custom-dot">{customDots[i]}</button>
        </div>
      );
    },
  };

  return (
    <Fragment>
      <div className={classes.container}>
        <section className={classes.mainWrap}>
          <div className={classes.mainContent}>
            <div className={classes.mainTitle}>
              <div className={classes.typingTop}>
                <span>
                  블록체인을 이용해
                  <br />
                  안전하게 거래하기
                </span>
                {/* <span>
                  판다에서 안전하게 <br />
                  거래 서비스를 이용하세요
                </span> */}
              </div>

              <div className={classes.typingMiddle}>
                <p>
                  에스크로를 통해 사기 위험도를 낮춰 <br />
                  안전하게 중고거래를 이용하실 수 있어요.
                </p>
              </div>

              <div className={classes.typingBottom}>
                <Link to="/">
                  <button>중고거래 시작하기</button>
                </Link>
              </div>
            </div>

            <div className={classes.mainImgWrap}>
              {/* <img src={img5} alt="" className={classes.mainImg} /> */}
              <div className={classes.typingBottom2}>
                <Link to="/">
                  <button>중고거래 시작하기</button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 두번쨰 섹션 */}
        <section className={classes.secondWrap}>
          <div className={classes.secondContent}>
            <div className={classes.secondImage}>
              <img src={img2} alt="" className={classes.secondImg} />
            </div>

            <div className={classes.secondTitle}>
              <div className={classes.secondTypingMiddle}>
                <span>
                  원하는 제품
                  <br />
                  검색하고 구매하기
                </span>
              </div>

              <div className={classes.secondTypingBottom}>
                <p>
                  원하는 제품의 키워드를 검색하거나 <br />
                  카테고리를 선택해서 제품을 검색해보세요.
                </p>
              </div>

              <div className={classes.typingBottom}>
                <Link to="/products/all">
                  <button>제품 구매하기</button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 네번째 섹션 */}
        <section className={classes.forthWrap}>
          <div className={classes.forthContent}>
            <div className={classes.forthTitle}>
              <div className={classes.forthTypingMiddle}>
                <span>
                  메타마스크 지갑을 <br />
                  이용해 거래하기
                </span>
              </div>

              <div className="slider-container">
                <StyledSlider {...settings} className={classes["bannerSlide"]}>
                  <div className={classes.firstSlide}>
                    <div className={classes.secondContent}>
                      <div className={classes.secondImage}>
                        <img src={img5} alt="" className={classes.slideImg1} />
                      </div>
                      <div className={classes.secondTitle}>
                        <div className={classes.secondTypingMiddle}>
                          <span>
                            판다 서비스에 <br />
                            메타마스크 지갑을 연결하세요
                          </span>
                        </div>
                        <div className={classes.secondTypingBottom}>
                          <span>
                            메타마스크 지갑을 연결한 후 <br />
                            중고거래를 이용하실 수 있어요.
                          </span>
                        </div>

                        <div className={classes.typingBottom}>
                          <Link to="/manual">
                            <button>서비스 이용 가이드</button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={classes.secondSlide}>
                    <div className={classes.secondContent}>
                      <div className={classes.secondImage}>
                        <img src={img4} alt="" className={classes.slideImg1} />
                      </div>

                      <div className={classes.secondTitle}>
                        <div className={classes.secondTypingMiddle}>
                          <span>
                            지갑에 연결한 후 <br />
                            토큰을 발급 받아 거래에 이용하세요
                          </span>
                        </div>

                        <div className={classes.secondTypingBottom}>
                          <span>
                            판다 서비스는 토큰을 이용해 거래합니다. <br />
                            자세한 사항은 가이드를 참고해주세요.
                          </span>
                        </div>

                        <div className={classes.typingBottom}>
                          <Link to="/manual">
                            <button>서비스 이용 가이드</button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={classes.thirdSlide}>
                    <div className={classes.secondContent}>
                      <div className={classes.secondImage}>
                        <img
                          src={mainImg}
                          alt=""
                          className={classes.slideImg1}
                        />
                      </div>

                      <div className={classes.secondTitle}>
                        <div className={classes.secondTypingMiddle}>
                          <span>
                            제품을 수령한 후 <br />
                            구매 확정 해주세요
                          </span>
                        </div>

                        <div className={classes.secondTypingBottom}>
                          <span>
                            원하는 제품을 구매하여 구매 진행 중 상태에서 제품을
                            수령한 후 구매 확정을 하면 토큰이 판매자에게
                            송금됩니다.
                          </span>
                        </div>

                        <div className={classes.typingBottom}>
                          <Link to="/manual">
                            <button>서비스 이용 가이드</button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </StyledSlider>
              </div>
            </div>
          </div>
        </section>

        {/* 세번째 섹션 */}
        <section className={classes.thirdWrap}>
          <div className={classes.thirdContent}>
            <div className={classes.thirdTitle}>
              <div className={classes.thirdTypingMiddle}>
                <span>
                  판매자와 1대1
                  <br />
                  채팅방 생성하기
                </span>
              </div>

              <div className={classes.thirdTypingBottom}>
                <span>
                  제품 상세 페이지에서 판다톡 버튼을 누르면
                  <br />
                  판매자와의 1대1 채팅방이 생성됩니다.
                </span>

                <div className={classes.typingBottom}>
                  <Link to="/products/all">
                    <button>제품 구매하기</button>
                  </Link>
                </div>
              </div>
            </div>

            <div className={classes.thirdImage}>
              <img src={img3} alt="" className={classes.thirdImg} />
            </div>
          </div>
        </section>
      </div>
    </Fragment>
  );
};

export default Banner;

const StyledSlider = styled(Slider)`
  // .slick-prev {
  //   z-index: 1;
  //   left: 30px;
  // }

  // .slick-next {
  //   right: 60px;
  //   z-index: 1;
  // }

  // .slick-prev:before,
  // .slick-next:before {
  //   font-size: 30px;
  //   opacity: 1;
  //   // color: #1ecfba;
  // color: white;
  // }

  .custom-dot-wrapper {
    width: 100%;
  }

  // .slider-container {
  //   position: relative;
  //   z-index: 1;
  //   backgroundcolor: backgroundColor;
  //   visibility: hidden;
  // }

  .slick-dots {
    position: absolute;
    top: 0;
    height: 44px;

    li button:before {
      display: none;
    }

    li.slick-active button:before {
      display: none;
    }
  }

  .slick-dots ul {
    display: flex;
    flex-direction: row;
  }

  .slick-dots li {
    width: 200px;
  }

  .custom-dot {
    width: 100%;
    height: 100%;
    background: #e9ecef;
    border: 2px solid rgb(238, 238, 238);
    border-radius: 4px;
    padding: 20px 30px;
    cursor: pointer;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: black;
  }
  .custom-dot:hover {
    background: #dee2e6;
  }

  @media screen and (max-width: 600px) {
    slick-dots ul {
      width: 100%;
    }

    .slick-dots li {
      width: 30%;
      height: 100%;
    }

    .custom-dot {
      padding: 15px;
      cursor: pointer;
      font-size: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      color: black;
    }
  }
`;
