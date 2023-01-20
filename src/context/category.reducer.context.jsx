import { createContext, useEffect, useReducer } from "react";
// import PRODUCTS from "data/shop-data"
// import { addCollectionAndDocuments } from "utils/firebase.utils";
import { getCategoriesAndDocuments } from "utils/firebase.utils";

export const CategoryContext = createContext({
  categoryMap: {},
});

const categorySlice = {
  categoryMap: null,
};

const categoryActionTypes = {
  SET_CATEGORIES: "SET_CATEGORIES",
};

const categoryReducer = (state, { type, payload }) => {
  switch (type) {
    case categoryActionTypes.SET_CATEGORIES:
      return {
        ...state,
        categoryMap: payload,
      };
    default:
      alert("error with type dispatched");
  }
};

export const CategoryProvider = ({ children }) => {
  // const [categoryMap, setCategoryMap] = useState({});
  const [{ categoryMap }, dispatch] = useReducer(
    categoryReducer,
    categorySlice
  );

  useEffect(() => {
    const getCategories = async () => {
      const categories = await getCategoriesAndDocuments("categories");
      return dispatch({
        type: categoryActionTypes.SET_CATEGORIES,
        payload: categories,
      });
    };
    getCategories();

    /* Ought To Be Called One Time On The Backend */
    // const addCollection = async () => {
    //   await addCollectionAndDocuments('categories', PRODUCTS);
    // }
    // addCollection();
  }, []);

  return (
    <CategoryContext.Provider value={{ categoryMap }}>
      {children}
    </CategoryContext.Provider>
  );
};
