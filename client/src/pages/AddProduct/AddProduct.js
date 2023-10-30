import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoadings } from "../../_actions/uiAction";
import { addProduct } from "../../_actions/productAction";
import { useAddress, useSDK } from "@thirdweb-dev/react";
import { RxCrossCircled } from "react-icons/rx";

import classes from "../../styles/addProduct/AddProduct.module.css";
import { useSnackbar } from "notistack";
import {
  FormControlLabel,
  Checkbox,
  Button,
  TextField,
  Alert,
  Snackbar,
} from "@mui/material";

const AddProduct = (props) => {
  const [imgFile, setimgFile] = useState([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [detail, setDetail] = useState("");
  const [titleLength, setTitleLength] = useState(0);
  const [detailLength, setDetailLength] = useState(0);
  const [category, setCategory] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sdk = useSDK();
  const address = useAddress();
  const { enqueueSnackbar } = useSnackbar();

  const onImgFileHandler = (event) => {
    const imgLists = event.target.files;
    let imgUrlLists = [...imgFile];
    for (let i = 0; i < imgLists.length; i++) {
      imgUrlLists.push(imgLists[i]);
    }

    if (imgUrlLists.length > 10) {
      imgUrlLists = imgUrlLists.slice(0, 10);
    }
    setimgFile(imgUrlLists);
  };

  const handleAlert = () => {
    setAlertOpen(true);
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  // 이미지 삭제
  const deleteImgHandler = (event, id) => {
    event.preventDefault();
    URL.revokeObjectURL(imgFile[id]);
    setimgFile(imgFile.filter((_, index) => index !== id));
  };

  // 제목
  const onTitleHandler = (event) => {
    const value = event.target.value;
    setTitle(value);
    setTitleLength(value.length);
    if (value.length >= 40) {
      setTitle(value.slice(0, -1));
    }
  };

  // 가격
  const onPriceHandler = (event) => {
    const value = event.target.value;

    setPrice(value);

    const inputNumber = Number(event.target.value.replace(/,/g, "")); // 입력된 값에서 ',' 제거 후 숫자로 변환

    if (value === "") {
      setPrice(""); // 입력된 값이 빈 문자열인 경우
    } else if (value.length > 11) {
      setPrice(value.slice(0, -1));
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
    setDetailLength(value.length);

    if (value.length > 2000) {
      setDetail(value.slice(0, -1));
    }
  };

  const onCategoryChange = (event) => {
    const selectedCategoryValue = event.target.value;

    setCategory(selectedCategoryValue);
  };

  // 등록하기
  const onSubmitHandler = (event) => {
    event.preventDefault(); // prevent form submission

    if (!address) {
      setAlertOpen(true);
      return;
    }
    if (imgFile.length === 0) {
      return enqueueSnackbar("1장 이상의 사진을 등록해주세요.", {
        variant: "error",
      });
    }
    if (title.trim() === "") {
      return enqueueSnackbar("상품 이름을 입력해주세요.", {
        variant: "error",
      });
    }
    if (price.trim() === "") {
      return enqueueSnackbar("상품 가격을 입력해주세요.", {
        variant: "error",
      });
    }
    if (isNaN(+price.split(",").join(""))) {
      return enqueueSnackbar("가격은 숫자만 입력할 수 있습니다.", {
        variant: "error",
      });
    } else if (price > 1000000000) {
      return enqueueSnackbar("유효하지 않은 가격입니다.", {
        variant: "error",
      });
    }
    if (detail.trim() === "") {
      return enqueueSnackbar("상품 설명을 입력해주세요.", {
        variant: "error",
      });
    } else if (detail.trim().length > 2000) {
      return enqueueSnackbar("상품 설명을 2000자 이하로 작성해주세요.", {
        variant: "error",
      });
    }
    if (category.length === 0) {
      return enqueueSnackbar("상품 카테고리를 입력해주세요.", {
        variant: "error",
      });
    }

    setTitle("");
    setPrice("");
    setDetail("");
    setCategory([]);
    // code to submit the form

    let body = {
      status: "SALE",
      title: title,
      price: price.split(",").join(""),
      category: category,
      detail: detail,
      address: address,
      images: null,
    };

    const formData = new FormData();

    imgFile.forEach((file, index) => {
      formData.append(`prodImg`, file);
    });
    formData.append("data", JSON.stringify(body));

    // FormData의 value 확인
    for (const value of formData.values()) {
      console.log(value);
    }
    const data = {
      formData: formData,
      sdk: sdk,
    };
    dispatch(addProduct(data)).then((response) => {
      console.log(response);
      if (response.payload.addProductSuccess) {
        enqueueSnackbar("상품 등록이 완료됐습니다.", {
          variant: "success",
        });
        navigate("/");
      } else {
        enqueueSnackbar("상품 등록에 실패했습니다.", {
          variant: "error",
        });
      }
    });
  };

  return (
    <Fragment>
      <Snackbar
        open={alertOpen}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={2500}
        onClose={handleAlertClose}
        sx={{ marginTop: "70px" }}
      >
        <Alert
          onClose={handleAlertClose}
          severity="error"
          elevation={3}
          sx={{ width: "100%" }}
        >
          토큰을 송금받을 지갑을 연결해주세요.
        </Alert>
      </Snackbar>
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
                      <div>
                        <RxCrossCircled
                          onClick={(event) => deleteImgHandler(event, id)}
                          className={classes.ImgDelete}
                        />
                        <a href={image} target="_blank">
                          <img
                            src={image}
                            alt={`${image}-${id}`}
                            className={classes.img}
                          />
                        </a>
                      </div>
                    </li>
                  )
                )
              )}
            </ul>

            <ul className={classes.imgExplain}>
              * 상품 이미지는 430x430에 최적화 되어 있습니다.
              <li> - 상품 이미지는 PC에서는 1:1 비율로 보여집니다.</li>
              <li> - 이미지는 상품 등록 시 정사각형으로 잘려서 등록됩니다.</li>
              <li> - 이미지를 클릭할 경우 원본 이미지를 확인할 수 있습니다.</li>
              <li>
                - 큰 이미지일 경우 이미지가 깨지는 경우가 발생할 수 있습니다.
              </li>
            </ul>
          </div>
        </div>

        <div className={classes.label2}>
          <div className={classes.labelTitle}>제목</div>
          <TextField
            sx={{
              width: { xs: "80%", md: "70%" },
              m: 1,
              "& .MuiOutlinedInput-root.Mui-focused": {
                "& > fieldset": {
                  borderColor: "#1ecfba",
                },
              },
            }}
            id="outlined-search"
            onChange={onTitleHandler}
            value={title}
            onInput={(e) => setTitleLength(e.target.value.length)}
            maxLength={40}
            type="search"
            size="small"
            className={classes.input}
          />
          <div>{titleLength}/40</div>
        </div>

        <div className={classes.label2}>
          <label htmlFor="price" className={classes.labelTitle}>
            가격
          </label>
          <TextField
            sx={{
              width: { xs: "40%", md: "20%" },
              m: 1,
              "& .MuiOutlinedInput-root.Mui-focused": {
                "& > fieldset": {
                  borderColor: "#1ecfba",
                },
              },
            }}
            id="outlined-number"
            onChange={onPriceHandler}
            value={price}
            type="text"
            InputLabelProps={{
              shrink: true,
            }}
            size="small"
            className={classes.priceInput}
          />
          <div>PDT</div>
        </div>

        <div className={classes.label2}>
          <div className={classes.labelTitle}>카테고리</div>

          <div className={classes.category}>
            <div className={classes.checkList1}>
              <FormControlLabel
                sx={{ width: "15ch", whiteSpace: "nowrap" }}
                control={
                  <Checkbox
                    sx={{
                      "&.Mui-checked": {
                        color: "#1ecfba",
                      },
                    }}
                  />
                }
                onChange={onCategoryChange}
                // checked={category.includes("men")}
                checked={category === "남성의류"}
                value="남성의류"
                label="남성의류"
              />

              <FormControlLabel
                sx={{ width: "15ch", whiteSpace: "nowrap" }}
                control={
                  <Checkbox
                    sx={{
                      "&.Mui-checked": {
                        color: "#1ecfba",
                      },
                    }}
                  />
                }
                onChange={onCategoryChange}
                // checked={category.includes("women")}
                checked={category === "여성의류"}
                value="여성의류"
                label="여성의류"
              />

              <FormControlLabel
                sx={{ width: "15ch", whiteSpace: "nowrap" }}
                control={
                  <Checkbox
                    sx={{
                      "&.Mui-checked": {
                        color: "#1ecfba",
                      },
                    }}
                  />
                }
                onChange={onCategoryChange}
                // checked={category.includes("acc")}
                checked={category === "패션잡화"}
                value="패션잡화"
                label="패션잡화"
              />

              <FormControlLabel
                sx={{ width: "15ch", whiteSpace: "nowrap" }}
                control={
                  <Checkbox
                    sx={{
                      "&.Mui-checked": {
                        color: "#1ecfba",
                      },
                    }}
                  />
                }
                onChange={onCategoryChange}
                // checked={category.includes("sports")}
                checked={category === "스포츠 용품"}
                value="스포츠 용품"
                label="스포츠 용품"
              />

              <FormControlLabel
                sx={{ width: "15ch", whiteSpace: "nowrap" }}
                control={
                  <Checkbox
                    sx={{
                      "&.Mui-checked": {
                        color: "#1ecfba",
                      },
                    }}
                  />
                }
                onChange={onCategoryChange}
                // checked={category.includes("shoes")}
                checked={category === "신발"}
                value="신발"
                label="신발"
              />
            </div>

            <div className={classes.checkList2}>
              <FormControlLabel
                sx={{ width: "15ch", whiteSpace: "nowrap" }}
                control={
                  <Checkbox
                    sx={{
                      "&.Mui-checked": {
                        color: "#1ecfba",
                      },
                    }}
                  />
                }
                onChange={onCategoryChange}
                // checked={category.includes("homeappliances")}
                checked={category === "가전제품"}
                value="가전제품"
                label="가전제품"
              />

              <FormControlLabel
                sx={{ width: "15ch", whiteSpace: "nowrap" }}
                control={
                  <Checkbox
                    sx={{
                      "&.Mui-checked": {
                        color: "#1ecfba",
                      },
                    }}
                  />
                }
                onChange={onCategoryChange}
                // checked={category.includes("computerPeripherals")}
                checked={category === "컴퓨터/주변기기"}
                value="컴퓨터/주변기기"
                label="컴퓨터/주변기기"
              />

              <FormControlLabel
                sx={{ width: "15ch", whiteSpace: "nowrap" }}
                control={
                  <Checkbox
                    sx={{
                      "&.Mui-checked": {
                        color: "#1ecfba",
                      },
                    }}
                  />
                }
                onChange={onCategoryChange}
                // checked={category.includes("electronic")}
                checked={category === "전자기기"}
                value="전자기기"
                label="전자기기"
              />

              <FormControlLabel
                sx={{ width: "15ch", whiteSpace: "nowrap" }}
                control={
                  <Checkbox
                    sx={{
                      "&.Mui-checked": {
                        color: "#1ecfba",
                      },
                    }}
                  />
                }
                onChange={onCategoryChange}
                // checked={category.includes("furniture")}
                checked={category === "가구"}
                value="가구"
                label="가구"
              />

              <FormControlLabel
                sx={{ width: "15ch", whiteSpace: "nowrap" }}
                control={
                  <Checkbox
                    sx={{
                      "&.Mui-checked": {
                        color: "#1ecfba",
                      },
                    }}
                  />
                }
                onChange={onCategoryChange}
                // checked={category.includes("etc")}
                checked={category === "기타"}
                value="기타"
                label="기타"
              />
            </div>
          </div>
        </div>

        <div className={classes.label}>
          <div className={classes.labelTitle}>설명</div>

          <TextField
            sx={{
              width: { xs: "95%", md: "70%" },
              m: 1,
              "& .MuiOutlinedInput-root.Mui-focused": {
                "& > fieldset": {
                  borderColor: "#1ecfba",
                },
              },
            }}
            onChange={onDetailHandler}
            value={detail}
            id="outlined-multiline-static"
            multiline
            rows={6}
          />
          <div>{detailLength}/2000</div>
        </div>

        <div className={classes.buttonWrap}>
          <Button type="submit" variant="contained" className={classes.button}>
            등록하기
          </Button>
        </div>
      </form>
    </Fragment>
  );
};
export default AddProduct;
