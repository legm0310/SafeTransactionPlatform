import { Fragment } from "react";

import classes from "../../styles/banner/Banner.module.css";
import mainImg from "../../assets/platformImage1.png";
import mainImg1 from "../../assets/platformImage4.png";
import Slider from "react-slick";

const Banner = (props) => {
  const customPhrases = [
    "판다 메인",
    "상품구매",
    "상품판매",
    // Add more custom texts for each item as needed
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: (dots) => (
      <div
        style={{
          borderRadius: "20px",
        }}
      >
        <ul
          style={{
            listStyle: "none",
            padding: 0,
          }}
        >
          {" "}
          {dots}{" "}
        </ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        style={{
          width: "30px",
          // border: "1px gray solid",
        }}
        className={classes.test}
      >
        {customPhrases[i]}
      </div>
    ),
  };

  return (
    <Fragment>
      <div className={classes.container}>
        <section className={classes.mainWrap}>
          <div className={classes.mainContent}>
            <div className={classes.mainTitle}>
              <div className={classes.typingMiddle}>
                <span>
                  블록체인을 이용해서 <br />
                  중고거래를 안전하게
                </span>
              </div>
              <div className={classes.typingBottom}>
                <button>중고거래 시작하기</button>
              </div>
            </div>

            <div className={classes.mainImgWrap}>
              {/* <img src={mainImg} alt="" className={classes.mainImg} /> */}
              <img src={mainImg1} alt="" className={classes.mainImg1} />
            </div>
          </div>
        </section>

        {/* 두번쨰 섹션 */}
        <section className={classes.secondWrap}>
          <div className={classes.secondContent}>
            <div className={classes.secondImage}>
              <img src={mainImg} alt="" className={classes.secondImg} />
            </div>
            <div className={classes.secondTitle}>
              <div className={classes.secondTypingMiddle}>
                <span>
                  블록체인의 기술로 <br />
                  안전하게 거래하세요
                </span>
              </div>
              <div className={classes.secondTypingBottom}>
                <span>
                  사기를 블록체인을 이용하여 사전에 방어하기에 <br />
                  안전하게 중고거래를 이용하실 수 있어요
                </span>
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
                  이더리움 지갑 <br />
                  메타마스크의 이용
                </span>
              </div>
              <div className={classes.thirdTypingBottom}>
                <span>
                  메타마스크란 이더리움 등 가상자산을 <br /> 보관, 송금, 관리할
                  수 있는 프로그램입니다. <br /> 메타마스크를 이용하여 <br />{" "}
                  안전한 중고거래를 이용해보세요.
                </span>
              </div>
            </div>
            <div className={classes.thirdImage}>
              <img src={mainImg} alt="" className={classes.mainImg} />
            </div>
          </div>
        </section>

        {/* 네번째 섹션 */}
        <section className={classes.forthWrap}>
          <div className={classes.forthContent}>
            <div className={classes.forthTitle}>
              <div className={classes.forthTypingMiddle}>
                <span>
                  메타마스크를 사용해서 <br />
                  안전한 중고거래를 이용해보세요
                </span>
              </div>
              <div className={classes.mainSlide}>
                <Slider {...settings}>
                  <div className={classes.firstSlide}>
                    <div className={classes.secondContent}>
                      <div className={classes.secondImage}>
                        <img
                          src={mainImg}
                          alt=""
                          className={classes.secondImg}
                        />
                      </div>
                      <div className={classes.secondTitle}>
                        <div className={classes.secondTypingMiddle}>
                          <span>
                            블록체인의 기술로 <br />
                            안전하게 거래하세요
                          </span>
                        </div>
                        <div className={classes.secondTypingBottom}>
                          <span>
                            사기를 블록체인을 이용하여 사전에 방어하기에 <br />
                            안전하게 중고거래를 이용하실 수 있어요
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={classes.secondSlide}>
                    <div className={classes.secondContent}>
                      <div className={classes.secondImage}>
                        <img
                          src={mainImg}
                          alt=""
                          className={classes.secondImg}
                        />
                      </div>
                      <div className={classes.secondTitle}>
                        <div className={classes.secondTypingMiddle}>
                          <span>
                            블록체인의 기술로 <br />
                            안전하게 거래하세요
                          </span>
                        </div>
                        <div className={classes.secondTypingBottom}>
                          <span>
                            사기를 블록체인을 이용하여 사전에 방어하기에 <br />
                            안전하게 중고거래를 이용하실 수 있어요
                          </span>
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
                          className={classes.secondImg}
                        />
                      </div>
                      <div className={classes.secondTitle}>
                        <div className={classes.secondTypingMiddle}>
                          <span>
                            블록체인의 기술로 <br />
                            안전하게 거래하세요
                          </span>
                        </div>
                        <div className={classes.secondTypingBottom}>
                          <span>
                            사기를 블록체인을 이용하여 사전에 방어하기에 <br />
                            안전하게 중고거래를 이용하실 수 있어요
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Slider>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Fragment>
  );
};

export default Banner;