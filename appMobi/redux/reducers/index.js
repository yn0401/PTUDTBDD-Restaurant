import { combineReducers } from "redux";
import cartReducer from "./cartReducer";
import { foodReducer } from "./foodReducer";

let reducers = combineReducers({
  cartReducer: cartReducer,
  foods: foodReducer,
});

const rootReducer = (state, action) => {
  return reducers(state, action);
};

export default rootReducer;
