import {
  ADD_PRODUCT,
  RECENT_PRODUCTS,
  GET_PRODUCTS,
  GET_PRODUCT,
} from "./type";
import { addProdRequest } from "../api/productApi";
import { baseRequest } from "../api/common";

export function addProduct(dataToSubmit) {
  const request = addProdRequest()
    .post("/api/products", dataToSubmit)
    .then((response) => {
      console.log("res", response);
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      return err.response.data;
    });
  return {
    type: ADD_PRODUCT,
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
