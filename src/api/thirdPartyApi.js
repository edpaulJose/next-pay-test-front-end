import ThirdParties from './MOCK_DATA/thirdPartyLis.json'

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

export const getThirdParties = ({ rowsPerPage, currentPage }) => {
  const startIndex = currentPage * rowsPerPage
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        payload: {
          data: ThirdParties.slice(startIndex, startIndex + rowsPerPage),
          pagination: {
            total: ThirdParties.length,
            rowsPerPage,
            currentPage,
          }
        },
        message: 'Success'
      })
    }, 1500)
  })
}