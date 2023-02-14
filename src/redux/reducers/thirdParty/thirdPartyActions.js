import { getAllThirdParties, getThirdParties } from "../../../api/thirdPartyApi";
import { updateThirdPartyList } from "./thirdPartyReducer";

export const retrieveAllThirdParties = () => async (dispatch) => {
  const response = await getAllThirdParties()
  if (response?.message === 'Success') {
    dispatch(updateThirdPartyList(response?.payload))
  }
  return response
}

export const retrieveThirdParties = (request) => async (dispatch) => {
  const response = await getThirdParties(request)
  if (response?.message === 'Success') {
    dispatch(updateThirdPartyList(response?.payload))
  }
  return response
}

// TODO: create filter here
// Create a function to check if two arrays have duplicates (join then check for duplicates)

// export const filterThirdParties = ({ type = 'categories', filter }) => async (dispatch) => {
//   if(type === 'categories') {
//     const response = await getAllThirdParties()
//     if (response?.message === 'Success') {
//       const filteredTP = response?.data?.filter((tp) => )
//     }
//   }
// }