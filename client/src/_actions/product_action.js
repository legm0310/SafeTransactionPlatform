import axios from "axios";
import { ADD_PRODUCT } from "./type";

export function addProduct(dataToSubmit) {
  const request = axios
    .post("/api/product", dataToSubmit)
    .then((response) => response.data)
    .catch((err) => {
      console.log(err.response);
      return err.response.data;
    });
  return {
    type: ADD_PRODUCT,
    payload: request,
  };
}
