import { INVALID_FORMAT } from "./StaticConstants"

export const isNil = (value) => value === null || value === undefined

export const isNilOrEmptyArray = (valueArray) => isNil(valueArray) || valueArray.length <= 0

export const isNilOrEmptyObject = (valueObj) => isNil(valueObj) || JSON.stringify(valueObj) === '{}'

export const isEmtpyString = (value) => value?.trim() === ''

export const validateField = (value, regexPattern = null) => {
  let isError = false
  let helperText = ''
  if (isNil(value) || isEmtpyString(value)) {
    isError = false
  } else if (regexPattern && !new RegExp(regexPattern).test(value)) {
    isError = true
    helperText = INVALID_FORMAT
  } else {
    isError = false
  }
  return ({
    isError, helperText
  })
}

export const arraysHasSameValue = (array1 = [], array2 = []) => {
  if (array2.length <= 0) {
    return false
  }
  const combinedArray = array1.concat(array2)
  const noDuplicates = new Set(combinedArray)
  return combinedArray.length !== noDuplicates.size
}

export const removeSpecialCharacters = (str) => str.replaceAll(/[`~!@#$%^&*()_|+\-=?;:'’",.<>{}[\]\\/]/gi, '')