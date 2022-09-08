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
const sqlClient = 'rowUpdate'
const { URL_TABLES } = require('./constants.js')
//
// Debug Settings
//
const g_log1 = debugSettings()
//===================================================================================
async function rowUpdate(props) {
  //--------------------------------------------------------------------
  //  Database Update
  //
  const updateDatabase = async () => {
    try {
      //
      //  Setup actions
      //
      const method = 'post'
      //
      //  Strip out ID
      //
      let { ...rowData } = sqlRow
      if (sqlID) delete rowData[sqlID]
      //
      //  Body
      //
      const body = {
        sqlClient: sqlClient,
        sqlTable: sqlTable,
        sqlAction: 'UPDATE',
        sqlWhere: sqlWhere,
        sqlRow: rowData
      }
      const URL = sqlURL + URL_TABLES
      if (g_log1) console.log('URL ', URL)
      //
      //  SQL database
      //
      const resultData = await apiAxios(method, URL, body)
      if (g_log1) console.log('data returned ', resultData)
      //
      // No data
      //
      if (!resultData[0]) {
        throw Error('No data received')
      }
      const rowReturned = resultData[0]
      if (g_log1) console.log('row ', rowReturned)
      return resultData
      //
      // Errors
      //
    } catch (err) {
      console.log(err.message)
      return null
    }
  }
  //--------------------------------------------------------------------
  //-  Main Line
  //--------------------------------------------------------------------
  if (g_log1) console.log('Start rowUpdate')
  //
  //  Deconstruct
  //
  const { sqlURL, sqlTable, sqlWhere, sqlRow, sqlID } = props
  if (g_log1) console.log('props: ', props)
  //
  // Database Update
  //
  const promise = updateDatabase()
  //
  // Return promise
  //
  if (g_log1) console.log('Return promise', promise)
  return promise
}

export default rowUpdate
