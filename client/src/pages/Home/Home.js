import { Fragment, useEffect, useState } from "react";

import Slide from "./HomeSlide";
import mainImg from "../../assets/platformImage1.png";
import mainImg1 from "../../assets/platformImage4.png";
import classes from "../../styles/Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getRecentProduct } from "../../_actions/productAction";
import RecentProductList from "../../components/RecentProductList";

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
              <img src={mainImg1} alt="" className={classes.mainImg1} />
            </div>
          </div>
        </section>

        <section className={classes.ImgslideWrap}>
          <Slide />
        </section>

        <section className={classes.latesProductWrap}>
          <RecentProductList />
        </section>
      </div>
    </Fragment>
  );
};

export default Home;
