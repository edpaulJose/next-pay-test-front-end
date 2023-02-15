import { useCallback, useEffect, useState, forwardRef, useMemo } from 'react'
import PropTypes from 'prop-types'
import {
  Grid,
  Snackbar,
  Alert as MuiAlert,
  Pagination,
  Box,
  Select,
  MenuItem,
  Typography,
} from '@mui/material'

// utils
import { DEFAULT_ROWS_PER_PAGE } from '../../common/utils/StaticConstants'

// components
import ThirdPartyCard from './ThirdPartyCard'
import NotifyEmailDialog from '../NotifyEmailDialog'

// redux
import { useSelector, useDispatch } from 'react-redux'
import { retrieveThirdParties } from '../../redux/reducers/thirdParty/thirdPartyActions'
import { thirdPartyListSelector, paginationSelector, categoryFilterSelector, fieldFilterSelector } from '../../redux/reducers/thirdParty/thirdPartyReducer'

// others
import CantFindSearch from './pics/cantFindSearch.PNG'

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const propTypes = {
  id: PropTypes.string.isRequired,
}

const ThirdPartyListContainer = ({ id }) => {
  const dispatch = useDispatch()
  const thirdPartyList = useSelector(thirdPartyListSelector)
  const [thirdPartyToNotify, setThirdPartyToNotify] = useState('')
  const [openNotifyDialog, setOpenNotifyDialog] = useState(false)
  const [snackbarObj, setSnackbarObj] = useState({
    open: false,
    message: '',
  })
  const pagination = useSelector(paginationSelector)
  const categories = useSelector(categoryFilterSelector)
  const fieldStrFilter = useSelector(fieldFilterSelector)

  const pageCount = useMemo(() => Math.ceil(pagination?.total / pagination?.rowsPerPage), [pagination])

  useEffect(() => {
    dispatch(retrieveThirdParties({ rowsPerPage: DEFAULT_ROWS_PER_PAGE, currentPage: 0, filter: { categories, field: fieldStrFilter } }))
  }, [dispatch, categories, fieldStrFilter])

  const handleNotifyClick = useCallback((id) => {
    setThirdPartyToNotify(id)
    setOpenNotifyDialog(true)
  }, [])

  const handleNotifySubmit = useCallback((valueObj) => {
    const thirdPartyLabel = thirdPartyList?.find((thirdParty) => thirdParty.id === valueObj.thirdPartyId)?.title || ''
    setSnackbarObj({ open: true, message: `Notify ${thirdPartyLabel} to ${valueObj.email}` })
  }, [thirdPartyList])

  const handleCloseSnackbar = useCallback(() => {
    setSnackbarObj({ open: false, message: '' })
  }, [])

  const handlePagination = useCallback((event, page) => {
    dispatch(retrieveThirdParties({ rowsPerPage: DEFAULT_ROWS_PER_PAGE, currentPage: page - 1, filter: { categories } }))
  }, [dispatch, categories])

  const handleSelectPage = useCallback((event) => {
    dispatch(retrieveThirdParties({ rowsPerPage: DEFAULT_ROWS_PER_PAGE, currentPage: event.target.value, filter: { categories } }))
  }, [dispatch, categories])

  return pagination?.total > 0 ? (
    <div id={id} style={{ margin: '32px -16px', width: '100%', justifyContent: 'center' }}>
      <Grid container rowSpacing={3}>
        {
          thirdPartyList?.map((thirdParty) =>
            <Grid key={thirdParty.id} item xs={12} sm={12} md={4} xl={4}>
              <ThirdPartyCard
                id={`ThirdPartyListContainer-ThirdPartyCard-${thirdParty.id}`}
                categoryIds={thirdParty.categories}
                description={thirdParty.description}
                key={`key-ThirdPartyCard-${thirdParty.id}`}
                logoLink={thirdParty.logo}
                title={thirdParty.title}
                onNotifyClick={handleNotifyClick}
              />
            </Grid>
          )
        }
        {
          pagination?.total > DEFAULT_ROWS_PER_PAGE ?
            <Grid item xs={12} sx={{ width: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Pagination
                    count={pageCount}
                    page={pagination?.currentPage ? pagination.currentPage + 1 : 1}
                    onChange={handlePagination}
                    color='primary'
                    size='small'
                  />
                </Box>
                <Box sx={{ marginRight: 1 }}>
                  <Typography variant='caption' sx={{ fontWeight: 600, fontSize: '12px', color: '#828282' }}>
                    Go to Page
                  </Typography>
                </Box>
                <Box>
                  <Select
                    id='ThirdPartyListContainer-Page-Select'
                    value={pagination?.currentPage}
                    onChange={handleSelectPage}
                    size='small'
                    margin='dense'
                    sx={{ height: 30, fontSize: '12px', fontWeight: 400, color: '#828282' }}
                  >
                    {
                      [...Array(pageCount)].map((num, i) =>
                        <MenuItem key={`key-${i}`} value={i}>{i + 1}</MenuItem>
                      )
                    }
                  </Select>
                </Box>
              </Box>
            </Grid> : <></>
        }
      </Grid>
      <NotifyEmailDialog
        id='ThirdPartyListContainer-NotifyEmailDialog'
        open={openNotifyDialog}
        onClose={() => setOpenNotifyDialog(false)}
        onNotify={handleNotifySubmit}
        thirdPartyId={thirdPartyToNotify}
      />
      <Snackbar open={snackbarObj.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity='info' sx={{ width: '100%' }}>
          {snackbarObj.message}
        </Alert>
      </Snackbar>
    </div>
  ) :
    <div style={{ margin: '32px -16px', minWidth: '430px' }}>
      <Grid container direction='column' justifyContent='center'>
        <Grid item>
          <img src={CantFindSearch} alt='Cannot find' />
        </Grid>
        <Grid item>
          <Typography variant='h2' sx={{ fontSize: '20px', fontWeight: 600, color: '#828282' }}>
            We can’t seem to find what you’re looking for.
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant='caption' sx={{ fontSize: '12px', fontWeight: 400, color: '#828282' }}>
            Try changing the filters or search terms.
          </Typography>
        </Grid>
      </Grid>
    </div>
}

ThirdPartyListContainer.propTypes = propTypes

export default ThirdPartyListContainer