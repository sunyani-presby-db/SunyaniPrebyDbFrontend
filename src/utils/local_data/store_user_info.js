const prefix = "sunyani-presby-church-db-";

const fetchLocalItem = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch {
    return null;
  }
};

export const setUserInfo = (info) => {
  const key = prefix + "userInfo";
  localStorage.setItem(prefix, JSON.stringify(info));
};
export const setAccessToken = (token) => {
  const key = prefix + "JwtToken";
  localStorage.setItem(key, JSON.stringify(token));
};
export const getToken = () => {
  const key = prefix + "JwtToken";
  return fetchLocalItem(key);
};
export const getUserInfo = () => {
  const key = prefix + "userInfo";
  return fetchLocalItem(key);
};
export const setIsAuthenticated = (isAtuh) => {
  const key = prefix + "isAuth";
  localStorage.setItem(key, JSON.stringify(isAtuh));
};
export const fetchIsAuthenticated = () => {
  // console.log(fetchLocalItem("isAuth"));
  const key = prefix + "isAuth";
  return fetchLocalItem(key);
};
