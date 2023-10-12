import { Fragment } from "react";
import { Link } from "react-router-dom";

import classes from "../../styles/manual/Manual.module.css";
import manualImg01 from "../../assets/manual/manualImage01.png";
import manualImg02 from "../../assets/manual/manualImage02.png";
import manualImg03 from "../../assets/manual/manualImage03.png";
import manualImg04 from "../../assets/manual/manualImage04.png";
import manualImg05 from "../../assets/manual/manualImage05.png";
import manualImg06 from "../../assets/manual/manualImage06.png";
import manualImg07 from "../../assets/manual/manualImage07.png";
import manualImg08 from "../../assets/manual/manualImage08.png";
import manualImg09 from "../../assets/manual/manualImage09.png";
import manualImg10 from "../../assets/manual/manualImage10.png";
import manualImg11 from "../../assets/manual/manualImage11.png";
import manualImg12 from "../../assets/manual/manualImage12.png";
import manualImg13 from "../../assets/manual/manualImage13.png";
import manualImg14 from "../../assets/manual/manualImage14.png";
import manualImg15 from "../../assets/manual/manualImage15.png";

const Manual = (props) => {
  return (
    <Fragment>
      <section className={classes.main}>
        <div className={classes.mainImgWrap}>
          <span className={classes.sectionImg}></span>
        </div>
        <p>
          안전한 중고거래 사이트 <br />
          판다 이용방법을 소개합니다
        </p>
      </section>
      <div className={classes.container}>
        <section className={classes.mainWrap}>
          <div className={classes.mainContent}>
            <div className={classes.mainTitle}>
              <div className={classes.mainBottom}>
                <h2>1. 메타마스크 연동</h2>
                <p>
                  &nbsp;1) 판다 중고거래를 이용하기 위해서는&nbsp;
                  <a href="https://metamask.io/" target="_blank">
                    METAMASK
                  </a>
                  라는 이름의 크롬 확장 프로그램을 설치해야합니다.
                  <img
                    src={manualImg01}
                    alt=""
                    className={classes.manualImg01}
                  />
                </p>

                <p>
                  &nbsp;2) Install MetaMask for Chrome 버튼을 클릭하여
                  메타마스크를 설치한 뒤 로그인을 해야합니다.
                  <img
                    src={manualImg02}
                    alt=""
                    className={classes.manualImg01}
                  />
                </p>

                <p>
                  &nbsp;3) 주소창 오른쪽에 위치한 여우 모양의 메타마스크
                  아이콘을 클릭하여 로그인을 합니다.
                  <img
                    src={manualImg03}
                    alt=""
                    className={classes.manualImg03}
                  />
                </p>

                <p>
                  &nbsp;4) 이 과정이 다 마무리 되었으면 판다 사이트의 오른쪽
                  상단에 있는 내 지갑 버튼을 눌러 판다 사이트와의 연동을
                  시작합니다.
                  <img
                    src={manualImg04}
                    alt=""
                    className={classes.manualImg04}
                  />
                </p>

                <p>
                  &nbsp;5) 지갑 연결 버튼을 눌러 현재 로그인이 되어있는
                  메타마스크와 연결합니다.
                  <img
                    src={manualImg05}
                    alt=""
                    className={classes.manualImg05}
                  />
                </p>

                <p>
                  &nbsp;6) 현재 메타마스크가 설치되어 있다면 MetaMask 버튼을
                  클릭합니다.
                  <img
                    src={manualImg06}
                    alt=""
                    className={classes.manualImg06}
                  />
                </p>

                <p>
                  &nbsp;7) 다음 버튼을 클릭합니다.
                  <img
                    src={manualImg07}
                    alt=""
                    className={classes.manualImg07}
                  />
                </p>

                <p>
                  &nbsp;8) 연결 버튼을 클릭합니다.
                  <img
                    src={manualImg08}
                    alt=""
                    className={classes.manualImg08}
                  />
                </p>

                <p>
                  &nbsp;9) 네트워크 전환 버튼을 클릭하여 Sqpolia 네트워크로
                  네트워크를 전환합니다.
                  <img
                    src={manualImg09}
                    alt=""
                    className={classes.manualImg09}
                  />
                </p>

                <p>
                  &nbsp;10) 네트워크 전환 버튼을 클릭합니다.
                  <img
                    src={manualImg10}
                    alt=""
                    className={classes.manualImg10}
                  />
                </p>

                <p>
                  메타마스크의 상태창을 확인하면 세폴리아의 네트워크로 전환되어
                  있음을 확인할 수 있습니다.
                  <img
                    src={manualImg11}
                    alt=""
                    className={classes.manualImg11}
                  />
                </p>

                <p>
                  현재는 가스비를 테스트 네트워크&nbsp;
                  <a href="https://sepoliafaucet.com/" target="_blank">
                    SEPOLIA
                  </a>
                  의 코인으로 지불해야 합니다. 추후 플랫폼 상의 토큰으로 가스비
                  대체가 예정되어 있습니다.
                  <br />
                  <br />
                  10-1) 먼저 오른쪽 상단의 여우 아이콘인 메타마스크 버튼을 눌러
                  네트워크 전환된 지갑 주소를 복사합니다.
                  <img
                    src={manualImg15}
                    alt=""
                    className={classes.manualImg15}
                  />
                </p>

                <p>
                  &nbsp;10-2) 사이트의 입력칸에 복사된 본인의 지갑주소를
                  입력하고 Send Me ETH 버튼을 클릭하면 테스트 코인을 지급받을 수
                  있습니다.
                  <img
                    src={manualImg14}
                    alt=""
                    className={classes.manualImg14}
                  />
                </p>

                <p>
                  &nbsp;11) 이제 네트워크의 전환이 완료되었고 테스트 코인도
                  발급받았으면, 토큰 발급받기 버튼을 클릭하여 판다 토큰을
                  발급받을 수 있습니다.
                  <img
                    src={manualImg12}
                    alt=""
                    className={classes.manualImg12}
                  />
                </p>

                <p>
                  &nbsp;12) 원하는 액수를 적은 뒤 발급받기 버튼을 누르면 현재
                  가지고 있는 네트워크 코인을 지불하여 얻을 수 있습니다.
                  <img
                    src={manualImg13}
                    alt=""
                    className={classes.manualImg13}
                  />
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <section className={classes.main}>
        <div className={classes.mainImgWrap}>
          <span className={classes.sectionImg}></span>
        </div>
        <p>
          판다 중고거래 사이트로 <br />
          안전하게 거래해보세요
        </p>
        <div className={classes.typingButton}>
          <Link to="/">
            <button>중고거래 시작하기</button>
          </Link>
        </div>
      </section>
    </Fragment>
  );
};

export default Manual;
