import { Fragment } from "react";
import { Link } from "react-router-dom";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import Slide from "../../components/Home/HomeSlide";
import RecentProductsList from "../../components/Product/RecentProducts";

import classes from "../../styles/home/Home.module.css";
import mainImg from "../../assets/mainImg.png";
import bannerImg from "../../assets/homeBannerImg.png";

const Home = (props) => {
  const [text] = useTypewriter({
    words: ["안전한", "투명한"],
    loop: {},
    typeSpeed: 70,
  });

  return (
    <Fragment>
      <div className={classes.container}>
        <section className={classes.mainWrap}>
          <div className={classes.mainContent}>
            <div className={classes.mainTitle}>
              <div className={classes.typingTop}>
                <span>{text}</span>
                <span>
                  <Cursor style={{ fontWeight: "normal" }} />
                </span>
              </div>
              <div className={classes.typingMiddle}>
                <span>중고거래</span>
              </div>
              <div className={classes.typingBottom}>
                <span>블록체인을 활용해 보다 안전하게!</span>
              </div>
              <div className={classes.introButton}>
                <Link to="/banner">
                  <button>서비스 더 알아보기</button>
                </Link>
              </div>
            </div>

            <div className={classes.mainImgWrap}>
              <img src={mainImg} alt="" className={classes.mainImg} />
            </div>
          </div>
        </section>

        <section className={classes.imgslideWrap}>
          <Slide />
          <img src={bannerImg} alt="" className={classes.bannerImg} />
        </section>

        <section className={classes.latesProductWrap}>
          <RecentProductsList />
        </section>
      </div>
    </Fragment>
  );
};

export default Home;
