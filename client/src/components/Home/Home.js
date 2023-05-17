import { Fragment } from "react";

import classes from "./Home.module.css";

const Home = (props) => {
  return (
    <Fragment>
      <section className={classes.container}>
        <div className={classes.content1}>
          <div className={classes.title}>
            <h1>
              <span>안전</span>한
              <br />
              거래플랫폼
            </h1>
            <p>
              <span>블록체인</span>을 활용해 보다 안전하게!
            </p>
          </div>
        </div>
        <div className={classes.content2}>
          <img
            src="https://news.samsungdisplay.com/wp-content/uploads/2018/08/8.jpg"
            alt=""
          />
        </div>
      </section>

      <section className={classes.latesProductWrap}>
        <div className={classes.latestProduct}>
          <h1>최근 등록 상품</h1>
          <div className={classes.latestProdList}>
            <div className={classes.latestProdCard}>
              <div>이미지</div>
              <h4>제목</h4>
              <h4>가격</h4>
            </div>
            <div className={classes.latestProdCard}>
              <div>이미지</div>
              <h4>제목</h4>
              <h4>가격</h4>
            </div>
            <div className={classes.latestProdCard}>
              <div>이미지</div>
              <h4>제목</h4>
              <h4>가격</h4>
            </div>
            <div className={classes.latestProdCard}>
              <div>이미지</div>
              <h4>제목</h4>
              <h4>가격</h4>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Home;
