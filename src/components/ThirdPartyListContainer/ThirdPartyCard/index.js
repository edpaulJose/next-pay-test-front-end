import { useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import { styled } from '@mui/material/styles'
import {
  Paper,
  Box,
  Typography,
  Link,
} from '@mui/material'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'

// redux
import { useSelector } from 'react-redux'
import { categoryListSelector } from '../../../redux/reducers/category/categoryReducer'

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxHeight: '100%',
  maxWidth: '100%',
})

const propTypes = {
  id: PropTypes.string.isRequired,
  logoLink: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  categoryIds: PropTypes.array,
  onNotifyClick: PropTypes.func,
}

const defaultProps = {
  logoLink: null,
  title: 'No Title',
  description: '',
  categoryIds: [],
  onNotifyClick: () => { },
}

const ThirdPartyCard = ({
  id,
  logoLink,
  title,
  description,
  categoryIds,
  onNotifyClick,
}) => {
  const allCategories = useSelector(categoryListSelector)
  const categoryLabels = useMemo(() =>
    categoryIds?.map((categoryId) =>
      allCategories?.find((category) => category.id === categoryId)?.label || ''
    ), [categoryIds, allCategories])

  const handleNotifyClick = useCallback(() => {
    const splitId = id?.split('-') || []
    onNotifyClick(splitId[splitId.length - 1])
  }, [onNotifyClick, id])

  return (
    <Paper
      id={id}
      elevation={2}
      sx={{
        height: '302px',
        maxWidth: '442.67px',
        p: 3,
        m: 2,
        position: 'relative'
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Box sx={{ width: '72px' }}>
            <Img alt='none' src={logoLink} />
          </Box>
          <Box sx={{ marginLeft: 2 }}>
            <Typography
              variant='h6'
              justifyContent='flex-start'
              display='flex'
              fontWeight={700}
            >
              {title}
            </Typography>
            <Typography
              variant="body1"
              display='flex'
              sx={{
                justifyContent: 'flex-start',
                fontWeight: 500,
                fontSize: 14,
                opacity: '70%'
              }}
            >
              {categoryLabels?.join() || ''}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ marginTop: 3 }}>
          <Typography paragraph textAlign='justify'>
            {description}
          </Typography>
        </Box>
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            bottom: 0,
            padding: 3,
          }}
        >
          <Link
            onClick={handleNotifyClick}
            underline='none'
            component='button'
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <Typography
              variant='caption'
              sx={{
                color: '#4B68FE',
                fontWeight: 700,
                fontSize: '16px'
              }}
            >
              Notify me when it's ready
            </Typography>
            <KeyboardArrowRightIcon fontSize='small' />
          </Link>
        </Box>
      </Box>
    </Paper>
  )
}

ThirdPartyCard.propTypes = propTypes
ThirdPartyCard.defaultProps = defaultProps

export default ThirdPartyCard