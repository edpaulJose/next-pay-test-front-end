import { getAllThirdParties, getThirdParties } from "../../../api/thirdPartyApi";
import { updateThirdPartyList, updateCategoryFilter, updateFieldFilter } from "./thirdPartyReducer";

export const retrieveAllThirdParties = () => async (dispatch) => {
  const response = await getAllThirdParties()
  if (response?.message === 'Success') {
    dispatch(updateThirdPartyList(response?.payload))
  }
  return response
}

export const retrieveThirdParties = (request) => async (dispatch, getState) => {
  const response = await getThirdParties({ ...request, categories: getState().category.dataList })
  if (response?.message === 'Success') {
    dispatch(updateThirdPartyList(response?.payload))
  }
  return response
}

export const setCategoryFilter = (categoryIds = []) => async (dispatch, getState) => {
  const categories = getState().category.dataList
  const selectedCategories = categories?.filter((category) => categoryIds.some((id) => category.id === id))
  dispatch(updateCategoryFilter(selectedCategories))
}

export const setFieldFilter = (filterStr) => async (dispatch) => {
  dispatch(updateFieldFilter(filterStr))
}