//
//  Libraries
//
import { useState, useEffect } from 'react'
import PeopleOutlineTwoToneIcon from '@mui/icons-material/PeopleOutlineTwoTone'
import {
  Paper,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
  Box
} from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import CloseIcon from '@mui/icons-material/Close'
import RefreshIcon from '@mui/icons-material/Refresh'
import FilterListIcon from '@mui/icons-material/FilterList'
import { useSnapshot } from 'valtio'
//
//  Utilities
//
import { ValtioStore } from '../ValtioStore'
//
//  Pages
//
import QuestionEntry from './QuestionEntry'
//
//  Controls
//
import MyActionButton from '../../components/controls/MyActionButton'
import MyButton from '../../components/controls/MyButton'
import MyInput from '../../components/controls/MyInput'
import MySelect from '../../components/controls/MySelect'
//
//  Components
//
import Notification from '../../components/Notification'
import ConfirmDialog from '../../components/ConfirmDialog'
import Popup from '../../components/Popup'
import PageHeader from '../../components/PageHeader'
import useMyTable from '../../components/useMyTable'
//
//  Services
//
import MyQueryPromise from '../../services/MyQueryPromise'
import rowUpsert from '../../services/rowUpsert'
import rowUpdate from '../../services/rowUpdate'
import rowDelete from '../../services/rowDelete'
import rowSelect from '../../services/rowSelect'
import OptionsOwner from '../../services/OptionsOwner'
import OptionsGroup1 from '../../services/OptionsGroup1'
import OptionsGroup2 from '../../services/OptionsGroup2'
import OptionsGroup3 from '../../services/OptionsGroup3'
import OptionsRefLinks from '../../services/OptionsRefLinks'
//
//  Debug Settings
//
import debugSettings from '../../debug/debugSettings'
//
//  Styles
//
const useStyles = makeStyles(theme => ({
  pageContent: {
    margin: theme.spacing(1),
    padding: theme.spacing(1)
  },
  searchInput: {
    width: '40%'
  },
  searchInputTypeBox: {
    width: '10%',
    margin: `0 0 0 ${theme.spacing(2)}`
  },
  newButton: {
    position: 'absolute',
    right: '10px'
  }
}))
//
//  Questions Table
//
const { SQL_TABLE_QUESTIONS } = require('../../services/constants.js')
const { SQL_ROWS } = require('../../services/constants.js')
//
//  Table Heading
//
const headCells = [
  { id: 'qid', label: 'ID' },
  { id: 'qowner', label: 'Owner' },
  { id: 'qkey', label: 'Key' },
  { id: 'qdetail', label: 'Question' },
  { id: 'qgroup1', label: 'Group 1' },
  { id: 'qgroup2', label: 'Group 2' },
  { id: 'qgroup3', label: 'Group 3' },
  { id: 'actions', label: 'Actions', disableSorting: true }
]
const searchTypeOptions = [
  { id: 'qid', title: 'ID' },
  { id: 'qowner', title: 'Owner' },
  { id: 'qkey', title: 'Key' },
  { id: 'qdetail', title: 'Question' },
  { id: 'qgroup1', title: 'Group 1' },
  { id: 'qgroup2', title: 'Group 2' },
  { id: 'qgroup3', title: 'Group 3' }
]
//
// Debug Settings
//
const debugLog = debugSettings()
const debugFunStartSetting = false
const debugFunEndSetting = false
const debugModule = 'QuestionList'
let debugStack = []
//=====================================================================================
export default function QuestionList() {
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
  //.  GET ALL
  //.............................................................................
  const getRowAllData = () => {
    debugFunStart('getRowAllData')
    //
    //  Process promise
    //
    const sqlRows = `FETCH FIRST ${SQL_ROWS} ROWS ONLY`
    const props = {
      sqlURL: URL_BASE,
      sqlTable: SQL_TABLE_QUESTIONS,
      sqlOrderBy: ' order by qid',
      sqlRows: sqlRows
    }
    var myPromiseGet = MyQueryPromise(rowSelect(props))
    //
    //  Resolve Status
    //
    myPromiseGet.then(function (data) {
      debugLogging('myPromiseGet data ', data)
      //
      //  Update Table
      //
      setRecords(data)
      //
      //  Filter
      //
      handleSearch()
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
  //.............................................................................
  //.  DELETE
  //.............................................................................
  const deleteRowData = qid => {
    debugFunStart('deleteRowData')
    //
    //  Populate Props
    //
    const props = {
      sqlURL: URL_BASE,
      sqlTable: SQL_TABLE_QUESTIONS,
      sqlWhere: `qid = ${qid}`
    }
    var myPromiseDelete = MyQueryPromise(rowDelete(props))
    //
    //  Resolve Status
    //
    myPromiseDelete.then(function (data) {
      debugLogging('myPromiseDelete data ', data)
      //
      //  Update State - refetch data
      //
      getRowAllData()
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
    return myPromiseDelete
  }
  //.............................................................................
  //.  INSERT
  //.............................................................................
  const insertRowData = data => {
    debugFunStart('insertRowData')
    //
    //  Data Received
    //
    debugLogging('insertRowData data ', data)
    //
    //  Strip out qid as it will be populated by Insert
    //
    let { qid, ...rowData } = data
    debugLogging('Upsert Database rowData ', rowData)
    //
    //  Build Props
    //
    const props = {
      sqlURL: URL_BASE,
      sqlTable: SQL_TABLE_QUESTIONS,
      sqlKeyName: ['qowner', 'qkey'],
      sqlRow: rowData
    }
    //
    //  Process promise
    //
    debugLogging('rowUpsert')
    var myPromiseInsert = MyQueryPromise(rowUpsert(props))
    //
    //  Resolve Status
    //
    myPromiseInsert.then(function (data) {
      debugLogging('myPromiseInsert data ', data)
      //
      //  No data returned
      //
      if (!data) {
        console.log('No Data returned')
        throw Error
      } else {
        //
        //  Get ID
        //
        const rtn_qid = data[0].qid
        debugLogging(`Row (${rtn_qid}) UPSERTED in Database`)
        //
        //  Update record for edit with returned data
        //
        setRecordForEdit(data[0])
        debugLogging(`recordForEdit `, recordForEdit)
      }
      //
      //  Update State - refetch data
      //
      getRowAllData()
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
    return myPromiseInsert
  }
  //.............................................................................
  //.  UPDATE
  //.............................................................................
  const updateRowData = data => {
    debugFunStart('updateRowData')
    //
    //  Data Received
    //
    debugLogging('updateRowData Row ', data)
    //
    //  Populate Props
    //
    const props = {
      sqlURL: URL_BASE,
      sqlTable: SQL_TABLE_QUESTIONS,
      sqlWhere: `qid = ${data.qid}`,
      sqlRow: data,
      sqlID: 'qid'
    }
    //
    //  Process promise
    //
    var myPromiseUpdate = MyQueryPromise(rowUpdate(props))
    //
    //  Resolve Status
    //
    myPromiseUpdate.then(function (data) {
      debugLogging('myPromiseUpdate data ', data)
      //
      //  No data
      //
      if (!data) {
        console.log('No Data returned')
        throw Error
      } else {
        //
        //  Get QID
        //
        const rtn_qid = data[0].qid
        debugLogging(`Row (${rtn_qid}) UPDATED in Database`)
      }
      //
      //  Update State - refetch data
      //
      getRowAllData()
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
    return myPromiseUpdate
  }
  //.............................................................................
  //
  //  Styles
  //
  const classes = useStyles()
  //
  //  State
  //
  const [recordForEdit, setRecordForEdit] = useState(null)
  const [records, setRecords] = useState([])
  const [filterFn, setFilterFn] = useState({
    fn: items => {
      return items
    }
  })
  const [openPopup, setOpenPopup] = useState(false)
  const [searchType, setSearchType] = useState('qdetail')
  const [searchValue, setSearchValue] = useState('')
  //
  //  Notification
  //
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    severity: 'info'
  })
  //
  //  Confirm Delete dialog box
  //
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    subTitle: ''
  })
  //.............................................................................
  //
  //  Search/Filter
  //
  const handleSearch = () => {
    debugFunStart('handleSearch')
    setFilterFn({
      fn: items => {
        //
        //  Nothing to search, return rows
        //
        if (searchValue === '') {
          debugFunEnd()
          return items
        }
        //
        //  Filter
        //
        let itemsFilter = items
        switch (searchType) {
          case 'qid':
            itemsFilter = items.filter(x => x.qid === parseInt(searchValue))
            break
          case 'qowner':
            itemsFilter = items.filter(x =>
              x.qowner.toLowerCase().includes(searchValue.toLowerCase())
            )
            break
          case 'qkey':
            itemsFilter = items.filter(x =>
              x.qkey.toLowerCase().includes(searchValue.toLowerCase())
            )
            break
          case 'qdetail':
            itemsFilter = items.filter(x =>
              x.qdetail.toLowerCase().includes(searchValue.toLowerCase())
            )
            break
          case 'qgroup1':
            itemsFilter = items.filter(x =>
              x.qgroup1.toLowerCase().includes(searchValue.toLowerCase())
            )
            break
          case 'qgroup2':
            itemsFilter = items.filter(x =>
              x.qgroup2.toLowerCase().includes(searchValue.toLowerCase())
            )
            break
          case 'qgroup3':
            itemsFilter = items.filter(x =>
              x.qgroup3.toLowerCase().includes(searchValue.toLowerCase())
            )
            break
          default:
        }
        debugLogging('itemsFilter ', itemsFilter)
        debugFunEnd()
        return itemsFilter
      }
    })
  }
  //.............................................................................
  //
  //  Update Database
  //
  const addOrEdit = (row, resetForm) => {
    debugFunStart('addOrEdit')
    row.qid === 0 ? insertRowData(row) : updateRowData(row)

    setNotify({
      isOpen: true,
      message: 'Submitted Successfully',
      severity: 'success'
    })
    debugFunEnd()
  }
  //.............................................................................
  //
  //  Data Entry Popup
  //
  const openInPopup = row => {
    debugFunStart('openInPopup')
    setRecordForEdit(row)
    setOpenPopup(true)
    debugFunEnd()
  }
  //.............................................................................
  //
  //  Delete Row
  //
  const onDelete = qid => {
    debugFunStart('onDelete')
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false
    })
    deleteRowData(qid)
    setNotify({
      isOpen: true,
      message: 'Deleted Successfully',
      severity: 'error'
    })
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
  debugLogging('URL_BASE ', URL_BASE)
  //
  //  Initial Data Load
  //
  useEffect(() => {
    //
    //  Load Valtio Store
    //
    const props = {
      sqlURL: URL_BASE
    }
    OptionsOwner(props)
    OptionsGroup1(props)
    OptionsGroup2(props)
    OptionsGroup3(props)
    OptionsRefLinks(props)
    //
    //  Load form list
    //
    getRowAllData()
    // eslint-disable-next-line
  }, [])
  //.............................................................................
  //
  //  Populate the Table
  //
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useMyTable(records, headCells, filterFn)
  //...................................................................................
  //.  Render the form
  //...................................................................................
  return (
    <>
      <PageHeader
        title='Questions'
        subTitle='Data Entry and Maintenance'
        icon={<PeopleOutlineTwoToneIcon fontSize='large' />}
      />
      <Paper className={classes.pageContent}>
        <Toolbar>
          <MyInput
            label='Search'
            name='Search'
            value={searchValue}
            className={classes.searchInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon />
                </InputAdornment>
              )
            }}
            onChange={e => setSearchValue(e.target.value)}
          />
          <Box className={classes.searchInputTypeBox}>
            <MySelect
              fullWidth={true}
              name='SearchType'
              label='Column Heading'
              value={searchType}
              onChange={e => setSearchType(e.target.value)}
              options={searchTypeOptions}
            />
          </Box>
          <MyButton
            text='Filter'
            variant='outlined'
            startIcon={<FilterListIcon />}
            onClick={handleSearch}
          />
          <MyButton
            text='Refresh'
            variant='outlined'
            startIcon={<RefreshIcon />}
            onClick={getRowAllData}
          />

          <MyButton
            text='Add New'
            variant='outlined'
            startIcon={<AddIcon />}
            className={classes.newButton}
            onClick={() => {
              setOpenPopup(true)
              setRecordForEdit(null)
            }}
          />
        </Toolbar>
        <TblContainer>
          <TblHead />
          <TableBody>
            {recordsAfterPagingAndSorting().map(row => (
              <TableRow key={row.qid}>
                <TableCell>{row.qid}</TableCell>
                <TableCell>{row.qowner}</TableCell>
                <TableCell>{row.qkey}</TableCell>
                <TableCell>{row.qdetail}</TableCell>
                <TableCell>{row.qgroup1}</TableCell>
                <TableCell>{row.qgroup2}</TableCell>
                <TableCell>{row.qgroup3}</TableCell>
                <TableCell>
                  <MyActionButton
                    color='primary'
                    onClick={() => {
                      openInPopup(row)
                    }}
                  >
                    <EditOutlinedIcon fontSize='small' />
                  </MyActionButton>
                  <MyActionButton
                    color='secondary'
                    onClick={() => {
                      setConfirmDialog({
                        isOpen: true,
                        title: 'Are you sure to delete this record?',
                        subTitle: "You can't undo this operation",
                        onConfirm: () => {
                          onDelete(row.qid)
                        }
                      })
                    }}
                  >
                    <CloseIcon fontSize='small' />
                  </MyActionButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>
      <Popup
        title='Question Form'
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <QuestionEntry recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  )
}
