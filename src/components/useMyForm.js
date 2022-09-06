//
//  Libraries
//
import { useState } from 'react'
import makeStyles from '@mui/styles/makeStyles'
//
//  Debug Settings
//
import debugSettings from '../debug/debugSettings'
//
// Debug Settings
//
const g_log1 = debugSettings()
//=====================================================================================
//=  useMyForm
//=====================================================================================
export function useMyForm(initialFValues, validateOnChange = false, validate) {
  if (g_log1) console.log('Start useMyForm')
  //
  //  State
  //
  const [values, setValues] = useState(initialFValues)
  const [errors, setErrors] = useState({})
  //...................................................................................
  //
  //  Handle change and Validate
  //
  const handleInputChange = e => {
    const { name, value } = e.target
    if (g_log1) console.log({ name }, { value })
    if (g_log1) console.log({ [name]: value })

    setValues({
      ...values,
      [name]: value
    })
    if (validateOnChange) validate({ [name]: value })
  }
  //...................................................................................
  //
  //  Reset the form to Initial Values
  //
  const resetForm = () => {
    setValues(initialFValues)
    setErrors({})
  }
  //...................................................................................
  //
  //  Return Values
  //
  if (g_log1) console.log({ values })
  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm
  }
}
//=====================================================================================
//=  MyForm
//=====================================================================================
//
//  Styles
//
const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiFormControl-root': {
      width: '95%',
      margin: theme.spacing(0.5)
    }
  }
}))
//
//  MyForm
//
export function MyForm(props) {
  if (g_log1) console.log('Start MyForm')
  const classes = useStyles()
  const { children, ...other } = props
  return (
    <form className={classes.root} autoComplete='off' {...other}>
      {props.children}
    </form>
  )
}
