import axios from "axios";
import { getItem, setItem, removeItem } from "../utils";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

export const interceptReq = (instance) => {
  instance.interceptors.request.use(
    (config) => {
      const token = getItem("accessToken");
      config.headers["Authorization"] = token;
      config.headers["Cache-control"] = "no-cache, no-store";
      config.headers["withCredentials"] = true;
      return config;
    },
    (err) => {
      console.log(err);
      return Promise.reject(err);
    }
  );
  return instance;
};

export const interceptRes = (instance) => {
  instance.interceptors.response.use(
    (res) => {
      const newAccessToken = res.headers.authorization;
      if (newAccessToken) {
        setItem("accessToken", newAccessToken);
      }
      return res;
    },
    (err) => {
      if (err.response.status === 401) {
        removeItem("accessToken");
      }
      console.log(err);
      return Promise.reject(err);
    }
  );
  return instance;
};

export const baseRequest = (options) => {
  const instance = axios.create({
    baseURL: apiBaseUrl,
    ...options,
  });
  const intercept = interceptRes(instance);
  if (!intercept) console.log(intercept);
  return instance;
};

export const authRequest = (options) => {
  const instance = baseRequest(options);
  const intercept = interceptReq(instance);
  if (!intercept) console.log(intercept);
  return instance;
};
