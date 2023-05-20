import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";

import classes from "./AddProduct.module.css";

const AddProduct = (props) => {
  const [imgFile, setimgFile] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [explanation, setExplanation] = useState("");
  const [nameLength, setNameLength] = useState(0);

  const navigate = useNavigate();

  const onSubmitHandler = (event) => {
    event.preventDefault(); // prevent form submission

    if (name.trim() === "") {
      alert("상품 이름을 입력해주세요.");
      return;
    }
    if (price.trim() === "") {
      alert("상품 가격을 입력해주세요.");
      return;
    }
    if (explanation.trim() === "") {
      alert("상품 설명을 입력해주세요.");
      return;
    }

    props.onAddProduct(name, price, imgFile, explanation);
    setName("");
    setPrice("");
    setExplanation("");
    // code to submit the form
    navigate("/Purchase");
  };

  const onImgFileHandler = (event) => {
    const imgLists = event.target.files;
    const imgUrlLists = [...imgFile];

    for (let i = 0; i < imgLists.length; i++) {
      // 미리보기 가능하게 변수화
      const currentImgUrl = URL.createObjectURL(imgLists[i]);
      // 복사한 imgFile에 추가
      imgUrlLists.push(currentImgUrl);
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

  const onNameHandler = (event) => {
    const value = event.target.value;
    setName(value);
    setNameLength(value.length);
  };

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

  const onExplanationHandler = (event) => {
    const value = event.target.value;

    setExplanation(value);
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

              {imgFile.map((image, id) => (
                <li className={classes.imgContainer} key={id}>
                  <img src={image} alt={`${image}-${id}`} />
                  {/* <Delete onClick={() => deleteImgHandler(id)} /> */}
                </li>
              ))}
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
          <input
            className={classes.inputTitle}
            onChange={onNameHandler}
            value={name}
            onInput={(e) => setNameLength(e.target.value.length)}
            maxLength={40}
          />
          <div>{nameLength}/40</div>
        </div>

        <div className={classes.label2}>
          <label htmlFor="price" className={classes.labelTitle}>
            가격
          </label>
          <input
            type="text"
            id="price"
            className={classes.inputPrice}
            thousandseparator="true"
            onChange={onPriceHandler}
            value={price}
          />
          <div>BB</div>
        </div>

        <div className={classes.label2}>
          <div className={classes.labelTitle}>카테고리</div>

          <div className={classes.category}>
            <div>
              <label>
                <input type="checkbox" />
                남성의류
              </label>
              <label>
                <input type="checkbox" />
                가전제품
              </label>
            </div>

            <div>
              <label>
                <input type="checkbox" />
                여성의류
              </label>
              <label>
                <input type="checkbox" />
                컴퓨터/주변기기
              </label>
            </div>

            <div>
              <label>
                <input type="checkbox" />
                패션잡화
              </label>
              <label>
                <input type="checkbox" />
                전자제품
              </label>
            </div>

            <div>
              <label>
                <input type="checkbox" />
                신발
              </label>
              <label>
                <input type="checkbox" />
                가구
              </label>
            </div>

            <div>
              <label>
                <input type="checkbox" />
                스포츠용품
              </label>
              <label>
                <input type="checkbox" />
                기타
              </label>
            </div>
          </div>
        </div>

        <div className={classes.label}>
          <div className={classes.labelTitle}>설명</div>

          <textarea
            className={classes.inputTextarea}
            onChange={onExplanationHandler}
            value={explanation}
          />
        </div>

        <div className={classes.buttonWrap}>
          <button type="submit" className={classes.addButton}>
            등록하기
          </button>
        </div>
      </form>
    </Fragment>
  );
};

export default AddProduct;
