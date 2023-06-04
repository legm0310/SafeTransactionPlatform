import { Fragment } from "react";

import Slide from "./Slide";
import mainImg from "../../assets/mainImg.png";
import classes from "./Home.module.css";

const Home = (props) => {
  return (
    <Fragment>
      <div className={classes.container}>
        <section className={classes.mainWrap}>
          <div className={classes.mainContent}>
            <div className={classes.mainTitle}>
              <div className={classes.typingTop}>
                <span>안전한</span>
              </div>
              <div className={classes.typingMiddle}>
                <span>거래플랫폼</span>
              </div>
              <div className={classes.typingBottom}>
                <span>블록체인을 활용해 보다 안전하게!</span>
              </div>
            </div>

            <div className={classes.mainImgWrap}>
              <img src={mainImg} alt="" className={classes.mainImg} />
            </div>
          </div>
        </section>

        <section className={classes.ImgslideWrap}>
          <Slide />
        </section>

        <section className={classes.latesProductWrap}>
          <div className={classes.latestProductContainer}>
            <h1>판다의 최근 상품</h1>
            <div className={classes.latestProdList}>
              <div className={classes.latestProdCard}>
                <div className={classes.imgBox}>이미지</div>
                <h4>제목</h4>
                <h4>가격</h4>
              </div>
              <div className={classes.latestProdCard}>
                <div className={classes.imgBox}>이미지</div>
                <h4>제목</h4>
                <h4>가격</h4>
              </div>
              <div className={classes.latestProdCard}>
                <div className={classes.imgBox}>이미지</div>
                <h4>제목</h4>
                <h4>가격</h4>
              </div>
              <div className={classes.latestProdCard}>
                <div className={classes.imgBox}>이미지</div>
                <h4>제목</h4>
                <h4>가격</h4>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Fragment>
  );
};

export default Home;
