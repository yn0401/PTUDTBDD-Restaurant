export const getAll = "getAll";


export const getAllFoods = (foods) => {
  return {
    type: getAll,
    payload: foods,
  };
};

export const fetchAll = () => {
  return (dispatch) => {
    const getData = async () => {
      try {
        const res = await fetch("http://localhost:5555/api/get");
        const foods = await res.json();
        dispatch(getAllFoods(foods));
        console.log(foods);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  };
};
