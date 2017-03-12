'use strict'

const assert = require('assert')

describe('register', () => {
  let _Promise

  before(() => {
    _Promise = Promise
    Promise = {} // eslint-disable-line
  })

  after(() => {
    Promise = _Promise // eslint-disable-line
  })

  it('patch global Promise object with asap() method', () => {
    assert(!Promise.asap)
    require('../src/register')
    assert(Promise.asap)
  })
})
