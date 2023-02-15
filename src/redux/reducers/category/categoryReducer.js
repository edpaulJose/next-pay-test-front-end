import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  dataList: [],
}

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    updateCategoryList: (state, { payload }) => {
      state.dataList = payload
    },
  }
})

export const {
  updateCategoryList,
} = categorySlice.actions

// selectors
export const categoryListSelector = (state) => state.category.dataList

export default categorySlice.reducer