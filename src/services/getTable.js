//
//  Utilities
//
import apiAxios from './apiAxios'
//
//  Debug Settings
//
import debugSettings from '../debug/debugSettings'
//
// Constants
//
const functionName = 'getTable'
const { URL_BASE } = require('./constants.js')
const { URL_TABLES } = require('./constants.js')
//..............................................................................
//.  Initialisation
//.............................................................................
//
// Debug Settings
//
const g_log1 = debugSettings()
//===================================================================================
async function getTable(props) {
  if (g_log1) console.log('Start getTable')
  if (g_log1) console.log('props ', props)

  //--------------------------------------------------------------------
  //.  fetch data
  //--------------------------------------------------------------------
  const fetchItems = async (
    sqlClient,
    sqlTable,
    sqlAction,
    sqlWhere,
    sqlOrderByRaw,
    sqlString
  ) => {
    try {
      //
      //  Setup actions
      //
      const method = 'post'
      let body
      sqlAction === 'SELECT'
        ? (body = {
            sqlClient: sqlClient,
            sqlTable: sqlTable,
            sqlAction: sqlAction,
            sqlWhere: sqlWhere,
            sqlOrderByRaw: sqlOrderByRaw
          })
        : (body = {
            sqlClient: sqlClient,
            sqlAction: sqlAction,
            sqlString: sqlString
          })

      const URL = URL_BASE + URL_TABLES
      if (g_log1) console.log('URL ', URL)
      //
      //  SQL database
      //
      const resultData = await apiAxios(method, URL, body)
      if (g_log1) console.log('Axios Data fetched ', resultData)
      //
      // No data
      //
      if (!resultData[0]) {
        throw Error('No data received')
      }
      //
      // Return data
      //
      if (g_log1) console.log('Return Data', resultData)
      return resultData
      //
      // Errors
      //
    } catch (err) {
      console.log(err.message)
    }
  }
  //--------------------------------------------------------------------
  //-  Main Line
  //--------------------------------------------------------------------
  //
  //  Deconstruct props
  //
  const {
    sqlCaller,
    sqlTable,
    sqlAction = 'SELECT',
    sqlWhere = '',
    sqlOrderByRaw = '',
    sqlString = ''
  } = props
  if (g_log1) console.log('sqlCaller ', sqlCaller)
  if (g_log1) console.log('sqlTable ', sqlTable)
  if (g_log1) console.log('sqlAction ', sqlAction)
  if (g_log1) console.log('sqlWhere ', sqlWhere)
  if (g_log1) console.log('sqlOrderByRaw ', sqlOrderByRaw)
  let sqlClient = `${functionName}/${sqlCaller}`
  if (g_log1) console.log('sqlClient ', sqlClient)
  if (g_log1) console.log('sqlString ', sqlString)
  //
  // Fetch the data
  //
  const resultData = fetchItems(
    sqlClient,
    sqlTable,
    sqlAction,
    sqlWhere,
    sqlOrderByRaw,
    sqlString
  )
  //
  // Return promise
  //
  if (g_log1) console.log('Return Promise', resultData)
  return resultData
}

export default getTable
