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
const sqlClient = 'rowSelect'
const { URL_TABLES } = require('./constants.js')
//
// Debug Settings
//
const g_log1 = debugSettings()
//===================================================================================
async function rowSelect(props) {
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
      //  sqlString
      //
      let sqlString = `* from ${sqlTable}`
      if (sqlWhere) sqlString = sqlString.concat(' ' + sqlWhere)
      if (sqlOrderBy) sqlString = sqlString.concat(' ' + sqlOrderBy)
      if (sqlRows) sqlString = sqlString.concat(' ' + sqlRows)
      //
      //  Body
      //
      const body = {
        sqlClient: sqlClient,
        sqlString: sqlString,
        sqlAction: 'SELECTSQL',
        sqlTable: sqlTable
      }
      //
      //  URL
      //
      const URL = sqlURL + URL_TABLES
      if (g_log1) console.log('URL ', URL)
      //
      //  SQL database
      //
      const resultData = await apiAxios(method, URL, body)
      if (g_log1) console.log('data returned ', resultData)
      //
      // Data
      //
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
  if (g_log1) console.log('Start rowSelect')
  //
  //  Deconstruct props
  //
  if (g_log1) console.log('props: ', props)
  const { sqlURL, sqlTable, sqlOrderBy, sqlWhere, sqlRows } = props
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

export default rowSelect
