//
//  Libraries
//
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio
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
export default function MyRadioGroup(props) {
  if (g_log1) console.log('Start MyRadioGroup')

  const { name, label, value, onChange, items, ...other } = props

  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <RadioGroup row name={name} value={value} onChange={onChange}>
        {items.map(item => (
          <FormControlLabel
            key={item.id}
            value={item.id}
            control={<Radio />}
            label={item.title}
            {...other}
          />
        ))}
      </RadioGroup>
    </FormControl>
  )
}
