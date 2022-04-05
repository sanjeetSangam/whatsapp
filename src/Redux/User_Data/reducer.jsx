import { USER_DATA } from "./action";

const init_data = { user: {} };

export const userReducer = (store = init_data, { type, payload }) => {
  if (type == USER_DATA) {
    return { ...store, user: payload };
  } else {
    return store;
  }
};
