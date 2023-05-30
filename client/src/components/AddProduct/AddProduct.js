import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProduct } from "../../_actions/productAction";
import {
  FormControlLabel,
  Checkbox,
  Button,
  TextField,
  Alert,
} from "@mui/material";

import classes from "./AddProduct.module.css";

const AddProduct = (props) => {
  const [imgFile, setimgFile] = useState([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [detail, setDetail] = useState("");
  const [titleLength, setTitleLength] = useState(0);
  const [category, setCategory] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onImgFileHandler = (event) => {
    const imgLists = event.target.files;
    let imgUrlLists = [...imgFile];
    for (let i = 0; i < imgLists.length; i++) {
      // 미리보기 가능하게 변수화
      imgUrlLists.push(imgLists[i]);
      // const currentImgUrl = URL.createObjectURL(imgLists[i]);
      // 복사한 imgFile에 추가
    }

    if (imgUrlLists.length > 10) {
      imgUrlLists = imgUrlLists.slice(0, 10);
    }
    setimgFile(imgUrlLists);
  };

  // 이미지 삭제
  const deleteImgHandler = (id) => {
    setimgFile(imgFile.filter((_, index) => index !== id));
  };

  // 제목
  const onTitleHandler = (event) => {
    const value = event.target.value;
    setTitle(value);
    setTitleLength(value.length);
  };

  // 가격
  const onPriceHandler = (event) => {
    const value = event.target.value;

    setPrice(value);

    const inputNumber = Number(event.target.value.replace(/,/g, "")); // 입력된 값에서 ',' 제거 후 숫자로 변환

    if (value === "") {
      setPrice(""); // 입력된 값이 빈 문자열인 경우
    } else if (!isNaN(inputNumber)) {
      // 입력된 값이 숫자인지 확인
      const formattedValue = new Intl.NumberFormat("en-US").format(inputNumber);
      setPrice(formattedValue);
    }
  };

  // 설명
  const onDetailHandler = (event) => {
    const value = event.target.value;

    setDetail(value);
  };

  // 카테고리
  const onCategoryChange = (event) => {
    const selectedCategory = event.target.value; // 선택한 체크박스의 값

    // 선택 여부
    const isSelected = category.includes(selectedCategory);

    if (isSelected) {
      // 이미 선택된 카테고리를 클릭한 경우, 선택 해제
      setCategory((prevCategories) =>
        prevCategories.filter((category) => category !== selectedCategory)
      );
    } else {
      // 선택되지 않은 카테고리를 클릭한 경우, 선택 추가
      setCategory((prevCategories) => [...prevCategories, selectedCategory]);
    }
  };

  // 등록하기
  const onSubmitHandler = (event) => {
    event.preventDefault(); // prevent form submission

    if (title.trim() === "") {
      alert("상품 이름을 입력해주세요.");
      return;
    }
    if (price.trim() === "") {
      alert("상품 가격을 입력해주세요.");
      return;
    }
    if (detail.trim() === "") {
      alert("상품 설명을 입력해주세요.");
      return;
    }
    if (category.length === 0) {
      alert("상품 카테고리를 입력해주세요.");
      return;
    }

    const formData = new FormData();
    imgFile.forEach((file, index) => {
      formData.append(`product`, file);
    });

    props.onAddProduct(
      title,
      price,
      URL.createObjectURL(imgFile[0]),
      detail,
      category
    );
    setTitle("");
    setPrice("");
    setDetail("");
    setCategory([]);
    // code to submit the form
    navigate("/products/all");

    let body = {
      status: "SALE",
      title: title,
      price: price,
      category: category,
      detail: detail,
    };

    // formData.append("data", body);
    for (const key of formData.keys()) {
      console.log(key);
    }
    // FormData의 value 확인
    for (const value of formData.values()) {
      console.log(value);
    }

    dispatch(addProduct(formData)).then((response) => {
      if (response.payload.addProductSuccess) {
        alert("상품 등록 완료");
        navigate("/product/all");
      } else {
        alert("상품 등록에 실패했습니다.");
      }
    });
  };

  return (
    <Fragment>
      <form className={classes.form} onSubmit={onSubmitHandler}>
        <div className={classes.title}>상품 등록하기</div>

        <div className={classes.label}>
          <div className={classes.labelTitle}>사진 등록</div>

          <div>
            <ul className={classes.imgWrap}>
              <li className={classes.imgBox}>
                이미지등록
                <input
                  className={classes.imgUpload}
                  type="file"
                  accept="image/*"
                  onChange={onImgFileHandler}
                  multiple
                />
              </li>

              {imgFile.map(
                (image, id) => (
                  (image = URL.createObjectURL(image)),
                  (
                    <li className={classes.imgContainer} key={id}>
                      <img src={image} alt={`${image}-${id}`} />
                      {/* <Delete onClick={() => deleteImgHandler(id)} /> */}
                    </li>
                  )
                )
              )}
            </ul>

            <ul className={classes.imgExplain}>
              * 상품 이미지는 640x640에 최적화 되어 있습니다.
              <li>
                {" "}
                - 상품 이미지는 PC에서는 1:1, 모바일에서는 1:1.23 비율로
                보여집니다.
              </li>
              <li> - 이미지는 상품 등록 시 정사각형으로 잘려서 등록됩니다.</li>
              <li> - 이미지를 클릭할 경우 원본 이미지를 확인할 수 있습니다.</li>
              <li>
                {" "}
                - 이미지를 클릭 후 이동하여 등록순서를 변경할 수 있습니다.
              </li>
              <li>
                {" "}
                - 큰 이미지일 경우 이미지가 깨지는 경우가 발생할 수 있습니다.
              </li>
              <li>
                최대 지원 사이즈인 640 X 640으로 리사이즈 해서 올려주세요.(개당
                이미지 최대 10M)
              </li>
            </ul>
          </div>
        </div>

        <div className={classes.label2}>
          <div className={classes.labelTitle}>제목</div>
          <TextField
            sx={{ width: "80ch", m: 1 }}
            id="outlined-search"
            onChange={onTitleHandler}
            value={title}
            onInput={(e) => setTitleLength(e.target.value.length)}
            maxLength={40}
            type="search"
            size="small"
          />
          <div>{titleLength}/40</div>
        </div>

        <div className={classes.label2}>
          <label htmlFor="price" className={classes.labelTitle}>
            가격
          </label>
          <TextField
            sx={{ width: "20ch", m: 1 }}
            id="outlined-number"
            onChange={onPriceHandler}
            value={price}
            type="text"
            InputLabelProps={{
              shrink: true,
            }}
            size="small"
          />
          <div>BB</div>
        </div>

        <div className={classes.label2}>
          <div className={classes.labelTitle}>카테고리</div>

          <div className={classes.category}>
            <div className={classes.category}>
              <div className={classes.checkList1}>
                <FormControlLabel
                  sx={{ width: "15ch" }}
                  control={<Checkbox />}
                  onChange={onCategoryChange}
                  checked={category.includes("men")}
                  value="men"
                  label="남성의류"
                />

                <FormControlLabel
                  sx={{ width: "15ch" }}
                  control={<Checkbox />}
                  onChange={onCategoryChange}
                  checked={category.includes("women")}
                  value="women"
                  label="여성의류"
                />

                <FormControlLabel
                  sx={{ width: "15ch" }}
                  control={<Checkbox />}
                  onChange={onCategoryChange}
                  checked={category.includes("acc")}
                  value="acc"
                  label="패션잡화"
                />

                <FormControlLabel
                  sx={{ width: "15ch" }}
                  control={<Checkbox />}
                  onChange={onCategoryChange}
                  checked={category.includes("sports")}
                  value="sports"
                  label="스포츠 용품"
                />

                <FormControlLabel
                  sx={{ width: "15ch" }}
                  control={<Checkbox />}
                  onChange={onCategoryChange}
                  checked={category.includes("shoes")}
                  value="shoes"
                  label="신발"
                />
              </div>
              <div className={classes.checkList2}>
                <FormControlLabel
                  sx={{ width: "15ch" }}
                  control={<Checkbox />}
                  onChange={onCategoryChange}
                  checked={category.includes("homeappliances")}
                  value="homeappliances"
                  label="가전제품"
                />

                <FormControlLabel
                  sx={{ width: "15ch" }}
                  control={<Checkbox />}
                  onChange={onCategoryChange}
                  checked={category.includes("computerPeripherals")}
                  value="computerPeripherals"
                  label="컴퓨터/주변기기"
                />

                <FormControlLabel
                  sx={{ width: "15ch" }}
                  control={<Checkbox />}
                  onChange={onCategoryChange}
                  checked={category.includes("electronic")}
                  value="electronic"
                  label="전자제품"
                />

                <FormControlLabel
                  sx={{ width: "15ch" }}
                  control={<Checkbox />}
                  onChange={onCategoryChange}
                  checked={category.includes("furniture")}
                  value="furniture"
                  label="가구"
                />

                <FormControlLabel
                  sx={{ width: "15ch" }}
                  control={<Checkbox />}
                  onChange={onCategoryChange}
                  checked={category.includes("etc")}
                  value="etc"
                  label="기타"
                />
              </div>
            </div>
          </div>
        </div>

        <div className={classes.label}>
          <div className={classes.labelTitle}>설명</div>

          <TextField
            sx={{ width: "80ch", m: 1 }}
            onChange={onDetailHandler}
            value={detail}
            id="outlined-multiline-static"
            multiline
            rows={6}
          />
        </div>

        <div className={classes.buttonWrap}>
          <Button type="submit" variant="contained">
            등록하기
          </Button>
        </div>
      </form>
    </Fragment>
  );
};

export default AddProduct;
