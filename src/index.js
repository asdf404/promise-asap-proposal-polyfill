function install (target) {
  target.asap = require('./polyfill')
}

module.exports = install
module.exports.default = install
