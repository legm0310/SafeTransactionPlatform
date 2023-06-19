import {
  ADD_PRODUCT,
  RECENT_PRODUCTS,
  GET_PRODUCTS,
  GET_PRODUCT,
  PURCHASE,
  RELEASE,
} from "./type";

import { baseRequest, authRequest } from "../api/common";
import { addProdRequest } from "../api/productApi";
import { callAddProduct } from "../contract/callAddProduct";
import { callPurchaseDeposit, callRelease } from "../contract/callPurchase";
import { setLoadings } from "./uiAction";

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

      return dispatch({
        type: ADD_PRODUCT,
        payload: res.data,
      });
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
  const { productId, userId, sdk } = dataToSubmit;
  return async (dispatch) => {
    try {
      const res = await authRequest().put(
        `/api/products/purchase/${productId}`
      );
      console.log("res", res);
      dispatch(setLoadings({ isLoading: false, isContractLoading: true }));

      callPurchaseDeposit(sdk, productId, userId).then((data) => {
        console.log("contractRes", data);
        dispatch(setLoadings({ isContractLoading: false }));
      });

      return dispatch({
        type: PURCHASE,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
      return dispatch({
        type: PURCHASE,
        payload: err.response.data,
      });
    }
  };
}

export function release(dataToSubmit) {
  const { productId, sdk } = dataToSubmit;
  return async (dispatch) => {
    try {
      const res = await authRequest().put(`/api/products/release/${productId}`);
      console.log("res", res);
      dispatch(setLoadings({ isLoading: false, isContractLoading: true }));

      callRelease(sdk, productId).then((data) => {
        console.log("contractRes", data);
        dispatch(setLoadings({ isContractLoading: false }));
      });

      return dispatch({
        type: RELEASE,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
      return dispatch({
        type: RELEASE,
        payload: err.response.data,
      });
    }
  };
}
