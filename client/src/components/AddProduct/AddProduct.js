import React, { Fragment, useState } from "react";

import classes from "./AddProduct.module.css";

const AddProduct = (props) => {
  const [imgFile, setimgFile] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [nameLength, setNameLength] = useState(0);
  const [explanation, setExplanation] = useState("");

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
      alert("상품 가격을 입력해주세요.");
      return;
    }
    console.log(name, price, explanation);
    props.onAddProduct(name, price, imgFile, explanation);
    setName("");
    setPrice("");
    setExplanation("");
    // code to submit the form
  };

  const onImgFileHandler = (event) => {
    const selectedImgFile = event.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(selectedImgFile);
    reader.onloadend = () => {
      setimgFile(reader.result);
    };
  };

  const onNameHandler = (event) => {
    const value = event.target.value;
    setName(value);
    setNameLength(value.length);
  };

  const onPriceHandler = (event) => {
    // const newPrice = event.target.value;
    // const regex = /^[0-9\b]+$/; // regex to match only numbers
    // if (newPrice === "" || regex.test(newPrice)) {
    //   setPrice(newPrice);
    // }
    const inputNumber = Number(event.target.value.replace(/,/g, "")); // 입력된 값에서 ',' 제거 후 숫자로 변환
    const formattedValue = new Intl.NumberFormat("en-US").format(inputNumber); // 변환된 숫자를 포맷팅하여 문자열로 변환
    setPrice(formattedValue);
  };

  const onExplanationHandler = (event) => {
    setExplanation(event.currentTarget.value);
  };

  return (
    <Fragment>
      <form className={classes.form} onSubmit={onSubmitHandler}>
        <div className={classes.title}>상품 등록하기</div>

        <div className={classes.label}>
          <div className={classes.labelTitle}>사진 등록</div>

          <div>
            <ul className={classes.imgBox}>
              <li className={classes.imgWrap}>
                이미지등록
                <input
                  className={classes.imgUpload}
                  type="file"
                  accept="image/*"
                  onChange={onImgFileHandler}
                />
              </li>
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
            thousandSeparator={true}
            onValueChange={(values) => {
              setPrice(values.price);
            }}
            onChange={onPriceHandler}
            value={price}
            required
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
