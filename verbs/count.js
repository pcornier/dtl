'use strict'

module.exports = function (_) {
  return {
    id: 'count',
    re: /^\s*#/,
    ex: (m, bf) => {
      return bf.length
    }
  }
}