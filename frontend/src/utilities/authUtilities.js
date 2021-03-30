import cookie from "js-cookie";

// store in cookie
const setCookie = (key, value) => {
  if (window !== undefined) {
    cookie.set(key, value, {
      expires: 1,
    });
  }
};

// remove from cookie
const removeCookie = (key) => {
  if (window !== undefined) {
    cookie.remove(key, { expires: 1 });
  }
};

// get cookie
const getCookie = (key) => {
  if (window !== undefined) {
    return cookie.get(key);
  }
};

// save in local storage
const setLocalStorage = (key, value) => {
  if (window !== undefined) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};
// remove from local storage
const removeLocalStorage = (key) => {
  if (window !== undefined) {
    localStorage.removeItem(key);
  }
};

// authenticate the user by passing data to cookie and local storage
// during login
const authenticate = (response, next) => {
  setCookie("token", response.data.token);
  setLocalStorage("user", response.data.user);
  next();
};

// access user info from localStorage
const isAuth = () => {
  if (window !== undefined) {
    const tokenFromCookie = getCookie("token");
    if (tokenFromCookie) {
      if (localStorage.getItem("user")) {
        return JSON.parse(localStorage.getItem("user"));
      } else {
        return false;
      }
    }
  }
};

// loging out
const logout = (next) => {
  removeCookie("token");
  removeLocalStorage("user");
  next();
};

// update user data in local storage
const updateUserLocalStorage = (response, next) => {
  console.log("UPDATE USER IN LOCAL STORAGE UTIL");
  if (window !== undefined) {
    let auth = JSON.parse(localStorage.getItem("user"));
    auth = response.data;
    localStorage.setItem("user", JSON.stringify(auth));
  }
  next();
};

export {
  setCookie,
  removeCookie,
  getCookie,
  setLocalStorage,
  removeLocalStorage,
  authenticate,
  isAuth,
  logout,
  updateUserLocalStorage,
};
