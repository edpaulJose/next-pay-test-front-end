import { getAllCategories } from "../../../api/categoryApi";
import { updateCategoryList } from "./categoryReducer";

export const retrieveAllCategories = () => async (dispatch) => {
  const response = await getAllCategories()
  if (response?.message === 'Success') {
    dispatch(updateCategoryList(response?.payload))
  }
  return response
}