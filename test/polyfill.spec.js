const assert = require('assert')
const asap = require('../src/polyfill')

describe('polyfill', () => {
  it('is a function', () => {
    assert.strictEqual(typeof asap, 'function')
  })

  it('returns an array', () => {
    assert(Array.isArray(asap([])))
  })

  it('returns all promises immediately', () => {
    assert.strictEqual(
      asap([ 1, Promise.reject(2).catch(() => {}) ]).length,
      2
    )
  })

  it('it sorts promises in order of resolving', done => {
    const first = sleep(10, 'first')
    const second = sleep(30, 'second')
    const third = sleep(20, 'third')

    Promise.all(asap([ first, second, third ]))
      .then(result => {
        assert.deepEqual(result, [ 'first', 'third', 'second' ])
        done()
      })
  })

  it('it accept non-promise values', done => {
    const first = sleep(20, 'first')
    const second = 'second'
    const third = sleep(10, 'third')

    Promise.all(asap([ first, second, third ]))
      .then(result => {
        assert.deepEqual(result, [ 'second', 'third', 'first' ])
        done()
      })
  })

  it('doesn\'t fall if one or more promises was rejected', () => {
    asap([
      sleep(0, 'test'),
      // nodejs will warn here with UnhandledPromiseRejectionWarning
      // but this message is supressed in bootstrap-test.js
      // so this test can work normal
      sleep(0, new Error()),
      sleep(0, 'test')
    ])
  })
})

function sleep (delay, result) {
  return new Promise((resolve, reject) =>
    setTimeout(result instanceof Error ? reject : resolve, delay, result)
  )
}
