//
//  Libraries
//
import { useState } from 'react'
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TablePagination,
  TableSortLabel
} from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
//
//  Debug Settings
//
import debugSettings from '../debug/debugSettings'
//
//  Styles
//
const useStyles = makeStyles(theme => ({
  table: {
    marginTop: theme.spacing(1),
    '& thead th': {
      fontWeight: '600',
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.primary.light,
      padding: theme.spacing(0.5)
    },
    '& tbody td': {
      fontWeight: '300',
      padding: theme.spacing(0.5)
    },
    '& tbody tr:hover': {
      backgroundColor: '#fffbf2',
      cursor: 'pointer'
    }
  }
}))
//
// Debug Settings
//
const debugLog = debugSettings()
const debugFunStartSetting = false
const debugFunEndSetting = false
const debugModule = 'useMyTable'
let debugStack = []
//=====================================================================================
export default function useMyTable(records, headCells, filterFn) {
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
  //  Styles
  //
  const classes = useStyles()
  //
  //  State
  //
  const pages = [10, 20, 50]
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(pages[page])
  const [order, setOrder] = useState()
  const [orderBy, setOrderBy] = useState()
  //.....................................................................................
  //. Table Container
  //.....................................................................................
  const TblContainer = props => (
    <Table className={classes.table}>{props.children}</Table>
  )
  //.....................................................................................
  //. Table Header
  //.....................................................................................
  const TblHead = props => {
    //
    //  Sort
    //
    const handleSortRequest = cellId => {
      const isAsc = orderBy === cellId && order === 'asc'
      setOrder(isAsc ? 'desc' : 'asc')
      setOrderBy(cellId)
    }
    //
    //  Table Header Row
    //
    return (
      <TableHead>
        <TableRow>
          {headCells.map(headCell => (
            <TableCell
              key={headCell.id}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              {headCell.disableSorting ? (
                headCell.label
              ) : (
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : 'asc'}
                  onClick={() => {
                    handleSortRequest(headCell.id)
                  }}
                >
                  {headCell.label}
                </TableSortLabel>
              )}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    )
  }
  //.....................................................................................
  //.  Change Page
  //.....................................................................................
  const handleChangePage = (event, newPage) => {
    debugFunStart('handleChangePage')
    debugLogging('newPage ', newPage)
    setPage(newPage)
    debugFunEnd()
  }
  //.....................................................................................
  //.  Change Rows per page
  //.....................................................................................
  const handleChangeRowsPerPage = event => {
    debugFunStart('handleChangeRowsPerPage')
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
    debugFunEnd()
  }
  //.....................................................................................
  //.  Pagination
  //.....................................................................................
  const TblPagination = () => (
    <TablePagination
      component='div'
      page={page}
      rowsPerPageOptions={pages}
      rowsPerPage={rowsPerPage}
      count={records.length}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  )
  //.....................................................................................
  //.  Sort Functions
  //.....................................................................................
  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index])
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0])
      if (order !== 0) return order
      return a[1] - b[1]
    })
    return stabilizedThis.map(el => el[0])
  }

  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy)
  }

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1
    }
    if (b[orderBy] > a[orderBy]) {
      return 1
    }
    return 0
  }
  //.....................................................................................
  //.  Filter, Slice a page, sort
  //.....................................................................................
  const recordsAfterPagingAndSorting = () => {
    debugFunStart('recordsAfterPagingAndSorting')

    debugLogging('page ', page)
    // setPage(0)

    const rtnstableSort = stableSort(
      filterFn.fn(records),
      getComparator(order, orderBy)
    ).slice(page * rowsPerPage, (page + 1) * rowsPerPage)

    debugLogging('rtnstableSort ', rtnstableSort)

    debugFunEnd()
    return rtnstableSort
  }
  //.....................................................................................
  //.  Return Values
  //.....................................................................................
  debugStack = []
  debugFunStart(debugModule)

  return {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting
  }
}
