import { createSlice } from '@reduxjs/toolkit'
import { DEFAULT_ROWS_PER_PAGE } from '../../../common/utils/StaticConstants'

export const initialState = {
  dataList: [],
  pagination: {
    rowsPerPage: DEFAULT_ROWS_PER_PAGE,
    currentPage: 0,
    total: 0,
  }
}

export const thirdPartySlice = createSlice({
  name: 'thirdParty',
  initialState,
  reducers: {
    updateThirdPartyList: (state, { payload }) => {
      state.dataList = payload.data
      state.pagination = payload.pagination
    },
  }
})

export const {
  updateThirdPartyList,
} = thirdPartySlice.actions

// selectors
export const thirdPartyListSelector = (state) => state.thirdParty.dataList
export const paginationSelector = (state) => state.thirdParty.pagination

export default thirdPartySlice.reducer