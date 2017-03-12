'use strict'

function asap (iterable) {
  const handles = []
  const promises = Array.from(iterable)

  // number of last resolved promise
  let current = 0
  // list of "ordered" promises
  const queue = Array.from(
    Array(promises.length),
    () => new Promise((resolve, reject) => {
      handles.push({ resolve, reject })
    })
  )

  promises.forEach(promise => {
    if (promise && promise.then) {
      promise
        .then(function () {
          // take next queued promise and resolve it
          handles[current++].resolve.apply(null, arguments)
        })
        .catch(function () {
          // take next queued promise and reject it
          handles[current++].reject.apply(null, arguments)
        })
    } else {
      // handle non-promise value
      handles[current++].resolve(promise)
    }
  })

  return queue
}

module.exports = asap
