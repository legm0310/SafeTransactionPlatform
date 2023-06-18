import {
  ADD_PRODUCT,
  RECENT_PRODUCTS,
  GET_PRODUCTS,
  GET_PRODUCT,
  PURCHASE,
  RELEASE,
} from "./type";

import { baseRequest } from "../api/common";
import { addProdRequest } from "../api/productApi";
import { callAddProduct } from "../api/web3/callAddProduct";
import { setLoadings } from "./uiAction";

// export function addProduct(dataToSubmit) {
//   const { formData, sdk } = dataToSubmit;
//   const request = addProdRequest()
//     .post("/api/products", formData)
//     .then((response) => {
//       console.log("res", response);
//       callAddProduct(sdk, response.data.product);
//       return response.data;
//     })
//     .catch((err) => {
//       console.log(err);
//       return err.response.data;
//     });
//   return {
//     type: ADD_PRODUCT,
//     payload: request,
//   };
// }

export function addProduct(dataToSubmit) {
  const { formData, sdk } = dataToSubmit;
  return async (dispatch) => {
    try {
      const res = await addProdRequest().post("/api/products", formData);
      console.log("res", res);
      dispatch(setLoadings({ isLoading: false, isContractLoading: true }));

      callAddProduct(sdk, res.data.product).then((data) => {
        console.log("contractRes", data);
        dispatch(setLoadings({ isContractLoading: false }));
      });

      return res.data;
    } catch (err) {
      console.log(err);
      return dispatch({
        type: ADD_PRODUCT,
        payload: err.response.data,
      });
    }
  };
}

export function getRecentProducts(dataToSubmit) {
  const params = { lastId: dataToSubmit };
  const request = baseRequest({ params })
    .get(`/api/products/recent`)
    .then((response) => response.data)
    .catch((err) => {
      console.log(err);
      return err.response.data;
    });
  return {
    type: RECENT_PRODUCTS,
    payload: request,
  };
}

export function getProducts(dataToSubmit) {
  const params = { ...dataToSubmit };
  console.log(params);
  const request = baseRequest({ params })
    .get(`/api/products`)
    .then((response) => response.data)
    .catch((err) => {
      console.log(err);
      return err.response.data;
    });

  return {
    type: GET_PRODUCTS,
    payload: request,
  };
}

export function getProduct(dataToSubmit) {
  const params = dataToSubmit;
  const request = baseRequest()
    .get(`/api/products/${params}`)
    .then((response) => response.data)
    .catch((err) => {
      console.log(err);
      return err.response.data;
    });

  return {
    type: GET_PRODUCT,
    payload: request,
  };
}

export function purchase(dataToSubmit) {
  const request = baseRequest()
    .put()
    .then((response) => response.data)
    .catch((err) => {
      console.log(err);
      return err.response.data;
    });

  return {
    type: PURCHASE,
    payload: request,
  };
}
export function release(dataToSubmit) {
  const request = baseRequest()
    .put()
    .then((response) => response.data)
    .catch((err) => {
      console.log(err);
      return err.response.data;
    });

  return {
    type: RELEASE,
    payload: request,
  };
}
