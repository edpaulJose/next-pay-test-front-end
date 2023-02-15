import { createSlice } from '@reduxjs/toolkit'
import { DEFAULT_ROWS_PER_PAGE } from '../../../common/utils/StaticConstants'

export const initialState = {
  dataList: [],
  pagination: {
    rowsPerPage: DEFAULT_ROWS_PER_PAGE,
    currentPage: 0,
    total: 0,
  },
  filter: {
    categories: [],
    field: '',
  },
  dataForSearch: []
}

export const thirdPartySlice = createSlice({
  name: 'thirdParty',
  initialState,
  reducers: {
    updateThirdPartyList: (state, { payload }) => {
      state.dataList = payload.data
      state.pagination = payload.pagination
    },
    updateThirdPartyListForSearch: (state, { payload }) => {
      state.dataForSearch = payload
    },
    updateCategoryFilter: (state, { payload }) => {
      state.filter.categories = payload
    },
    updateFieldFilter: (state, { payload }) => {
      state.filter.field = payload
    }
  }
})

export const {
  updateThirdPartyList,
  updateThirdPartyListForSearch,
  updateCategoryFilter,
  updateFieldFilter,
} = thirdPartySlice.actions

// selectors
export const thirdPartyListSelector = (state) => state.thirdParty.dataList
export const paginationSelector = (state) => state.thirdParty.pagination
export const thirdPartyListForSearchSelector = (state) => state.thirdParty.dataForSearch
export const categoryFilterSelector = (state) => state.thirdParty.filter.categories
export const fieldFilterSelector = (state) => state.thirdParty.filter.field

export default thirdPartySlice.reducer