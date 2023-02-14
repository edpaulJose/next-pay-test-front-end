import { getAllCategories } from "../../../api/categoryApi";
import { updateCategoryList, updateSelectedCategories } from "./categoryReducer";

export const retrieveAllCategories = () => async (dispatch) => {
  const response = await getAllCategories()
  if (response?.message === 'Success') {
    dispatch(updateCategoryList(response?.payload))
  }
  return response
}

// export const setSelectedCategories = ({ categoryIds = [] }) => async (dispatch, getState) => {
//   let categories = getState().category.dataList
//   if (isNilOrEmptyArray(categories)) {
//     categories = await getAllCategories() || []
//   }
//   const responseArray = []
//   categoryIds.forEach(categoryId => {
//     const foundCategory = categories.find(category => category.id === categoryId)
//     if (foundCategory) {
//       responseArray.push(foundCategory)
//     }
//   })
//   dispatch(updateSelectedCategories(responseArray))
// }

export const setSelectedCategories = (categoryIds = []) => async (dispatch) => {
  dispatch(updateSelectedCategories(categoryIds))
}