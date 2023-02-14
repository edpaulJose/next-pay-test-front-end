import Categories from './MOCK_DATA/categories.json'

export const getAllCategories = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        payload: Categories,
        message: 'Success'
      })
    }, 2000)
  })
}

export const getCategoryById = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        payload: Categories.find((category) => category.id === id && category.status === 'active'),
        message: 'Success'
      })
    }, 1000)
  })
}