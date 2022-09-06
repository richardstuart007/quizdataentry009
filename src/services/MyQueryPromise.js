//
//  Debug Settings
//
import debugSettings from '../debug/debugSettings'
//
// Debug Settings
//
const g_log1 = debugSettings()
//=====================================================================================
function MyQueryPromise(promise) {
  if (g_log1) console.log('Start MyQueryPromise')

  if (promise.isFulfilled) return promise

  // Set initial state
  var isPending = true
  var isRejected = false
  var isFulfilled = false

  // Observe the promise, saving the fulfillment in a closure scope.
  var result = promise.then(
    function (v) {
      isFulfilled = true
      isPending = false
      if (g_log1) console.log(typeof v, v)
      return v
    },
    function (e) {
      isRejected = true
      isPending = false
      if (g_log1) console.log(typeof e, e)
      throw e
    }
  )

  result.isFulfilled = function () {
    return isFulfilled
  }
  result.isPending = function () {
    return isPending
  }
  result.isRejected = function () {
    return isRejected
  }
  if (g_log1) console.log(typeof result, result)
  return result
}

export default MyQueryPromise
