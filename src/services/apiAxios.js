//
//  Libraries
//
import axios from 'axios'
//
//  Debug Settings
//
import debugSettings from '../debug/debugSettings'
//
// Debug Settings
//
const g_log1 = debugSettings()
//
// methods - post(get), post(update), delete(delete), post(upsert)
//
const apiAxios = async (method, url, data) => {
  try {
    const response = await axios({
      method: method,
      url: url,
      data: data
    })
    //
    //  Errors
    //
    if (response.statusText !== 'OK')
      throw Error('Did not receive expected data')
    //
    //  Return rows
    //
    if (g_log1) console.log('return data rows ', response.data.length)
    return response.data
    //
    //  Catch Error
    //
  } catch (err) {
    console.log(err)
    return null
  }
}

export default apiAxios
