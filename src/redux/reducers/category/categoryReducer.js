import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  dataList: [],
  selectedCategories: []
}

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    updateCategoryList: (state, { payload }) => {
      state.dataList = payload
    },
    updateSelectedCategories: (state, { payload }) => {
      state.selectedCategories = payload
    }
  }
})

export const {
  updateSelectedCategories,
  updateCategoryList,
} = categorySlice.actions

// selectors
export const categoryListSelector = (state) => state.category.dataList
export const selectedCategoriesSelector = (state) => state.category.selectedCategories

export default categorySlice.reducer