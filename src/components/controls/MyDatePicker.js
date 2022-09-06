//
//  Libraries
//
import { LocalizationProvider, DatePicker } from '@mui/lab'
import DateFnsUtils from '@date-io/date-fns'
import { TextField } from '@mui/material'
//
//  Debug Settings
//
import debugSettings from '../../debug/debugSettings'
//
// Debug Settings
//
const g_log1 = debugSettings()
//=====================================================================================
export default function MyDatePicker(props) {
  if (g_log1) console.log('Start MyDatePicker')

  const { name, label, value, onChange, ...other } = props
  if (g_log1) console.log(name, label, value)
  //
  //  Convert the parameters to name, value parameters needed for onChange function
  //
  const convertToDefEventPara = (name, value) => ({
    target: {
      name,
      value
    }
  })
  if (g_log1) console.log(convertToDefEventPara(name, value))

  return (
    <LocalizationProvider utils={DateFnsUtils}>
      <DatePicker
        disableToolbar
        variant='inline'
        inputVariant='outlined'
        label={label}
        format='MMM/dd/yyyy'
        name={name}
        value={value}
        {...other}
        onChange={date => onChange(convertToDefEventPara(name, date))}
        renderInput={params => <TextField {...params} />}
      />
    </LocalizationProvider>
  )
}
