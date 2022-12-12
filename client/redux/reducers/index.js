
import { createStore, combineReducers } from "redux";
import { foodReducer } from "./food";

export const rootReducer = combineReducers({
  foods: foodReducer,
});
