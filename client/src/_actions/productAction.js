import {
  RESET_STORE_PRODUCT,
  ADD_PRODUCT,
  RECENT_PRODUCTS,
  GET_PRODUCTS,
  GET_PRODUCT,
  DEPOSIT,
  RELEASE,
  DEPOSITED_PRODUCTS,
  SEARCH_RECENT_PRODUCTS,
} from "./type";

import { baseRequest, authRequest } from "../api/common";
import { addProdRequest } from "../api/productApi";
import {
  callAddProduct,
  callPurchaseDeposit,
  callRelease,
} from "../contract/contractWriteCall";
import { setLoadings } from "./uiAction";

export function resetStoreProduct() {
  return {
    type: RESET_STORE_PRODUCT,
  };
}

export function addProduct(dataToSubmit) {
  const { formData, sdk } = dataToSubmit;
  return async (dispatch) => {
    dispatch(setLoadings({ isLoading: true }));
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

export function getDepositedProducts(dataToSubmit) {
  const request = authRequest()
    .post(`/api/products/deposited`, dataToSubmit)
    .then((response) => response.data)
    .catch((err) => {
      console.log(err);
      return err.response.data;
    });
  return {
    type: DEPOSITED_PRODUCTS,
    payload: request,
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

export function getSearchRecentProducts(dataToSubmit) {
  const params = { ...dataToSubmit };
  const request = baseRequest({ params })
    .get(`/api/products/recent`)
    .then((response) => response.data)
    .catch((err) => {
      console.log(err);
      return err.response.data;
    });
  return {
    type: SEARCH_RECENT_PRODUCTS,
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
  return async (dispatch) => {
    dispatch(setLoadings({ isLoading: true }));
    try {
      const res = await baseRequest().get(`/api/products/${params}`);
      return dispatch({
        type: GET_PRODUCT,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
      return dispatch({
        type: GET_PRODUCT,
        payload: err.response.data,
      });
    } finally {
      dispatch(setLoadings({ isLoading: false }));
    }
  };
}

export function purchase(dataToSubmit) {
  const { productId, userId, sdk } = dataToSubmit;
  return async (dispatch) => {
    dispatch(setLoadings({ isLoading: true }));
    try {
      const res = await authRequest().put(`/api/products/deposit/${productId}`);
      console.log("res", res);
      dispatch(setLoadings({ isLoading: false, isContractLoading: true }));

      await callPurchaseDeposit(sdk, productId, userId).then((data) => {
        console.log("contractRes", data);
      });

      return dispatch({
        type: DEPOSIT,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
      return dispatch({
        type: DEPOSIT,
        payload: err.response.data,
      });
    } finally {
      dispatch(setLoadings({ isContractLoading: false }));
    }
  };
}

export function release(dataToSubmit) {
  const { productId, sdk } = dataToSubmit;
  return async (dispatch) => {
    dispatch(setLoadings({ isLoading: true }));
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
