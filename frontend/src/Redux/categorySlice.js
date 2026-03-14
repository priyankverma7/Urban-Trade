import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
  
      const categoryListRes = await axios.get(
        "https://dummyjson.com/products/category-list"
      );
      const categories = categoryListRes.data;

      const finalList = [];

      for (const category of categories) {
        const res = await axios.get(
          `https://dummyjson.com/products/category/${category}`
        );

        finalList.push({
          id: category,
          name: category.replace(/-/g, " ").toUpperCase(),
          items: res.data.products.map((p) => ({
            id: p.id,
            title: p.title,
            image: p.thumbnail,
            price: p.price,
            discountPercentage:p.discountPercentage,
            rating:p.rating,
          })),
        });
      }

      return finalList;
    } catch (err) {
      console.error(err)
      return rejectWithValue("Failed to fetch categories.");
    }
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "success";
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default categorySlice.reducer;
