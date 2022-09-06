//
//  Libraries
//
import { Grid } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
//
//  Icons
//
import PersonIcon from '@mui/icons-material/Person'
import QuizIcon from '@mui/icons-material/Quiz'
import GroupIcon from '@mui/icons-material/Group'
import StorageIcon from '@mui/icons-material/Storage'
//
//  Libraries
//
import { useSnapshot } from 'valtio'
//
//  Debug Settings
//
import debugSettings from '../../debug/debugSettings'
//
//  Components
//
import MyActionButton from '../../components/controls/MyActionButton'
//
//  Utilities
//
import { ValtioStore } from '../../pages/ValtioStore'
//
//  Style overrides
//
const useStyles = makeStyles(theme => {
  return {
    root: {
      display: 'flex'
    }
  }
})
//
// Debug Settings
//
const debugLog = debugSettings()

//===================================================================================
export default function Navigation() {
  //.............................................................................
  //.  Debug Logging
  //.............................................................................
  const debugLogging = (objtext, obj) => {
    if (debugLog) {
      //
      //  Object passed
      //
      let JSONobj = ''
      if (obj) {
        JSONobj = JSON.parse(JSON.stringify(obj))
      }
      //
      //  Output values
      //
      console.log('VALUES:', objtext, JSONobj)
    }
  }

  const classes = useStyles()
  //
  //  Define the ValtioStore
  //
  const snapShot = useSnapshot(ValtioStore)
  const CurrentPage = snapShot.v_Page
  debugLogging('CurrentPage', CurrentPage)
  //...................................................................................
  //.  Render the component
  //...................................................................................
  return (
    <div className={classes.root}>
      <Grid container alignItems='center'>
        {/* .......................................................................................... */}
        {CurrentPage !== 'OwnerList' ? (
          <MyActionButton
            startIcon={<PersonIcon fontSize='medium' />}
            variant='contained'
            color='warning'
            onClick={() => {
              ValtioStore.v_PagePrevious = CurrentPage
              ValtioStore.v_Page = 'OwnerList'
            }}
          >
            Owners
          </MyActionButton>
        ) : null}

        {/* .......................................................................................... */}
        {CurrentPage !== 'QuestionList' ? (
          <MyActionButton
            startIcon={<QuizIcon fontSize='medium' />}
            variant='contained'
            color='warning'
            onClick={() => {
              ValtioStore.v_PagePrevious = CurrentPage
              ValtioStore.v_Page = 'QuestionList'
            }}
          >
            Questions
          </MyActionButton>
        ) : null}
        {/* .......................................................................................... */}
        {CurrentPage !== 'Group1List' ? (
          <MyActionButton
            startIcon={<GroupIcon fontSize='medium' />}
            variant='contained'
            color='warning'
            onClick={() => {
              ValtioStore.v_PagePrevious = CurrentPage
              ValtioStore.v_Page = 'Group1List'
            }}
          >
            Group1
          </MyActionButton>
        ) : null}
        {/* .......................................................................................... */}
        {CurrentPage !== 'Group2List' ? (
          <MyActionButton
            startIcon={<GroupIcon fontSize='medium' />}
            variant='contained'
            color='warning'
            onClick={() => {
              ValtioStore.v_PagePrevious = CurrentPage
              ValtioStore.v_Page = 'Group2List'
            }}
          >
            Group2
          </MyActionButton>
        ) : null}
        {/* .......................................................................................... */}
        {CurrentPage !== 'Group3List' ? (
          <MyActionButton
            startIcon={<GroupIcon fontSize='medium' />}
            variant='contained'
            color='warning'
            onClick={() => {
              ValtioStore.v_PagePrevious = CurrentPage
              ValtioStore.v_Page = 'Group3List'
            }}
          >
            Group3
          </MyActionButton>
        ) : null}
        {/* .......................................................................................... */}
        {CurrentPage !== 'ReflinksList' ? (
          <MyActionButton
            startIcon={<QuizIcon fontSize='medium' />}
            variant='contained'
            color='warning'
            onClick={() => {
              ValtioStore.v_PagePrevious = CurrentPage
              ValtioStore.v_Page = 'ReflinksList'
            }}
          >
            Reflinks
          </MyActionButton>
        ) : null}
        {/* .......................................................................................... */}
        {CurrentPage !== 'ServerData' ? (
          <MyActionButton
            startIcon={<StorageIcon fontSize='medium' />}
            variant='contained'
            color='warning'
            onClick={() => {
              ValtioStore.v_PagePrevious = CurrentPage
              ValtioStore.v_Page = 'ServerData'
            }}
          >
            ServerData
          </MyActionButton>
        ) : null}
        {/* .......................................................................................... */}
      </Grid>
    </div>
  )
}
