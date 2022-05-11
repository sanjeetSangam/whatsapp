import { USER_DATA } from "./action";

import Cookies from "js-cookie";

let cokk = Cookies.get("user");

let user = (cokk && JSON.parse(cokk)) || {};

const init_data = { user: user };

export const userReducer = (store = init_data, { type, payload }) => {
  if (type == USER_DATA) {
    return { ...store, user: payload };
  } else {
    return store;
  }
};
