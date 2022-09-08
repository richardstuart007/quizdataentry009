//
//  Libraries
//
import { useEffect, useState } from 'react'
import {
  Container,
  Typography,
  TableBody,
  TableRow,
  TableCell,
  Grid
} from '@mui/material'
//
//  Debug Settings
//
import debugSettings from '../../debug/debugSettings'
//
//  Controls
//
import MyButton from '../../components/controls/MyButton'
import useMyTable from '../../components/controls/useMyTable'
//
//  Utilities
//
import { useSnapshot } from 'valtio'
import { ValtioStore } from '../ValtioStore'
//
//  Services
//
import getTable from '../../services/getTable'
import MyQueryPromise from '../../services/MyQueryPromise'
//
//  Constants
//
const functionName = 'ServerData'
const FULFILLED = 'Fulfilled'
const REJECTED = 'Rejected'
const NODATA = 'No Data Found'
//
//  Table Heading
//
const headCells = [
  { id: 'id', label: 'ID' },
  { id: 'table', label: 'Table' },
  { id: 'status', label: 'Status' },
  { id: 'count', label: 'Count' }
]
//
//  Table Detail
//
let records = [
  { id: 1, table: 'Owner', status: 'Pending', count: 0 },
  { id: 2, table: 'Questions', status: 'Pending', count: 0 },
  { id: 3, table: 'Bidding', status: 'Pending', count: 0 },
  { id: 4, table: 'Hands', status: 'Pending', count: 0 },
  { id: 5, table: 'RefLinks', status: 'Pending', count: 0 },
  { id: 6, table: 'Group1Owner', status: 'Pending', count: 0 },
  { id: 7, table: 'Group2', status: 'Pending', count: 0 },
  { id: 8, table: 'Group3', status: 'Pending', count: 0 }
]
//
//  Global variables
//
let g_PromiseCount = 0
const g_PromiseTotal = records.length

let g_Owner = []
let g_Questions = []
let g_Bidding = []
let g_Hands = []
let RefLinks = []
let g_Group1Owner = []
let g_Group2 = []
let g_Group3 = []
//
// Debug Settings
//
const debugLog = debugSettings()
const debugFunStartSetting = false
const debugFunEndSetting = false
const debugModule = 'ServerData'
let debugStack = []

