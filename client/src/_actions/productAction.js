import { ADD_PRODUCT } from "./type";
import { addProdRequest } from "../api/productApi";

export function addProduct(dataToSubmit) {
  const request = addProdRequest()
    .post("/api/product", dataToSubmit)
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
