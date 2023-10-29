import {
  RESET_STORE_PRODUCT,
  ADD_PRODUCT,
  DELETE_PRODUCT,
  RECENT_PRODUCTS,
  GET_PRODUCTS,
  GET_PRODUCT,
  DEPOSIT,
  DEPOSIT_SUCCESS,
  DEPOSIT_FAILURE,
  APPROVE_RELEASE,
  APPROVE_RELEASE_SUCCESS,
  APPROVE_RELEASE_FAILURE,
  RELEASE,
  RELEASE_SUCCESS,
  RELEASE_FAILURE,
  DEPOSITED_PRODUCTS,
  SEARCH_RECENT_PRODUCTS,
} from "./type";

import { baseRequest, authRequest } from "../api/common";
import { addProdRequest } from "../api/productApi";
import {
  callPurchaseDeposit,
  callPurchaseConfirm,
  callOnRelease,
} from "../contract/writeCall";
import { setLoadings } from "./uiAction";
import axios from "axios";

export function resetStoreProduct() {
  return {
    type: RESET_STORE_PRODUCT,
  };
}

export function addProduct(dataToSubmit) {
  const { formData } = dataToSubmit;
  return async (dispatch) => {
    await dispatch(setLoadings({ isLoading: true }));
    try {
      console.log(formData);
      const res = await addProdRequest().post("/api/products", formData);
      console.log("res", res);
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
    } finally {
      dispatch(setLoadings({ isLoading: false }));
    }
  };
}

export function deleteProduct(dataToSubmit) {
  const params = dataToSubmit;
  const request = authRequest()
    .delete(`/api/products/${params}`)
    .then((response) => response.data)
    .catch((err) => {
      console.log(err.response);
      return err.response.data;
    });
  return {
    type: DELETE_PRODUCT,
    payload: request,
  };
}

export function getDepositedProducts(dataToSubmit) {
  const { lastId, productIds } = dataToSubmit;
  const params = { lastId: lastId };
  const request = authRequest({ params })
    .post(`/api/products/deposited`, productIds)
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
    await dispatch(setLoadings({ isLoading: true }));
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

export function purchaseDeposit(dataToSubmit) {
  const { prodTuple, buyerId, sdk } = dataToSubmit;
  const productId = prodTuple[0];
  return async (dispatch) => {
    await dispatch(setLoadings({ isContractLoading: true }));
    try {
      const contractRes = await callPurchaseDeposit(sdk, prodTuple, buyerId);
      console.log(contractRes);
      await dispatch(setLoadings({ isContractLoading: false }));

      await dispatch(setLoadings({ isLoading: true }));
      const txHash = contractRes.receipt?.transactionHash;
      console.log(txHash);
      if (!txHash || txHash.length !== 66 || !txHash.startsWith("0x")) {
        throw new Error("Invalid hash");
      }
      const res = await authRequest().put(
        `/api/products/deposit/${productId}`,
        { txHash }
      );
      console.log("res", res);

      return dispatch({
        type: DEPOSIT_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
      return dispatch({
        type: DEPOSIT_FAILURE,
        payload: err.response?.data || err,
      });
    } finally {
      dispatch(setLoadings({ isLoading: false }));
    }
  };
}

export function purchaseConfirm(dataToSubmit) {
  const { sdk, productId } = dataToSubmit;
  console.log(dataToSubmit);
  return async (dispatch) => {
    await dispatch(setLoadings({ isContractLoading: true }));
    try {
      const contractRes = await callPurchaseConfirm(sdk, +productId);
      await dispatch(setLoadings({ isContractLoading: false }));
      const txHash = contractRes.receipt?.transactionHash;
      console.log(txHash);
      if (!txHash || txHash.length !== 66 || !txHash.startsWith("0x")) {
        throw new Error("Invalid hash");
      }

      const res = await authRequest().put(
        `/api/products/approve/${productId}`,
        { txHash }
      );
      return dispatch({
        type: APPROVE_RELEASE_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      return dispatch({
        type: APPROVE_RELEASE_FAILURE,
        payload: err.response?.data || err,
      });
    } finally {
      dispatch(setLoadings({ isLoading: false }));
    }
  };
}

export function onRelease(dataToSubmit) {
  const { productId, sdk } = dataToSubmit;
  return async (dispatch) => {
    await dispatch(setLoadings({ isContractLoading: true }));
    try {
      const contractRes = await callOnRelease(sdk, productId);
      const txHash = contractRes.receipt?.transactionHash;
      console.log(txHash);
      if (!txHash || txHash.length !== 66 || !txHash.startsWith("0x")) {
        throw new Error("Invalid hash");
      }
      await dispatch(setLoadings({ isContractLoading: false }));

      const res = await authRequest().put(`/api/products/release/${productId}`);
      console.log("res", res);

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
    } finally {
      dispatch(setLoadings({ isLoading: false }));
    }
  };
}