//===================================================================================
const ServerData = () => {
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
  //.............................................................................
  //
  //  Set Debug State
  //
  debugLogging('Start ServerData')
  const filterFn = {
    fn: items => {
      return items
    }
  }
  //
  //  Status of fetches
  //
  const [fulfilled, setFulfilled] = useState(false)
  //...................................................................................
  //.  Load Server - Owner
  //...................................................................................
  const LoadServerOwner = idx => {
    debugFunStart('LoadServerOwner')
    //
    //  Initial values
    //
    let count = 0
    let status = 'Pending'
    records[idx].count = count
    records[idx].status = status
    //
    //  Process promise
    //
    const getTableparams = {
      sqlCaller: functionName,
      sqlURL: URL_BASE,
      sqlTable: 'owner',
      sqlAction: 'SELECT',
      sqlWhere: '',
      sqlOrderByRaw: 'oowner'
    }
    const myPromiseOwner = MyQueryPromise(getTable(getTableparams))
    //
    //  Resolve Status
    //
    myPromiseOwner.then(function (data) {
      g_PromiseCount++
      debugFunStart('myPromiseOwner')
      debugLogging('myPromiseOwner data ', data)
      //
      //  Update Status
      //
      if (myPromiseOwner.isFulfilled()) {
        status = FULFILLED
        records[idx].status = status
      }
      if (myPromiseOwner.isRejected()) {
        debugLogging('records[idx].status ', records[idx].status)
        status = REJECTED
        records[idx].status = status
      }
      debugLogging('OWNER status ', status)
      //
      //  No data
      //
      if (!data) {
        status = NODATA
        records[idx].status = status
      }
      //
      //  Next Step - update store
      //
      else {
        //
        // Update the count
        //
        count = data.length
        records[idx].count = count

        debugLogging('OWNER count', count)
        //
        //  Store
        //
        g_Owner = data
        ValtioStore.v_Owner = data
      }
      //
      //  Update Status
      //
      if (g_PromiseCount === g_PromiseTotal) updateFetchStatus()
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
    return myPromiseOwner
  }
  //...................................................................................
  //.  Load Server - Questions
  //...................................................................................
  const LoadServerQuestions = idx => {
    debugFunStart('LoadServerQuestions')
    //
    //  Initial values
    //
    let count = 0
    let status = 'Pending'
    records[idx].count = count
    records[idx].status = status
    //
    //  Process promise
    //
    const getTableparams = {
      sqlCaller: functionName,
      sqlURL: URL_BASE,
      sqlTable: 'questions',
      sqlAction: 'SELECT',
      sqlWhere: '',
      sqlOrderByRaw: 'qid'
    }
    const myPromiseQuestions = MyQueryPromise(getTable(getTableparams))
    //
    //  Resolve Status
    //
    myPromiseQuestions.then(function (data) {
      g_PromiseCount++
      debugFunStart('myPromiseQuestions')
      debugLogging('myPromiseQuestions data ', data)
      //
      //  Update Status
      //
      if (myPromiseQuestions.isFulfilled()) {
        status = FULFILLED
        records[idx].status = status
      }
      if (myPromiseQuestions.isRejected()) {
        status = REJECTED
        records[idx].status = status
      }
      //
      //  No data
      //
      if (!data) {
        status = NODATA
        records[idx].status = status
      }
      //
      //  Next Step - update store
      //
      else {
        //
        // Update the count
        //
        count = data.length
        records[idx].count = count

        debugLogging('countQuestions count', count)
        //
        // update ValtioStore - Data
        //
        debugLogging('update v_Questions', data)
        g_Questions = data
        ValtioStore.v_Questions = data
      }
      //
      //  Update Status
      //
      if (g_PromiseCount === g_PromiseTotal) updateFetchStatus()
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
    return myPromiseQuestions
  }
  //...................................................................................
  //.  Load Server - Bidding
  //...................................................................................
  const LoadServerBidding = idx => {
    debugFunStart('LoadServerBidding')

    //
    //  Initial values
    //
    let count = 0
    let status = 'Pending'
    records[idx].count = count
    records[idx].status = status
    //
    //  Process promise
    //
    const getTableparams = {
      sqlCaller: functionName,
      sqlURL: URL_BASE,
      sqlTable: 'bidding',
      sqlAction: 'SELECT',
      sqlWhere: '',
      sqlOrderByRaw: 'bid'
    }
    const myPromiseBidding = MyQueryPromise(getTable(getTableparams))
    //
    //  Resolve Status
    //
    myPromiseBidding.then(function (data) {
      g_PromiseCount++
      debugFunStart('myPromiseBidding')
      debugLogging('myPromiseBidding data ', data)
      //
      //  Update Status
      //
      if (myPromiseBidding.isFulfilled()) {
        status = FULFILLED
        records[idx].status = status
      }
      if (myPromiseBidding.isRejected()) {
        status = REJECTED
        records[idx].status = status
      }
      //
      //  No data
      //
      if (!data) {
        status = NODATA
        records[idx].status = status
      }
      //
      //  Next Step - update store
      //
      else {
        //
        // Update the count
        //
        count = data.length
        records[idx].count = count

        debugLogging('countBidding count', count)
        //
        // update ValtioStore - Data
        //
        debugLogging('update v_Bidding', data)
        g_Bidding = data
        ValtioStore.v_Bidding = data
      }
      //
      //  Update Status
      //
      if (g_PromiseCount === g_PromiseTotal) updateFetchStatus()
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
    return myPromiseBidding
  }
  //...................................................................................
  //.  Load Server - Hands
  //...................................................................................
  const LoadServerHands = idx => {
    debugFunStart('LoadServerHands')

    //
    //  Initial values
    //
    let count = 0
    let status = 'Pending'
    records[idx].count = count
    records[idx].status = status

    //
    //  Process promise
    //
    const getTableparams = {
      sqlCaller: functionName,
      sqlURL: URL_BASE,
      sqlTable: 'hands',
      sqlAction: 'SELECT',
      sqlWhere: '',
      sqlOrderByRaw: 'hid'
    }
    const myPromiseHands = MyQueryPromise(getTable(getTableparams))
    //
    //  Resolve Status
    //
    myPromiseHands.then(function (data) {
      g_PromiseCount++
      debugFunStart('myPromiseHands')
      debugLogging('myPromiseHands data ', data)
      //
      //  Update Status
      //
      if (myPromiseHands.isFulfilled()) {
        status = FULFILLED
        records[idx].status = status
      }
      if (myPromiseHands.isRejected()) {
        status = REJECTED
        records[idx].status = status
      }
      //
      //  No data
      //
      if (!data) {
        status = NODATA
        records[idx].status = status
      }
      //
      //  Next Step - update store
      //
      else {
        //
        // Update the count
        //
        count = data.length
        records[idx].count = count

        debugLogging('countHands count', count)
        //
        // update ValtioStore - Data
        //
        debugLogging('update v_Hands', data)
        g_Hands = data
        ValtioStore.v_Hands = data
      }
      //
      //  Update Status
      //
      if (g_PromiseCount === g_PromiseTotal) updateFetchStatus()
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
    return myPromiseHands
  }
  //...................................................................................
  //.  Load Server - Reflinks
  //...................................................................................
  const LoadServerReflinks = idx => {
    debugFunStart('LoadServerReflinks')

    //
    //  Initial values
    //

    let count = 0
    let status = 'Pending'
    records[idx].count = count
    records[idx].status = status

    //
    //  Process promise
    //
    const getTableparams = {
      sqlCaller: functionName,
      sqlURL: URL_BASE,
      sqlTable: 'reflinks',
      sqlAction: 'SELECT',
      sqlWhere: '',
      sqlOrderByRaw: 'rid'
    }
    const myPromiseReflinks = MyQueryPromise(getTable(getTableparams))
    //
    //  Resolve Status
    //
    myPromiseReflinks.then(function (data) {
      g_PromiseCount++
      debugFunStart('myPromiseReflinks')
      debugLogging('myPromiseReflinks data ', data)

      //
      //  Update Status
      //
      if (myPromiseReflinks.isFulfilled()) {
        status = FULFILLED
        records[idx].status = status
      }
      if (myPromiseReflinks.isRejected()) {
        status = REJECTED
        records[idx].status = status
      }
      //
      //  No data
      //
      if (!data) {
        status = NODATA
        records[idx].status = status
      }
      //
      //  Next Step - update store
      //
      else {
        //
        // Update the count
        //
        count = data.length
        records[idx].count = count

        debugLogging('countReflinks count', count)
        //
        // update ValtioStore - Data
        //
        debugLogging('update v_RefLinks', data)
        RefLinks = data
        ValtioStore.v_RefLinks = data
      }
      //
      //  Update Status
      //
      if (g_PromiseCount === g_PromiseTotal) updateFetchStatus()
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
    return myPromiseReflinks
  }

  //...................................................................................
  //.  Load Server - Group1Owner
  //...................................................................................
  const LoadServerGroup1Owner = idx => {
    debugFunStart('LoadServerGroup1Owner')

    //
    //  Initial values
    //
    let count = 0
    let status = 'Pending'
    records[idx].count = count
    records[idx].status = status
    //
    //  Process promise
    //
    const getTableparams = {
      sqlCaller: functionName,
      sqlAction: 'SELECTSQL',
      sqlString:
        'qowner, qgroup1, g1title from questions join group1 on qgroup1 = g1id group by qowner, qgroup1 ,g1title order by qowner, qgroup1'
    }
    const myPromiseGroup1Owner = MyQueryPromise(getTable(getTableparams))
    //
    //  Resolve Status
    //
    myPromiseGroup1Owner.then(function (data) {
      g_PromiseCount++
      debugFunStart('myPromiseGroup1Owner')
      debugLogging('myPromiseGroup1Owner data ', data)
      //
      //  Update Status
      //
      if (myPromiseGroup1Owner.isFulfilled()) {
        status = FULFILLED
        records[idx].status = status
      }
      if (myPromiseGroup1Owner.isRejected()) {
        status = REJECTED
        records[idx].status = status
      }
      //
      //  No data
      //
      if (!data) {
        status = NODATA
        records[idx].status = status
      }
      //
      //  Next Step - update store
      //
      else {
        //
        // Update the count
        //
        count = data.length
        records[idx].count = count
        debugLogging('countGroup1Owner count', count)
        //
        //  Load Options and Store
        //
        debugLogging('Group1Owner ', data)
        g_Group1Owner = data
        ValtioStore.v_Group1Owner = data
      }
      //
      //  Update Status
      //
      if (g_PromiseCount === g_PromiseTotal) updateFetchStatus()
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
    return myPromiseGroup1Owner
  }
  //...................................................................................
  //.  Load Server - Group2
  //...................................................................................
  const LoadServerGroup2 = idx => {
    debugFunStart('LoadServerGroup2')
    //
    //  Initial values
    //
    let count = 0
    let status = 'Pending'
    records[idx].count = count
    records[idx].status = status
    //
    //  Process promise
    //
    const getTableparams = {
      sqlCaller: functionName,
      sqlURL: URL_BASE,
      sqlTable: 'group2',
      sqlAction: 'SELECT',
      sqlWhere: '',
      sqlOrderByRaw: 'g2id'
    }
    const myPromiseGroup2 = MyQueryPromise(getTable(getTableparams))
    //
    //  Resolve Status
    //
    myPromiseGroup2.then(function (data) {
      g_PromiseCount++
      debugFunStart('myPromiseGroup2')
      debugLogging('myPromiseGroup2 data ', data)
      //
      //  Update Status
      //
      if (myPromiseGroup2.isFulfilled()) {
        status = FULFILLED
        records[idx].status = status
      }
      if (myPromiseGroup2.isRejected()) {
        status = REJECTED
        records[idx].status = status
      }
      //
      //  No data
      //
      if (!data) {
        status = NODATA
        records[idx].status = status
      }
      //
      //  Next Step - update store
      //
      else {
        //
        // Update the count
        //
        count = data.length
        records[idx].count = count
        debugLogging('Group2 count', count)
        //
        //  Update Store
        //
        debugLogging('Group2 ', data)
        g_Group2 = data
        ValtioStore.v_Group2 = data
      }
      //
      //  Update Status
      //
      if (g_PromiseCount === g_PromiseTotal) updateFetchStatus()
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
    return myPromiseGroup2
  }
  //...................................................................................
  //.  Load Server - Group3
  //...................................................................................
  const LoadServerGroup3 = idx => {
    debugFunStart('LoadServerGroup3')
    //
    //  Initial values
    //
    let count = 0
    let status = 'Pending'
    records[idx].count = count
    records[idx].status = status
    //
    //  Process promise
    //
    const getTableparams = {
      sqlCaller: functionName,
      sqlURL: URL_BASE,
      sqlTable: 'group3',
      sqlAction: 'SELECT',
      sqlWhere: '',
      sqlOrderByRaw: 'g3id'
    }
    const myPromiseGroup3 = MyQueryPromise(getTable(getTableparams))
    //
    //  Resolve Status
    //
    myPromiseGroup3.then(function (data) {
      g_PromiseCount++
      debugFunStart('myPromiseGroup3')
      debugLogging('myPromiseGroup3 data ', data)
      //
      //  Update Status
      //
      if (myPromiseGroup3.isFulfilled()) {
        status = FULFILLED
        records[idx].status = status
        debugLogging('records[idx].status ', records[idx].status)
      }
      if (myPromiseGroup3.isRejected()) {
        status = REJECTED
        records[idx].status = status
      }
      //
      //  No data
      //
      if (!data) {
        status = NODATA
        records[idx].status = status
      }
      //
      //  Next Step - update store
      //
      else {
        //
        // Update the count
        //
        count = data.length
        records[idx].count = count
        debugLogging('Group3 count', count)
        //
        //  Update Store
        //
        debugLogging('Group3 ', data)
        g_Group3 = data
        ValtioStore.v_Group3 = data
      }
      //
      //  Update Status
      //
      if (g_PromiseCount === g_PromiseTotal) updateFetchStatus()
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
    return myPromiseGroup3
  }
  //...................................................................................
  //.  Load the dropdown options
  //...................................................................................
  const LoadOptions = () => {
    debugFunStart('LoadOptions')
    debugLogging('LoadOptions start ')
    g_PromiseCount = 0

    LoadServerQuestions(0)
    LoadServerBidding(1)
    LoadServerHands(2)
    LoadServerReflinks(3)
    LoadServerOwner(4)
    LoadServerGroup1Owner(5)
    LoadServerGroup2(6)
    LoadServerGroup3(7)

    debugFunEnd()
  }
  //...................................................................................
  //.  Form Submit
  //...................................................................................
  const SubmitForm = e => {
    debugFunStart('SubmitForm')

    WriteData('DataOwner.js', g_Owner, 'OWNER')
    WriteData('DataQuestions.js', g_Questions, 'QUESTIONS')
    WriteData('DataBidding.js', g_Bidding, 'BIDDING')
    WriteData('DataHands.js', g_Hands, 'HANDS')
    WriteData('DataRefLinks.js', RefLinks, 'REFLINKS')
    WriteData('DataGroup1Owner.js', g_Group1Owner, 'GROUP1OWNER')
    WriteData('DataGroup2.js', g_Group2, 'GROUP2')
    WriteData('DataGroup3.js', g_Group3, 'GROUP3')

    debugFunEnd()
  }
  //...................................................................................
  //.  Write Data
  //...................................................................................
  function destroyClickedElement(event) {
    document.body.removeChild(event.target)
  }
  const WriteData = (file, data, constant) => {
    debugFunStart('WriteData')

    var textToSave = `exports.${constant} = ` + JSON.stringify(data)

    var textToSaveAsBlob = new Blob([textToSave], { type: 'text/plain' })
    var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob)
    var fileNameToSaveAs = file

    console.log('textToSave ', textToSave)
    console.log('textToSaveAsBlob ', textToSaveAsBlob)
    console.log('textToSaveAsURL ', textToSaveAsURL)
    console.log('fileNameToSaveAs ', fileNameToSaveAs)

    var downloadLink = document.createElement('a')
    console.log('downloadLink ', downloadLink)

    downloadLink.download = fileNameToSaveAs
    downloadLink.innerHTML = 'Download File'
    downloadLink.href = textToSaveAsURL
    downloadLink.onclick = destroyClickedElement
    downloadLink.style.display = 'none'
    document.body.appendChild(downloadLink)

    downloadLink.click()

    debugFunEnd()
  }
  //...................................................................................
  //.  Update Fetch Status
  //...................................................................................
  const updateFetchStatus = () => {
    debugFunStart('updateFetchStatus')
    //
    //  Status value
    //
    const notFulfilled = records.some(record => record.status !== FULFILLED)
    const newFulfilled = !notFulfilled
    //
    //  Change to Fulfilled if ALL fulfilled
    //
    if (newFulfilled) {
      setFulfilled(newFulfilled)
      debugLogging('newFulfilled Final', newFulfilled)
    }

    debugFunEnd()
  }
  //...................................................................................
  //.  Main Line
  //...................................................................................
  debugStack = []
  debugFunStart(debugModule)
  //
  //  Define the ValtioStore
  //
  const snapShot = useSnapshot(ValtioStore)
  const URL_BASE = snapShot.v_URL

  useEffect(() => {
    LoadOptions()
    // eslint-disable-next-line
  }, [])
  //...................................................................................
  //
  //  Populate the Table
  //
  const { TblContainer, TblHead, TblPagination } = useMyTable(
    records,
    headCells,
    filterFn
  )
  debugLogging('Render the Form ')
  debugLogging('records ', records)
  debugLogging('g_PromiseCount ', g_PromiseCount)
  //...................................................................................
  //.  Render the form
  //...................................................................................
  return (
    <>
      <Container>
        <Grid container spacing={2}>
          {/*.................................................................................................*/}
          <TblContainer>
            <TblHead />
            <TableBody>
              {records.map(row => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.table}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>{row.count}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TblContainer>
          <TblPagination />
          {/*.................................................................................................*/}
          <Grid item xs={12}>
            {fulfilled ? (
              <MyButton
                text='Static Update'
                onClick={() => {
                  SubmitForm()
                }}
              />
            ) : (
              <Typography>All data not received</Typography>
            )}
          </Grid>
          {/*.................................................................................................*/}
        </Grid>
      </Container>
    </>
  )
}

export default ServerData
