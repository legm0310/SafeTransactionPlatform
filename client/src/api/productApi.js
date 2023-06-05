import { authRequest } from "./common";

export const addProdRequest = () => {
  const options = {
    headers: { "Content-Type": "multipart/form-data" },
  };
  const instance = authRequest();
  return instance;
};
