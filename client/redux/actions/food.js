export const getAll = "getAll";
export const getDetail = "getDetail";
export const add = "add";
export const update = "update";
export const deleteOne = "delete";
export const search = "search";

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

export const getFoodDetail = (food) => {
  return {
    type: getDetail,
    payload: food,
  };
};

export const getFoodDetailFromFB = (id) => {
  return (dispatch) => {
    const getDetail = async () => {
      try {
        const res = await fetch(`http://localhost:5555/api/get/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        dispatch(getFoodDetail(data));
      } catch (error) {
        console.log(error);
      }
    };
    getDetail();
  };
};

export const addFood = (food) => {
  return {
    type: add,
    payload: food,
  };
};

export const addFoodToFB = (food) => {
  return (dispatch) => {
    const addData = async () => {
      try {
        const res = await fetch("http://localhost:5555/api/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(food),
        });
        const data = await res.json();
        dispatch(addFood(data));
      } catch (error) {
        console.log(error);
      }
    };
    addData();
  };
};

export const updateFood = (food) => {
  return {
    type: update,
    payload: food,
  };
};

export const updateFoodToFB = (food) => {
  return (dispatch) => {
    const updateData = async () => {
      try {
        const res = await fetch(
          `http://localhost:5555/api/update/${food.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(food),
          }
        );
        const data = await res.json();
        dispatch(updateFood(data));
      } catch (error) {
        console.log(error);
      }
    };
    updateData();
  };
};

export const deleteFood = (id) => {
  return {
    type: deleteOne,
    payload: id,
  };
}

export const deleteFoodFromFB = (id) => {
  return (dispatch) => {
    const deleteData = async () => {
      try {
        const res = await fetch(`http://localhost:5555/api/delete/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        dispatch(deleteFood(data));
      } catch (error) {
        console.log(error);
      }
    };
    deleteData();
  };
}

export const searchFoodByName = (foods) => {
  return {
    type: search,
    payload: foods,
  };
};

export const searchSneakerByNameFromFB = (title) => {
  return (dispatch) => {
    const getData = async () => {
      try {
        const res = await fetch(`http://localhost:5555/api/search/${title}`);
        const foods = await res.json();
        dispatch(searchFoodByName(foods));
        console.log(foods);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  };
};