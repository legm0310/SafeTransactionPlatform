import axios from "axios";
import { ADD_PRODUCT } from "./type";

export function addProduct(dataToSubmit) {
  const headers = {
    "Content-Type": "multipart/form-data",
  };
  const request = axios
    .post("/api/product", dataToSubmit, {
      headers,
    })
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
