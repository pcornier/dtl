'use strict'

module.exports = function (_) {
  let calc = require('./calc')(_)
  return {
    id: 'insert',
    re: /^\s*\/([#\+\*%-]+)/,
    ex: (m, bf) => {
      let fn = (a, v) => {
        [a, v] = _.create_arrays(a, v)
        return calc.calc(a, v, m[1])
      }
      return bf.reduce((a, r) => {
        return fn(a, r)
      })
    }
  }
}
