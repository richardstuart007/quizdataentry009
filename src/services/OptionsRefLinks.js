//
//  Debug Settings
//
import debugSettings from '../debug/debugSettings'
//
//  Services
//
import MyQueryPromise from './MyQueryPromise'
import rowSelect from './rowSelect'
//
//  Utilities
//
import { ValtioStore } from '../pages/ValtioStore'
//
//  Table
//
const { SQL_TABLE_REFLINKS } = require('./constants.js')
//
// Debug Settings
//
const debugLog = debugSettings()
const debugFunStartSetting = false
const debugFunEndSetting = false
const debugModule = 'OptionsRefLinks'
let debugStack = []

//===================================================================================
const OptionsRefLinks = () => {
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
      console.log('VALUES: Stack ', debugStack, objtext, JSONobj)
    }
  }
  //.............................................................................
  //.  function start
  //.............................................................................
  const debugFunStart = funname => {
    debugStack.push(funname)
    if (debugFunStartSetting)
      console.log('Stack: debugFunStart ==> ', funname, debugStack)
  }
  //.............................................................................
  //.  function End
  //.............................................................................
  const debugFunEnd = () => {
    if (debugStack.length > 1) {
      const funname = debugStack.pop()
      if (debugFunEndSetting)
        console.log('Stack: debugFunEnd <==== ', funname, debugStack)
    }
  }
  //...................................................................................
  //.  Load Options
  //...................................................................................
  const LoadOptions = data => {
    debugFunStart('LoadOptions ')
    debugLogging('Data ', data)
    //
    //  Options
    //
    let Options = [
      {
        id: 'None',
        title: 'None'
      }
    ]
    data.forEach(item => {
      const itemObj = {
        id: item.rref,
        title: item.rdesc
      }
      Options.push(itemObj)
    })
    //
    //  Store
    //
    ValtioStore.v_OptionsRefLinks = Options
    debugLogging('Options ', Options)

    debugFunEnd()
  }
  //.............................................................................
  //.  GET Data
  //.............................................................................
  const getRowAll = () => {
    debugFunStart('getRowAll')
    //
    //  Process promise
    //
    const props = {
      sqlTable: SQL_TABLE_REFLINKS
    }
    var myPromiseGet = MyQueryPromise(rowSelect(props))
    //
    //  Resolve Status
    //
    myPromiseGet.then(function (data) {
      debugFunStart('myPromiseGet')
      debugLogging('myPromiseGet Final fulfilled')
      debugLogging('data ', data)
      //
      //  Load Options from Data
      //
      if (data[0]) {
        LoadOptions(data)
      }
      //
      //  Return
      //
      debugFunEnd()
      return
    })
    //
    //  Return Promise
    //
    debugFunEnd()
    return myPromiseGet
  }
  //...................................................................................
  //.  Main Line
  //...................................................................................
  debugStack = []
  debugFunStart(debugModule)
  //
  //  SQL server
  //
  getRowAll()
}
export default OptionsRefLinks
