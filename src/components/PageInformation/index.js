import { useMemo } from "react"
import PropTypes from 'prop-types'
import Typography from '@mui/material/Typography'

// redux
import { useSelector } from "react-redux"
import { paginationSelector } from "../../redux/reducers/thirdParty/thirdPartyReducer"

const propTypes = {
  id: PropTypes.string.isRequired,
}

const PageInformation = ({ id }) => {
  const thirdPartyPagination = useSelector(paginationSelector)
  const start = useMemo(() => (thirdPartyPagination?.currentPage) * thirdPartyPagination?.rowsPerPage, [thirdPartyPagination])
  const end = useMemo(() =>
    (start + thirdPartyPagination?.rowsPerPage) > thirdPartyPagination?.total ?
      thirdPartyPagination?.total : (start + thirdPartyPagination?.rowsPerPage),
    [start, thirdPartyPagination])

  return thirdPartyPagination?.total > 0 ? (
    <Typography
      id={id}
      variant='h2'
      sx={{
        textAlign: 'justify',
        margin: '32px 0px',
        fontSize: '20px',
        fontWeight: 600,
        color: '#444444',
        minWidth: '350px'
      }}
    >
      {`Showing ${start + 1}-${end} of ${thirdPartyPagination.total} apps`}
    </Typography>
  ) : <></>
}

PageInformation.propTypes = propTypes

export default PageInformation