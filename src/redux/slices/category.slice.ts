import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  Category,
  CategoryMap,
  CategoryState,
  StateError,
} from "redux/redux.types";
import { RootState } from "redux/store";
import { getCategoriesAndDocuments } from "utils/firebase.utils";

export const fetchCategories = createAsyncThunk(
  "category/fetchCategories",
  async () => {
    const response = await getCategoriesAndDocuments("categories");
    return response;
  }
);

export const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: null,
    error: null,
    isLoading: false,
  } as CategoryState,
  reducers: {},
  extraReducers: (builder) => {
    const { pending, fulfilled, rejected } = fetchCategories;
    builder.addCase(pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fulfilled, (state, action) => {
      state.categories = action.payload as Category[];
      state.isLoading = false;
    });
    builder.addCase(rejected, (state, action) => {
      state.error = action.payload as StateError;
      state.isLoading = false;
    });
  },
});

export const selectCategories = (state: RootState) =>
  state.category.categories ?? [];

export const selectCategoryLoading = (state: RootState) =>
  state.category.isLoading;

export const selectCategoryMap = (state: RootState) =>
  (state.category.categories ?? []).reduce((acc, category) => {
    const { title, items } = category;
    acc[title.toLowerCase()] = items.map((item) => ({
      ...item,
      category: title.toLowerCase(),
    }));
    return acc;
  }, {} as CategoryMap);

export default categorySlice.reducer;
