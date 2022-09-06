//
//  Libraries
//
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton
} from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import NotListedLocationIcon from '@mui/icons-material/NotListedLocation'
//
//  Debug Settings
//
import debugSettings from '../debug/debugSettings'
//
//  Controls
//
import MyButton from './controls/MyButton'
//
//  Styles
//
const useStyles = makeStyles(theme => ({
  dialog: {
    padding: theme.spacing(2),
    position: 'absolute',
    top: theme.spacing(5)
  },
  dialogTitle: {
    textAlign: 'center'
  },
  dialogContent: {
    textAlign: 'center'
  },
  dialogAction: {
    justifyContent: 'center'
  },
  titleIcon: {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
      cursor: 'default'
    },
    '& .MuiSvgIcon-root': {
      fontSize: '8rem'
    }
  }
}))
//
// Debug Settings
//
const g_log1 = debugSettings()
//=====================================================================================
export default function ConfirmDialog(props) {
  if (g_log1) console.log('Start ConfirmDialog')

  const { confirmDialog, setConfirmDialog } = props
  const classes = useStyles()

  return (
    <Dialog open={confirmDialog.isOpen} classes={{ paper: classes.dialog }}>
      <DialogTitle className={classes.dialogTitle}>
        <IconButton disableRipple className={classes.titleIcon} size='large'>
          <NotListedLocationIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Typography variant='h6'>{confirmDialog.title}</Typography>
        <Typography variant='subtitle2'>{confirmDialog.subTitle}</Typography>
      </DialogContent>
      <DialogActions className={classes.dialogAction}>
        <MyButton
          text='No'
          color='primary'
          onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
        />
        <MyButton
          text='Yes'
          color='secondary'
          onClick={confirmDialog.onConfirm}
        />
      </DialogActions>
    </Dialog>
  )
}
