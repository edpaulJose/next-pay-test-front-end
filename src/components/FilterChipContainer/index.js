import { useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Typography, Box, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

// utils
import { isNilOrEmptyArray } from '../../common/utils/StaticFunction'

// redux
import { useSelector, useDispatch } from 'react-redux'
import { categoryFilterSelector } from '../../redux/reducers/thirdParty/thirdPartyReducer'
import { setCategoryFilter } from '../../redux/reducers/thirdParty/thirdPartyActions'
import { categoryListSelector } from '../../redux/reducers/category/categoryReducer'

const FilterChip = ({ id, label, onDelete }) => {

  return (
    <Box
      id={id}
      elevation={0}
      sx={{
        backgroundColor: '#EDEDED',
        borderRadius: 1,
        marginRight: '8px',
        marginTop: '8px',
        padding: '0px 8px'
      }}
    >
      <Typography
        variant='caption'
        fontSize={12}
        lineHeight='20px'
        fontWeight={500}
        align='center'
        color='#444444'
      >
        {`Category: ${label}`}
      </Typography>
      <IconButton sx={{ marginLeft: '8px', padding: '2px' }} onClick={() => onDelete(id)}>
        <CloseIcon sx={{ fontSize: '0.8rem' }} />
      </IconButton>
    </Box>
  )
}

const propTypes = {
  id: PropTypes.string.isRequired
}

const FilterChipContainer = ({ id }) => {
  const dispatch = useDispatch()
  const categories = useSelector(categoryListSelector)
  const selectedCategories = useSelector(categoryFilterSelector)

  const categoriesToDisplay = useMemo(() =>
    selectedCategories?.map((selectedCategory) => ({
      id: selectedCategory.id,
      label: categories?.find((category) => category.id === selectedCategory.id)?.label || '',
    })), [categories, selectedCategories])

  const handleDelete = useCallback((categoryId) => {
    dispatch(setCategoryFilter(selectedCategories?.filter((selectedCategory) => selectedCategory.id !== categoryId)?.map((category) => category.id)))
  }, [selectedCategories, dispatch])

  return !isNilOrEmptyArray(categoriesToDisplay) ? (
    <div id={id} style={{ width: '100%', margin: '32px 0px' }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignContent: 'flex-start' }}>
        {
          categoriesToDisplay?.map((category) =>
            <FilterChip id={category.id} label={category.label} key={`${category.id}-key`} onDelete={handleDelete} />
          )
        }
      </Box>
    </div>
  ) : <></>
}

FilterChipContainer.propTypes = propTypes

export default FilterChipContainer