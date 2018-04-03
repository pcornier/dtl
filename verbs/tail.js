'use strict'

module.exports = function (_) {
  return {
    id: 'tail',
    re: /^\s*t(\d*)/,
    ex: (m, bf) => {
      return bf.slice(bf.length - (m[1] || 5))
    }
  }
}