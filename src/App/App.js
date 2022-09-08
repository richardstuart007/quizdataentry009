//
// Libraries
//
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider
} from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
//
//  Pages
//
import Control from '../pages/Control'
//
//  Common Components
//
import Layout from '../components/Layout/Layout'
//
//  Utilities
//
import { ValtioStore } from '../pages/ValtioStore'
//
//  Global Themes used by the Theme Provider
//
const theme = createTheme({
  palette: {
    primary: {
      main: '#333996',
      light: '#3c44b126'
    },
    secondary: {
      main: '#f83245',
      light: '#f8324526'
    },
    background: {
      default: '#f4f5fd'
    }
  },
  overrides: {
    MuiAppBar: {
      root: {
        transform: 'translateZ(0)'
      }
    }
  },
  props: {
    MuiIconButton: {
      disableRipple: true
    }
  }
})
//
//  Server
//
const { SERVER_REMOTE } = require('../services/constants.js')
const { URL_REMOTE } = require('../services/constants.js')
const { SERVER_LOCAL } = require('../services/constants.js')
const { URL_LOCAL } = require('../services/constants.js')
export default function App() {
  //
  //  Update Valtio store with URL and Server Name
  //
  const port = window.location.port
  if (port === '9002') {
    ValtioStore.v_Server = SERVER_REMOTE
    ValtioStore.v_URL = URL_REMOTE
    console.log(
      `DataEntry-PORT(${port}) REMOTE: SERVER(${SERVER_REMOTE}) URL(${URL_REMOTE})`
    )
  } else {
    ValtioStore.v_Server = SERVER_LOCAL
    ValtioStore.v_URL = URL_LOCAL
    console.log(
      `DataEntry-PORT(${port}) LOCAL: SERVER(${SERVER_LOCAL}) URL(${URL_LOCAL})`
    )
  }
  //
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Layout>
          <Control />
        </Layout>
        <CssBaseline />
      </ThemeProvider>
    </StyledEngineProvider>
  )
}
