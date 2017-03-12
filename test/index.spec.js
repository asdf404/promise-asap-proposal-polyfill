const assert = require('assert')
const install = require('../src/index')

describe('Promise.asap', () => {
  it('exports install() function', () => {
    assert(install)
    // check es6-style export
    assert.strictEqual(install, install.default)
  })
})
