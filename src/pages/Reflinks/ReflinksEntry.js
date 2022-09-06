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
import MySelect from '../../components/controls/MySelect'
import { useMyForm, MyForm } from '../../components/useMyForm'
//
//  Form Initial Values
//
const initialFValues = {
  rid: 0,
  rref: '',
  rdesc: '',
  rlink: '',
  rwho: '',
  rtype: ''
}
//
//  Options
//
let OptionsType = [
  {
    id: 'pdf',
    title: 'PDF'
  },
  {
    id: 'webdoc',
    title: 'Web Document'
  },
  {
    id: 'youtube',
    title: 'YouTube Video'
  }
]
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
const debugModule = 'ReflinksEntry'
let debugStack = []
//=====================================================================================
export default function ReflinksEntry(props) {
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
    if ('rref' in fieldValues)
      errorsUpd.rref = fieldValues.rref === '' ? 'This field is required.' : ''
    if ('rdesc' in fieldValues)
      errorsUpd.rdesc =
        fieldValues.rdesc === '' ? 'This field is required.' : ''
    if ('rlink' in fieldValues)
      errorsUpd.rlink =
        fieldValues.rlink === '' ? 'This field is required.' : ''
    if ('rtype' in fieldValues)
      errorsUpd.rtype =
        fieldValues.rtype === '' ? 'This field is required.' : ''
    if ('rwho' in fieldValues)
      errorsUpd.rwho = fieldValues.rwho === '' ? 'This field is required.' : ''
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
  //  Disable/Allow entry
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

          <Grid item xs={8}>
            <MyInput
              name='rref'
              label='Reference'
              value={values.rref}
              onChange={handleInputChange}
              error={errors.rref}
              disabled={actionUpdate}
            />
          </Grid>
          {/*------------------------------------------------------------------------------ */}
          {actionUpdate ? (
            <Grid item xs={4}>
              <MyInput
                name='rid'
                label='ID'
                value={values.rid}
                disabled={true}
              />
            </Grid>
          ) : null}
          {/*------------------------------------------------------------------------------ */}
          <Grid item xs={12}>
            <MyInput
              name='rdesc'
              label='Description'
              value={values.rdesc}
              onChange={handleInputChange}
              error={errors.rdesc}
            />
          </Grid>
          {/*------------------------------------------------------------------------------ */}
          <Grid item xs={12}>
            <MyInput
              name='rlink'
              label='Link'
              value={values.rlink}
              onChange={handleInputChange}
              error={errors.rlink}
            />
          </Grid>
          {/*------------------------------------------------------------------------------ */}
          <Grid item xs={12}>
            <MyInput
              name='rwho'
              label='Who'
              value={values.rwho}
              onChange={handleInputChange}
              error={errors.rwho}
            />
          </Grid>
          {/*------------------------------------------------------------------------------ */}

          <Grid item xs={12}>
            <MySelect
              key={OptionsType.id}
              name='rtype'
              label='Type'
              value={values.rtype}
              onChange={handleInputChange}
              error={errors.rtype}
              options={OptionsType}
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
