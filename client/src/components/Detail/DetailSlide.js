import { Fragment } from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";

import classes from "../../styles/detail/DetailSlide.module.css";

const DetailSlide = () => {
  const productDetail = useSelector(
    (state) => state.product.productDetail?.product
  );
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
      <div>
        <StyledSlider {...settings}>
          {productDetail?.images.map((img) => (
            <div key={img.split("/").slice(-2).join("/")}>
              <img src={img} alt="" className={classes.slideImg} />
            </div>
          ))}
        </StyledSlider>
      </div>
    </Fragment>
  );
};

export default DetailSlide;

const StyledSlider = styled(Slider)`
  .slick-prev {
    z-index: 1;
    left: 30px;
  }

  .slick-next {
    right: 60px;
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
