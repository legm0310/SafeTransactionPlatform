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
  return (
    <Fragment>
      <Swiper
        slidesPerView={4}
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
