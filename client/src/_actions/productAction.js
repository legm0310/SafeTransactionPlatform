import axios from "axios";
import { ADD_PRODUCT } from "./type";

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
axios.defaults.withCredentials = true;
axios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken && config.method === "post") {
      config.headers["Authorization"] = accessToken;
    }
    return config;
  },
  (err) => Promise.reject(err)
);
axios.interceptors.response.use(
  (res) => {
    console.log("hi", res.headers.authorization);
    const newAccessToken = res.headers.authorization;
    if (newAccessToken) {
      localStorage.setItem("accessToken", newAccessToken);
    }
    return res;
  },
  (err) => Promise.reject(err)
);

export function addProduct(dataToSubmit) {
  const accessToken = localStorage.getItem("accessToken");
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: accessToken,
    "Cache-control": "no-cache, no-store",
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
