import { Fragment } from "react";
import classes from "./Detail.module.css";
import Slide from "./Slide";

const Detail = (props) => {
  return (
    <Fragment>
      <section className={classes.productDetailWrap}>
        <div className={classes.productDetail}>
          <div className={classes.productImgWrap}>
            <Slide className={classes.Slide} />
          </div>
          <div className={classes.productInformationWrap}>
            <div>
              <div className={classes.category}>홈 - 남성의류</div>
              <div className={classes.title}>중부대 로고 팝니다</div>
              <div className={classes.price}>100,000원</div>
              <div className={classes.time}>올라온 시간 및 조회 찜</div>
            </div>
            <div className={classes.buttonWrap}>
              <button className={classes.productPut}>찜하기</button>
              <button className={classes.productMessage}>톡하기</button>
              <button className={classes.productPurchase}>구매하기</button>
            </div>
          </div>
        </div>

        <div className={classes.relationproduct}></div>
      </section>
    </Fragment>
  );
};

export default Detail;
