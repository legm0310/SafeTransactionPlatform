import { Fragment } from "react";
import { Link } from "react-router-dom";

import classes from "../../styles/home/HomeSlide.module.css";
import bannerImg1 from "../../assets/bannerImg1.png";
import bannerImg2 from "../../assets/bannerImg2.png";
import bannerImg3 from "../../assets/bannerImg3.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";

const HomeSlide = () => {
  const settings = {
    dots: true, // 캐러셀 밑에 ... 을 표시할지
    infinite: true, // 슬라이드가 끝까지 가면 다시 처음으로 반복
    speed: 500, // 속도
    autoplay: false, // 자동 재생
    autoplaySpeed: 3000, // 자동 재생 속도
    slidesToShow: 1, // 한 번에 보여줄 슬라이드 개수
    slidesToScroll: 1, // 한 번에 넘어가는 슬라이드 개수
    arrows: true,
  };

  return (
    <Fragment>
      <div className={classes.Slide}>
        <StyledSlider {...settings}>
          <div className={classes.firstSlide}>
            {/* <Link to="/banner"> */}
            <img src={bannerImg1} alt="" className={classes["bannerImg1"]} />
            {/* </Link> */}
          </div>
          <div>
            {/* <Link to="/notice/2"> */}
            <img src={bannerImg2} alt="" className={classes["bannerImg1"]} />
            {/* </Link> */}
          </div>
          <div>
            {/* <Link to="/notice/3"> */}
            <img src={bannerImg3} alt="" className={classes["bannerImg1"]} />
            {/* </Link> */}
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
    font-size: 30px;
    opacity: 1;
    // color: #1ecfba;
    color: white;
  }

  .slick-dots {
    display: flex;
    justify-content: center;

    li button:before {
      color: blue;
    }

    li.slick-active button:before {
      color: blue;
    }
  }
`;
