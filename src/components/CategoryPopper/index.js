import React, { useState, useEffect, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import {
  Popper,
  Fade,
  Paper,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Box,
  IconButton,
  Button,
  Typography,
  Link,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

// redux
import { useSelector } from 'react-redux'
import { categoryFilterSelector } from '../../redux/reducers/thirdParty/thirdPartyReducer'
import { categoryListSelector } from '../../redux/reducers/category/categoryReducer'
import { isNilOrEmptyArray } from '../../common/utils/StaticFunction'

const propTypes = {
  id: PropTypes.string.isRequired,
  open: PropTypes.bool,
  onApply: PropTypes.func,
  onClose: PropTypes.func,
  anchorEl: PropTypes.any,
  placement: PropTypes.string,
}

const defaultProps = {
  open: false,
  onApply: () => { },
  onClose: () => { },
  anchorEl: null,
  placement: 'bottom-end'
}

const CategoryPopper = ({ id, open, onApply, onClose, anchorEl, placement }) => {
  const categories = useSelector(categoryListSelector)
  const selectedCategories = useSelector(categoryFilterSelector)
  const [checkedCategories, setCheckedCategories] = useState()

  const setSelectedCategories = useCallback(() => {
    if (!isNilOrEmptyArray(categories)) {
      const tempObj = {}
      categories?.forEach((category) =>
        tempObj[category.id] = selectedCategories?.some((selectedCategory) => selectedCategory.id === category.id)
      )
      setCheckedCategories(tempObj)
    }
  }, [categories, selectedCategories])

  useEffect(() => {
    if (!open) {
      setSelectedCategories()
    }
  }, [setSelectedCategories, open])

  const initSelectedCategories = useCallback(() => {
    if (!isNilOrEmptyArray(categories)) {
      const tempObj = {}
      categories?.forEach((category) => tempObj[category.id] = false)
      setCheckedCategories(tempObj)
    }
  }, [categories])

  const handleCheckbox = useCallback((value, categoryId) => {
    setCheckedCategories((prevState) => ({ ...prevState, [categoryId]: value }))
  }, [])

  const handleApply = useCallback(() => {
    onApply(Object.keys(checkedCategories || {}).filter((value) => checkedCategories[value]))
  }, [checkedCategories, onApply])

  const handleClearApply = useCallback(() => {
    initSelectedCategories()
    onApply([]) // response should be empty array
  }, [initSelectedCategories, onApply])

  const handleClear = useCallback(() => {
    initSelectedCategories()
  }, [initSelectedCategories])

  const handleClose = useCallback(() => {
    setSelectedCategories()
    onClose()
  }, [onClose, setSelectedCategories])

  const popperId = useMemo(() => open && Boolean(anchorEl) ? id : undefined, [id, open, anchorEl])

  return (
    <Popper id={popperId} data-testid={`${popperId}-test`} open={open} anchorEl={anchorEl} placement={placement} transition>
      {({ TransitionProps }) => (
        <Fade {...TransitionProps}>
          <Paper sx={{ padding: 2, marginTop: 1, width: '354px' }}>
            <Box sx={{ display: 'flex' }}>
              <Box sx={{ flexGrow: 1 }}>
                Filters
              </Box>
              <Box>
                <IconButton onClick={handleClose}>
                  <CloseIcon fontSize='small' />
                </IconButton>
              </Box>
            </Box>
            <FormControl component='fieldset' variant='standard' sx={{ width: '100%', margin: '16px 0px' }}>
              <Box sx={{ display: 'flex' }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant='body1' fontSize={14} lineHeight='23px' fontWeight={600}>
                    Category
                  </Typography>
                </Box>
                <Box>
                  <Link onClick={handleClear} underline='none' component='button'>
                    <Typography variant='caption' fontSize={12}>
                      Clear
                    </Typography>
                  </Link>
                </Box>
              </Box>
              <FormGroup>
                {categories?.map((category) =>
                  <FormControlLabel
                    key={category.id}
                    control={
                      <Checkbox
                        size='small'
                        checked={checkedCategories?.[category.id] || false}
                        name={category.id}
                        onChange={(event) => handleCheckbox(event.target.checked, category.id)}
                        sx={{ '& .MuiSvgIcon-root': { fontSize: 14 } }}
                      />
                    }
                    label={<Typography fontSize={12} variant='caption'>{category.label || ''}</Typography>}
                  />)}

              </FormGroup>
            </FormControl>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Box>
                <Button onClick={handleClearApply} sx={{ color: '#4B68FE', fontSize: 14, textTransform: 'none' }}>Clear all</Button>
              </Box>
              <Box>
                <Button onClick={handleApply} variant='contained' sx={{ background: '#4B68FE', fontSize: 14, textTransform: 'none' }}>Apply</Button>
              </Box>
            </Box>
          </Paper>
        </Fade>
      )}
    </Popper>
  )
}

CategoryPopper.propTypes = propTypes
CategoryPopper.defaultProps = defaultProps

export default CategoryPopper