import ThirdParties from './MOCK_DATA/thirdPartyLis.json'
import { arraysHasSameValue, isNilOrEmptyArray, isNil, isEmtpyString, removeSpecialCharacters } from '../common/utils/StaticFunction'

export const getAllThirdParties = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        payload: {
          data: ThirdParties,
          pagination: {
            total: ThirdParties.length,
            rowsPerPage: -1, // All
            currentPage: 0, // counting starts with 0
          }
        },
        message: 'Success'
      })
    }, 1000)
  })
}

const getCategoryLabels = (categories = [], selectedCategoryIds = []) => {
  const labels = []
  selectedCategoryIds.forEach((selectedCategoryId) =>
    labels.push(categories.find((category) => category.id === selectedCategoryId)?.label || '')
  )
  return labels
}

export const getThirdParties = ({ rowsPerPage, currentPage, filter, categories }) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const startIndex = currentPage * rowsPerPage
      const selectedCategories = filter?.categories || []
      const strFilter = filter?.field || ''
      let allThirdParties = ThirdParties
      if (!isNilOrEmptyArray(selectedCategories)) {
        allThirdParties = allThirdParties.filter((tp) => arraysHasSameValue(tp.categories, selectedCategories?.map((category) => category.id)))
      }
      if (!isNil(strFilter) && !isEmtpyString(strFilter)) {
        allThirdParties = allThirdParties.filter((tp) => {
          const combinedFieldsStr = `${tp.title}${getCategoryLabels(categories, tp.categories).join('')}${tp.description}`
          const removedSpecialChars1 = removeSpecialCharacters(combinedFieldsStr.toLowerCase())
          const removedSpecialChars2 = removeSpecialCharacters(strFilter?.toLowerCase())
          return removedSpecialChars1.includes(removedSpecialChars2)
        })
      }

      resolve({
        payload: {
          data: allThirdParties.slice(startIndex, startIndex + rowsPerPage),
          pagination: {
            total: allThirdParties.length,
            rowsPerPage,
            currentPage,
          }
        },
        message: 'Success'
      })
    }, 1000)
  })
}