//
//  Libraries
//
import { useEffect } from 'react'
import { Grid } from '@mui/material'
//
//  Debug Settings
//
import debugSettings from '../../debug/debugSettings'
//
//  Controls
//
import MyButton from '../../components/controls/MyButton'
import MyInput from '../../components/controls/MyInput'
import { useMyForm, MyForm } from '../../components/useMyForm'
//
//  Form Initial Values
//
const initialFValues = {
  g2id: '',
  g2title: ''
}
//
//  Global Variable
//
let actionUpdate = false
//
// Debug Settings
//
const debugLog = debugSettings()
const debugFunStartSetting = false
const debugFunEndSetting = false
const debugModule = 'Group2Entry'
let debugStack = []
//=====================================================================================
export default function Group2Entry(props) {
  const { addOrEdit, recordForEdit } = props

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
  //
  // Validate the fields
  //
  const validate = (fieldValues = values) => {
    debugFunStart('validate')
    debugLogging(fieldValues)
    //
    //  Load previous errors
    //
    let errorsUpd = { ...errors }
    //
    //  Validate current field
    //
    if ('g2id' in fieldValues)
      errorsUpd.g2id = fieldValues.g2id === '' ? 'This field is required.' : ''
    if ('g2title' in fieldValues)
      errorsUpd.g2title =
        fieldValues.g2title === '' ? 'This field is required.' : ''
    //
    //  Set the errors
    //
    setErrors({
      ...errorsUpd
    })
    //
    //  Check if every element within the errorsUpd object is blank, then return true (valid), but only on submit when the fieldValues=values
    //
    if (fieldValues === values) {
      debugFunEnd()
      return Object.values(errorsUpd).every(x => x === '')
    }

    debugFunEnd()
  }
  //...................................................................................
  //
  //  UseMyForm
  //
  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useMyForm(initialFValues, true, validate)
  //...................................................................................
  //.  Submit form
  //...................................................................................
  const handleSubmit = e => {
    debugFunStart('handleSubmit')
    e.preventDefault()
    //
    //  Validate & Update
    //
    if (validate()) {
      debugLogging('values ', values)
      const { ...UpdateValues } = { ...values }
      debugLogging('UpdateValues ', UpdateValues)
      //
      //  Update database
      //
      debugLogging('UpdateValues ', UpdateValues)
      addOrEdit(UpdateValues, resetForm)

      debugFunEnd()
    }
  }
  //...................................................................................
  //.  Main Line
  //...................................................................................
  debugStack = []
  debugFunStart(debugModule)
  //
  //  On change of record, set State
  //
  useEffect(() => {
    debugLogging('useEffect')
    debugLogging('recordForEdit ', recordForEdit)
    //
    //  Update form values
    //
    if (recordForEdit) {
      setValues({
        ...recordForEdit
      })
    }
    // eslint-disable-next-line
  }, [recordForEdit])
  //
  //  Disable entry, allow for Entry
  //
  recordForEdit === null ? (actionUpdate = false) : (actionUpdate = true)
  debugLogging('actionUpdate', actionUpdate)
  //
  //  Button Text
  //
  let submitButtonText
  actionUpdate ? (submitButtonText = 'Update') : (submitButtonText = 'Add')
  //...................................................................................
  //.  Render the form
  //...................................................................................
  return (
    <>
      <MyForm onSubmit={handleSubmit}>
        <Grid container>
          {/*------------------------------------------------------------------------------ */}

          <Grid item xs={12}>
            <MyInput
              name='g2id'
              label='Group2'
              value={values.g2id}
              onChange={handleInputChange}
              error={errors.g2id}
              disabled={actionUpdate}
            />
          </Grid>

          {/*------------------------------------------------------------------------------ */}
          <Grid item xs={12}>
            <MyInput
              name='g2title'
              label='Title'
              value={values.g2title}
              onChange={handleInputChange}
              error={errors.g2title}
            />
          </Grid>
          {/*------------------------------------------------------------------------------ */}
          <Grid item xs={2}>
            <MyButton type='submit' text={submitButtonText} />
          </Grid>
          {/*------------------------------------------------------------------------------ */}
        </Grid>
      </MyForm>
    </>
  )
}
