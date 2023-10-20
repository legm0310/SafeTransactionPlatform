import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "../../styles/product/ReactMinimalSideNavigation.css";
import styled from "styled-components";
import { Navigation } from "react-minimal-side-navigation";
// import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";

const Bar = styled.div`
  width: 100%;
`;

const CategoryBar = ({ onCategoryClick }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const setArr = {};

  //   const setType = (itemId) => {
  //     if (typeof itemId === "object") {
  //       dispatch({
  //         type: SET_TYPE,
  //         item: `${itemId.item}`,
  //         title: `${itemId.title}`,
  //         isTag: false,
  //       });
  //     }

  //     if (typeof itemId === "string") {
  //       dispatch({
  //         type: SET_TYPE,
  //         tiem: `${itemId.slice(6)}`,
  //         title: `${itemId.slice(6)}`,
  //         isTag: true,
  //       });
  //     }
  //   };

  return (
    <Fragment>
      <Bar>
        <Navigation
          onSelect={({ itemId }) => onCategoryClick({ category: itemId })}
          items={[
            {
              title: "전체 카테고리",
              itemId: "%",
            },
            {
              title: "남성의류",
              itemId: "남성의류",
            },
            {
              title: "여성의류",
              itemId: "여성의류",
            },
            {
              title: "패션잡화",
              itemId: "패션잡화",
            },
            {
              title: "신발",
              itemId: "신발",
            },
            {
              title: "스포츠 용품",
              itemId: "스포츠 용품",
            },
            {
              title: "가전제품",
              itemId: "가전제품",
            },
            {
              title: "컴퓨터/주변기기",
              itemId: "컴퓨터/주변기기",
            },
            {
              title: "전자기기",
              itemId: "전자기기",
            },
            {
              title: "가구",
              itemId: "가구",
            },
            {
              title: "기타",
              itemId: "기타",
            },
          ]}
        />
      </Bar>
    </Fragment>
  );
};

export default CategoryBar;
