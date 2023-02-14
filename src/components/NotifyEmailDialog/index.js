import { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Button,
  TextField,
  styled,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import SendSharpIcon from '@mui/icons-material/SendSharp'

// utils
import { validateField, isEmtpyString, isNil } from '../../common/utils/StaticFunction'
import { REGEX_PATTERN } from '../../common/utils/StaticConstants'

const BootstrapDialog = styled(Dialog)(() => ({
  '& .MuiDialog-paper': {
    padding: '24px 8px',
    maxWidth: '560px',
  },
}))

const propTypes = {
  id: PropTypes.string.isRequired,
  thirdPartyId: PropTypes.string,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onNotify: PropTypes.func,
}

const defaultProps = {
  open: false,
  thirdPartyId: '',
  onClose: () => { },
  onNotify: () => { },
}

const NotifyEmailDialog = ({ id, open, onClose, onNotify, thirdPartyId }) => {
  const [email, setEmail] = useState('')
  const [emailHelperText, setEmailHelperText] = useState('')
  const [emailError, setEmailError] = useState(false)

  const setAllDataToDefault = useCallback(() => {
    setEmail('')
    setEmailHelperText('')
    setEmailError(false)
  }, [])

  const handleChangeEmail = useCallback((event) => {
    setEmail(event.target.value)
  }, [])

  const handleNeverMind = useCallback(() => {
    setAllDataToDefault()
    onClose()
  }, [onClose, setAllDataToDefault])

  const handleNotifySubmit = useCallback(() => {
    const validate = validateField(email, REGEX_PATTERN.EMAIL)
    if (validate.isError) {
      setEmailError(validate.isError)
      setEmailHelperText(validate.helperText)
    } else {
      onNotify({
        thirdPartyId,
        email
      })
      setAllDataToDefault()
      onClose()
    }
  }, [setAllDataToDefault, onNotify, onClose, thirdPartyId, email])

  const handleEmailBlur = useCallback((event) => {
    const value = event.target.value
    setEmail(value)
    const validate = validateField(value, REGEX_PATTERN.EMAIL)
    setEmailError(validate.isError)
    setEmailHelperText(validate.helperText)
  }, [])

  return (
    <BootstrapDialog id={id} open={open}  >
      <DialogTitle sx={{ m: 0, p: 2 }}>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: '#828282',
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Typography variant='h2' sx={{ fontWeight: 500, fontSize: '20px' }} gutterBottom>
          Thank you for your interest
        </Typography>
        <Typography variant='body1' textAlign='justify' sx={{ fontWeight: 400, fontSize: '16px' }} gutterBottom>
          We’re still working on integrating this app and it’s not yet ready for now. But you can send us your email so we can let you know when it’s ready.
        </Typography>
        <TextField
          id='NotifyEmailDialog-TextField'
          size='small'
          label='Email'
          type="email"
          fullWidth
          variant='outlined'
          onChange={handleChangeEmail}
          value={email}
          sx={{ margin: '8px 0px' }}
          error={emailError}
          helperText={emailHelperText}
          onBlur={handleEmailBlur}
          placeholder='email@email.com'
          focused
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleNeverMind}
          variant='outlined'
          sx={{ color: '#4B68FE', fontSize: '14px' }}
        >
          Never mind
        </Button>
        <Button
          disabled={isNil(email) || isEmtpyString(email)}
          onClick={handleNotifySubmit}
          variant='contained'
          sx={{ background: '#4B68FE', fontSize: '14px' }}
          startIcon={<SendSharpIcon sx={{ transform: 'rotate(-50deg)', fontSize: '14px !important' }} />}
        >
          Notify me
        </Button>
      </DialogActions>
    </BootstrapDialog>
  )
}

NotifyEmailDialog.propTypes = propTypes
NotifyEmailDialog.defaultProps = defaultProps

export default NotifyEmailDialog