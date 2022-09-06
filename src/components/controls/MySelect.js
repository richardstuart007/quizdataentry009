//
//  Libraries
//
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText
} from '@mui/material'
//
//  Debug Settings
//
import debugSettings from '../../debug/debugSettings'
//
// Debug Settings
//
const g_log1 = debugSettings()
//=====================================================================================
export default function MySelect(props) {
  if (g_log1) console.log('Start MySelect')

  const {
    name,
    label,
    value,
    error = null,
    onChange,
    options,
    ...other
  } = props

  return (
    <FormControl variant='outlined' {...(error && { error: true })} {...other}>
      <InputLabel>{label}</InputLabel>
      <Select
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        {...other}
      >
        {options.map(item => (
          <MenuItem key={item.id} value={item.id}>
            {item.title}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  )
}
