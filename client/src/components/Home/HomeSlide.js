import { Fragment } from "react";
import { Link } from "react-router-dom";

import classes from "../../styles/home/HomeSlide.module.css";
import testImg from "../../assets/testImg1.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";

const HomeSlide = () => {
  const settings = {
    dots: true, // 캐러셀 밑에 ... 을 표시할지
    infinite: true, // 슬라이드가 끝까지 가면 다시 처음으로 반복
    speed: 500, // 속도
    autoplay: true, // 자동 재생
    autoplaySpeed: 5000, // 자동 재생 속도
    slidesToShow: 1, // 한 번에 보여줄 슬라이드 개수
    slidesToScroll: 1, // 한 번에 넘어가는 슬라이드 개수
    arrows: true,
  };

  return (
    <Fragment>
      <div className={classes.Slide}>
        <StyledSlider {...settings}>
          <div className={classes.firstSlide}>
            <Link to="/notice/1">
              <img src={testImg} alt="" className={classes.slideImg} />
            </Link>
            <h3>1</h3>
          </div>
          <div>
            <Link to="/notice/2">
              <img src={testImg} alt="" className={classes.slideImg} />
            </Link>
            <h3>2</h3>
          </div>
          <div>
            <Link to="/notice/3">
              <img src={testImg} alt="" className={classes.slideImg} />
            </Link>
            <h3>3</h3>
          </div>
          <div>
            <Link to="/notice/4">
              <img src={testImg} alt="" className={classes.slideImg} />
            </Link>
            <h3>4</h3>
          </div>
          <div>
            <Link to="/notice/5">
              <img src={testImg} alt="" className={classes.slideImg} />
            </Link>
            <h3>5</h3>
          </div>
          <div>
            <Link to="/notice/6">
              <img src={testImg} alt="" className={classes.slideImg} />
            </Link>
            <h3>6</h3>
          </div>
        </StyledSlider>
      </div>
    </Fragment>
  );
};

export default HomeSlide;

const StyledSlider = styled(Slider)`
  .slick-prev {
    z-index: 1;
    left: 30px;
  }

  .slick-next {
    right: 60px;
    z-index: 1;
  }

  .slick-prev:before,
  .slick-next:before {
    font-size: 50px;
    opacity: 1;
    color: #1ecfba;
  }

  .slick-dots {
    display: flex;
    justify-content: center;
    bottom: 30px;
    color: white;

    li button:before {
      color: white;
    }

    li.slick-active button:before {
      color: white;
    }
  }
`;
