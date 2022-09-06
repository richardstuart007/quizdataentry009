//
//  Libraries
//
import { Dialog, DialogTitle, DialogContent, Typography } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import CloseIcon from '@mui/icons-material/Close'
//
//  Debug Settings
//
import debugSettings from '../debug/debugSettings'
//
//  Controls
//
import MyActionButton from './controls/MyActionButton'
//
//  Styles
//
const useStyles = makeStyles(theme => ({
  dialogWrapper: {
    padding: theme.spacing(2),
    position: 'absolute',
    top: theme.spacing(0)
  },
  dialogTitle: {
    paddingRight: '0px'
  }
}))
//
// Debug Settings
//
const g_log1 = debugSettings()
//=====================================================================================
export default function Popup(props) {
  if (g_log1) console.log('Start Popup')
  const { title, children, openPopup, setOpenPopup } = props
  const classes = useStyles()

  return (
    <Dialog
      open={openPopup}
      maxWidth='md'
      classes={{ paper: classes.dialogWrapper }}
    >
      <DialogTitle className={classes.dialogTitle}>
        <div style={{ display: 'flex' }}>
          <Typography variant='h6' component='div' style={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <MyActionButton
            color='secondary'
            onClick={() => {
              setOpenPopup(false)
            }}
          >
            <CloseIcon />
          </MyActionButton>
        </div>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  )
}
