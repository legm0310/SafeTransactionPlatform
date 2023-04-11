import React, { Fragment, useState } from "react";
import classes from "./AddProduct.module.css";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [nameLength, setNameLength] = useState(0);

  const handleNameChange = (event) => {
    const value = event.target.value;
    setName(value);
    setNameLength(value.length);
  };

  const handlePriceChange = (event) => {
    const newPrice = event.target.value;
    const regex = /^[0-9\b]+$/; // regex to match only numbers
    if (newPrice === "" || regex.test(newPrice)) {
      setPrice(newPrice);
    }
  };

  return (
    <Fragment>
      <ul className={classes.form}>
        <div className={classes.title}>상품 등록하기</div>
        <li className={classes.label}>
          <div className={classes.labelTitle}>사진 등록</div>
          <div>
            <form className={classes.imgSubmit}>
              <label htmlFor="imgUpload">이미지 등록 +</label>
              <input id={classes.imgUpload} type="file" accept="image/*" />
            </form>
            <ul className={classes.imgExplain}>
              * 상품 이미지는 640x640에 최적화 되어 있습니다.
              <li>
                - 상품 이미지는 PC에서는 1:1, 모바일에서는 1:1.23 비율로
                보여집니다.
              </li>
              <li>- 이미지는 상품 등록 시 정사각형으로 잘려서 등록됩니다.</li>
              <li>- 이미지를 클릭할 경우 원본 이미지를 확인할 수 있습니다.</li>
              <li>
                - 이미지를 클릭 후 이동하여 등록순서를 변경할 수 있습니다.
              </li>
              <li>
                - 큰 이미지일 경우 이미지가 깨지는 경우가 발생할 수 있습니다.
              </li>
              <li>
                최대 지원 사이즈인 640 X 640으로 리사이즈 해서 올려주세요.(개당
                이미지 최대 10M)
              </li>
            </ul>
          </div>
        </li>
        <li className={classes.label2}>
          <div className={classes.labelTitle}>제목</div>
          <input
            className={classes.inputTitle}
            onChange={handleNameChange}
            onInput={(e) => setNameLength(e.target.value.length)}
            maxLength={40}
          />
          <div>{nameLength}/40</div>
        </li>
        <li className={classes.label2}>
          <label htmlFor="price" className={classes.labelTitle}>
            가격
          </label>
          <input
            type="text"
            id="price"
            value={price}
            className={classes.inputPrice}
            onChange={handlePriceChange}
            required
          />
          <div>BB</div>
        </li>
        <li className={classes.label}>
          <div className={classes.labelTitle}>설명</div>
          <textarea className={classes.inputTextarea} />
        </li>
        <li className={classes.addButton}>
          <button type="submit" className={classes.button}>
            등록하기
          </button>
        </li>
      </ul>
    </Fragment>
  );
};

export default AddProduct;
