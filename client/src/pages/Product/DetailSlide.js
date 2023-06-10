import { Fragment } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import classes from "../../styles/DetailSlide.module.css";
import { useSelector } from "react-redux";

const Slide = () => {
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
        <Slider {...settings}>
          {productDetail?.images.map((img) => (
            <div key={img.split("/").slice(-2).join("/")}>
              <img src={img} alt="" className={classes.slideImg} />
            </div>
          ))}
        </Slider>
      </div>
    </Fragment>
  );
};

export default Slide;
