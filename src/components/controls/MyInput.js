//
//  Libraries
//
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
export default function MyInput(props) {
  if (g_log1) console.log('Start MyInput')
  //
  //  Deconstruct
  //
  const { name, label, value, error = null, onChange, ...other } = props
  if (g_log1) console.log('props: ', props)
  //
  return (
    <TextField
      variant='outlined'
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      {...other}
      {...(error && { error: true, helperText: error })}
    />
  )
}
