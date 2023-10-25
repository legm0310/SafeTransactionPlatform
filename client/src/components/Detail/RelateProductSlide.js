import React, { Fragment, useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import classes from "../../styles/detail/RelateProductSlide.module.css";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../../styles/detail/styles.css";

import { Navigation } from "swiper/modules";

const RelatedProductSlide = ({ filteredProducts }) => {
  const [slidesPerView, setSlidesPerView] = useState(4);

  useEffect(() => {
    // 화면 크기에 따라 slidesPerView를 동적으로 설정
    const handleResize = () => {
      if (window.innerWidth < 600) {
        setSlidesPerView(2.5);
      } else {
        setSlidesPerView(4);
      }
    };

    // 페이지가 로드될 때와 창 크기가 변경될 때 리사이즈
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <Fragment>
      <Swiper
        slidesPerView={slidesPerView}
        spaceBetween={15}
        pagination={{
          clickable: true,
        }}
        modules={[Navigation]}
        navigation={true}
      >
        {filteredProducts.map((product, slideContent) => (
          <SwiperSlide key={slideContent}>
            <div className={classes.prodCardWrap}>
              <div className={classes.prodCardContainer}>
                <div key={product.id} className={classes.prodCard}>
                  <Link to={`/products/${product.id}`}>
                    <div className={classes.imgBox}>
                      <img
                        src={product.image}
                        className={classes.prodImg}
                        alt=""
                      />
                    </div>
                    <div className={classes.prodInfo}>
                      <div className={classes.prodName}>{product.title}</div>
                      <div className={classes.prodPrice}>
                        {" "}
                        {product.price.toLocaleString()}
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </Fragment>
  );
};

export default RelatedProductSlide;

// const StyledSlider = styled();
