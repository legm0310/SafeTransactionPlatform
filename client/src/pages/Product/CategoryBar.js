import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "../../styles/product/ReactMinimalSideNavigation.css";
import styled from "styled-components";
import { Navigation } from "react-minimal-side-navigation";
// import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";

const Bar = styled.div`
  width: 12rem;
`;

const CategoryBar = () => {
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
          // onSelect={({ itemId }) => {
          //     if (user && itemId !== '/tags') {
          //       setType(itemId);
          //     }
          //     if (!user && itemId.item !== 'main') {
          //       navigate('/signin');
          //     }
          //   }}

          items={[
            {
              title: "전체 카테고리",
              itemId: { item: "", title: "전체 카테고리" },
              //   elemBefore: () => (
              //     <Icon name="th large" style={{ fontSize: "1.2rem" }} />
              //   ),
            },
            {
              title: "남성의류",
              itemId: { item: "", title: "남성의류" },
              //   elemBefore: () => (
              //     <Icon name="th large" style={{ fontSize: "1.2rem" }} />
              //   ),
            },
            {
              title: "여성의류",
              itemId: { item: "", title: "패션잡화" },
              //   elemBefore: () => (
              //     <Icon name="th large" style={{ fontSize: "1.2rem" }} />
              //   ),
            },
            {
              title: "패션잡화",
              itemId: { item: "", title: "패션잡화" },
              //   elemBefore: () => (
              //     <Icon name="th large" style={{ fontSize: "1.2rem" }} />
              //   ),
            },
            {
              title: "신발",
              itemId: { item: "", title: "신발" },
              //   elemBefore: () => (
              //     <Icon name="th large" style={{ fontSize: "1.2rem" }} />
              //   ),
            },
            {
              title: "스포츠 용품",
              itemId: { item: "", title: "스포츠용품" },
              //   elemBefore: () => (
              //     <Icon name="th large" style={{ fontSize: "1.2rem" }} />
              //   ),
            },
            {
              title: "가전제품",
              itemId: { item: "", title: "가전제품" },
              //   elemBefore: () => (
              //     <Icon name="th large" style={{ fontSize: "1.2rem" }} />
              //   ),
            },
            {
              title: "컴퓨터/주변기기",
              itemId: { item: "", title: "컴퓨터/주변기기" },
              //   elemBefore: () => (
              //     <Icon name="th large" style={{ fontSize: "1.2rem" }} />
              //   ),
            },
            {
              title: "전자제품",
              itemId: { item: "", title: "전자제품" },
              //   elemBefore: () => (
              //     <Icon name="th large" style={{ fontSize: "1.2rem" }} />
              //   ),
            },
            {
              title: "가구",
              itemId: { item: "", title: "가구" },
              //   elemBefore: () => (
              //     <Icon name="th large" style={{ fontSize: "1.2rem" }} />
              //   ),
            },
            {
              title: "기타",
              itemId: { item: "", title: "기타" },
              //   elemBefore: () => (
              //     <Icon name="th large" style={{ fontSize: "1.2rem" }} />
              //   ),
            },
          ]}
        />
      </Bar>
    </Fragment>
  );
};

export default CategoryBar;
