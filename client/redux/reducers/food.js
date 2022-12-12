import { getAll, getDetail,add, update,deleteOne,search } from "../actions/food";

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
      case getDetail:
      // console.log("getDetail", action.payload);
      return {
        ...state,
        item: action.payload,
      };
      case add:
      console.log("Add", action.payload);
      return {
        ...state,
        foods: [...state.foods, action.payload],
      };
     case update:
      console.log("Update", action.payload);
      return {
        ...state,
      };
      case deleteOne:
      console.log("Delete", action.payload);
      return {
        ...state,
        foods: state.foods.filter((item) => item.id !== action.payload),
      };
      case search:
      return {
        ...state,
        foods: [...action.payload],
      };
    default:
      return { ...state };
  }
};
