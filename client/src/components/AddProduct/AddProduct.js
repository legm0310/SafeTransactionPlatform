import React, { Fragment, useState } from "react";
import classes from "./AddProduct.module.css";
import moment from 'moment';
import { v4 as uuidv4 } from "uuid";


const AddProduct = (props) => {
    const [imgFile, setimgFile] = useState(null);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [nameLength, setNameLength] = useState(0);
    const [explanation, setExplanation] = useState("");
    const [productCategory, setProductCategory] = useState("");
    const [registrationTime, setRegistrationTime] = useState("");
    const [productId, setProductId] = useState('');

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
        if (productCategory.trim() === "") {
            alert("상품 카테고리를 설정해주세요.")
            return;
        }
        if (imgFile.trim() === null) {

            
        }
        console.log(name, price, explanation, productCategory, registrationTime, productId);
        props.onAddProduct(name, price, imgFile, explanation, productCategory, registrationTime, productId);
        setName("");
        setPrice("");
        setExplanation("");
        setProductCategory("");
        setRegistrationTime("");
        setProductId('');
        alert('상품이 등록 되었습니다');
        // code to submit the form
    };


    // 이미지 파일 업로드
    const onImgFileHandler = (event) => {
        const selectedImgFile = event.target.files[0];
        const reader = new FileReader();

        reader.readAsDataURL(selectedImgFile);
        reader.onloadend = () => {
        setimgFile(reader.result);
        };
    };


    // 제목
    const onNameHandler = (event) => {
        const value = event.target.value;
        setName(value);
        setNameLength(value.length);
    };


    // 가격 및 숫자만
    const onPriceHandler = (event) => {
        const newPrice = event.target.value;
        const regex = /^[0-9\b]+$/; // regex to match only numbers
        if (newPrice === "" || regex.test(newPrice)) {
            setPrice(newPrice);
        }
    };

    // 설명
    const onExplanationHandler = (event) => {
        setExplanation(event.currentTarget.value);
    };


    // 카테고리 
    const onProductCategoryChange = (event) => {
        const selectedCategory = event.target.value; // 선택한 체크박스의 값
        if (productCategory === selectedCategory) {
            // 이미 선택된 카테고리를 클릭한 경우
            setProductCategory(''); // 선택을 해제하기 위해 빈 문자열로 설정
        } else {
            setProductCategory(selectedCategory); // 선택한 카테고리로 설정
        }
        console.log(selectedCategory);
    };

    // 등록시간
    const onRegistrationTime = () => {
        const currentTime = moment().format("YYYY-MM-DD HH:mm:ss");
        setRegistrationTime(currentTime);
        setProductId(uuidv4());
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
                        onChange={onPriceHandler}
                        value={price}
                        required
                    />
                    <div>BB</div>
                </div>

                <div className={classes.label2}>
                    <div className={classes.labelTitle}>카테고리</div>
                        <div className={classes.category}>
                            <div className={classes.checkList1}>
                                <div>
                                    <input
                                        type="checkbox"
                                        value="men"
                                        id="menCheckbox"
                                        checked={productCategory === 'men'}
                                        onChange={onProductCategoryChange}
                                    />
                                    <label htmlFor="menCheckbox">남성의류</label>
                                </div>
                                
                                <div>
                                    <input
                                        type="checkbox"
                                        id="womenCheckbox"
                                        value="women"
                                        checked={productCategory === 'women'}
                                        onChange={onProductCategoryChange}
                                    />
                                    <label htmlFor="womenCheckbox">여성의류</label>
                                </div>

                                <div>
                                    <input
                                        type="checkbox"
                                        id="accCheckbox"
                                        value="acc"
                                        checked={productCategory === 'acc'}
                                        onChange={onProductCategoryChange}
                                    />
                                    <label htmlFor="accCheckbox">패션잡화</label>
                                </div>

                                <div>
                                    <input
                                        type="checkbox"
                                        id="sportsCheckbox"
                                        value="sports"
                                        checked={productCategory === 'sports'}
                                        onChange={onProductCategoryChange}
                                    />
                                    <label htmlFor="sportsCheckbox">스포츠 용품</label>
                                </div>

                                <div>
                                    <input
                                        type="checkbox"
                                        id="shoesCheckbox"
                                        value="shoes"
                                        checked={productCategory === 'shoes'}
                                        onChange={onProductCategoryChange}
                                    />
                                    <label htmlFor="shoesCheckbox">신발</label>
                                </div>
                            </div>
                            <div className={classes.checkList2}>
                                
                                <div>
                                    <input
                                        type="checkbox"
                                        id="hlCheckbox"
                                        value="homeappliances"
                                        checked={productCategory === 'homeappliances'}
                                        onChange={onProductCategoryChange}
                                    />
                                    <label htmlFor="hlCheckbox">가전제품</label>
                                </div>
                                
                                <div>
                                    <input
                                        type="checkbox"
                                        id="cpCheckbox"
                                        value="computerPeripherals"
                                        checked={productCategory === 'computerPeripherals'}
                                        onChange={onProductCategoryChange}
                                    />
                                    <label htmlFor="cpCheckbox">컴퓨터/주변기기</label>
                                </div>

                                <div>
                                    <input
                                        type="checkbox"
                                        id="electronicCheckbox"
                                        value="electronic"
                                        checked={productCategory === 'electronic'}
                                        onChange={onProductCategoryChange}
                                    />
                                    <label htmlFor="electronicCheckbox">전자제품</label>
                                </div>

                                <div>
                                    <input
                                        type="checkbox"
                                        id="furnitureCheckbox"
                                        value="furniture"
                                        checked={productCategory === 'furniture'}
                                        onChange={onProductCategoryChange}
                                    />
                                    <label htmlFor="furnitureCheckbox">가구</label>
                                </div>

                                <div>
                                    <input
                                        type="checkbox"
                                        id="etcCheckbox"
                                        value="etc"
                                        checked={productCategory === 'etc'}
                                        onChange={onProductCategoryChange}
                                    />
                                    <label htmlFor="etcCheckbox">기타</label>
                                </div>
                            </div>
                        </div>           
                </div>
                
                <div className={classes.label}>
                    <div className={classes.labelTitle}>설명</div>

                    <textarea
                        placeholder="제품에 대한 자세한 정보를 적어주세요."
                        className={classes.inputTextarea}
                        onChange={onExplanationHandler}
                        value={explanation}
                    />
                </div>

                <div className={classes.buttonWrap}>
                    <button type="submit" className={classes.addButton} onClick={onRegistrationTime}>
                        등록하기
                    </button>
                </div>
            </form>
        </Fragment>
    );
};

export default AddProduct;
