import React, { useEffect } from "react"
import { useCallback, useState } from "react"
import PropTypes from 'prop-types'
import { Paper, InputBase, Button } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'

// Components
import CategoryPopper from "../CategoryPopper"

// redux
import { retrieveAllCategories } from "../../redux/reducers/category/categoryActions"
import { setCategoryFilter, setFieldFilter } from "../../redux/reducers/thirdParty/thirdPartyActions"
import { useDispatch } from 'react-redux'

const propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
}

const defaultProps = {
  label: 'Search apps',
}

const SearchAndFilter = ({
  id,
  label,
}) => {
  const dispatch = useDispatch()
  const [openCategoryPopper, setOpenCategoryPopper] = useState(false)
  const [categoryPopperAnchorEl, setCategoryPopperAnchorEl] = useState(null)

  useEffect(() => {
    dispatch(retrieveAllCategories())
  }, [dispatch])

  const handleTextFilterChange = useCallback((event) => {
    dispatch(setFieldFilter(event.target.value))
  }, [dispatch])

  const handleFilter = useCallback((event) => {
    setCategoryPopperAnchorEl(event.currentTarget)
    setOpenCategoryPopper((prevState) => !prevState)
  }, [])

  const handleCategoryApply = useCallback((values) => {
    dispatch(setCategoryFilter(values))
    setOpenCategoryPopper(false)
  }, [dispatch])

  const handleCategoryPopperClose = useCallback(() => {
    setOpenCategoryPopper(false)
  }, [])

  return (
    <Paper
      id={id}
      sx={{ display: 'flex', alignItems: 'center', width: 399, border: '1px solid #BDBDBD' }}
      elevation={0}
    >
      <SearchIcon sx={{ p: '4px', color: '#828282' }} />
      <InputBase
        sx={{ ml: 1, flex: 1, color: '#828282', width: '304px' }}
        autoFocus
        placeholder={label}
        inputProps={{ 'aria-label': label?.toLowerCase() }}
        onChange={handleTextFilterChange}
      />
      <Button
        sx={{
          color: '#828282',
          padding: '8px 12px 8px 16px',
          borderLeft: '1px solid #BDBDBD',
          borderBottomLeftRadius: 0,
          borderTopLeftRadius: 0,
          textTransform: 'none',
          fontSize: '12px',
          fontWeight: 600,
        }}
        endIcon={openCategoryPopper ? <ArrowDropUpIcon fontSize='small' /> : <ArrowDropDownIcon fontSize='small' />}
        onClick={handleFilter}
      >
        Filter
      </Button>
      <CategoryPopper
        id='SearchAndFilter-CategoryPopper'
        open={openCategoryPopper}
        onApply={handleCategoryApply}
        onClose={handleCategoryPopperClose}
        anchorEl={categoryPopperAnchorEl}
      />
    </Paper>
  )
}

SearchAndFilter.propTypes = propTypes
SearchAndFilter.defaultProps = defaultProps

export default SearchAndFilter
