import { getAll } from "../actions/food";

const initialState = {
    foods: [],
  item: {},
};

export const foodReducer = (state = initialState, action) => {
  switch (action.type) {
    case getAll:
      console.log("Get All", action.payload);
      return {
        ...state,
        foods: [...action.payload],
      };
    default:
      return { ...state };
  }
};
