export const getItem = (item) => {
  return localStorage.getItem(item);
};

export const setItem = (item, value) => {
  return localStorage.setItem(item, value);
};

export const removeItem = (item) => {
  return localStorage.removeItem(item);
};
