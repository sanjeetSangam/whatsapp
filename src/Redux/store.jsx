import { combineReducers, createStore } from "redux";

import { userReducer } from "./User_Data/reducer";

const rootReducer = combineReducers({
  user: userReducer,
});

export const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
