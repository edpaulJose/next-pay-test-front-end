import { useEffect } from "react"
import { useCallback, useState } from "react"
import PropTypes from 'prop-types'
import { Paper, InputBase, Button, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'

// Components
import CategoryPopper from "../CategoryPopper"

// redux
import { retrieveAllCategories, setSelectedCategories } from "../../redux/reducers/category/categoryActions"
import { useDispatch } from 'react-redux'

const propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  onSearch: PropTypes.func,
}

const defaultProps = {
  label: 'Search apps',
  onSearch: () => { },
}

const SearchAndFilter = ({
  id,
  label,
  onSearch,
}) => {
  const dispatch = useDispatch()
  const [searchText, setSearchText] = useState('')
  const [openCategoryPopper, setOpenCategoryPopper] = useState(false)
  const [categoryPopperAnchorEl, setCategoryPopperAnchorEl] = useState(null)

  useEffect(() => {
    dispatch(retrieveAllCategories())
  }, [dispatch])

  const handleOnKeyDown = useCallback((event) => {
    if (event.key === 'Enter' || event.keyCode === 13) {
      onSearch(event.target.value)
    } else {
      setSearchText(event.target.value)
    }
  }, [onSearch])

  const handleFilter = useCallback((event) => {
    setCategoryPopperAnchorEl(event.currentTarget)
    setOpenCategoryPopper((prevState) => !prevState)
  }, [])

  const handleCategoryApply = useCallback((values) => {
    // console.log('Selected', values)
    dispatch(setSelectedCategories(values))
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
        onKeyUp={handleOnKeyDown}
      />
      <Button
        sx={{
          color: '#828282',
          padding: '8px 12px 8px 16px',
          borderLeft: '1px solid #BDBDBD',
          borderBottomLeftRadius: 0,
          borderTopLeftRadius: 0,
          textTransform: 'none'
        }}
        endIcon={openCategoryPopper ? <ArrowDropUpIcon fontSize='small' /> : <ArrowDropDownIcon fontSize='small' />}
        onClick={handleFilter}
      >
        <Typography variant='body2' sx={{ fontSize: '12px', fontWeight: 600, lineHeight: '18px', letterSpacing: '0px', textAlign: 'center' }}>
          Filter
        </Typography>
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
