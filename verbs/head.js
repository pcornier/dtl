'use strict'

module.exports = function (_) {
  return {
    id: 'head',
    re: /^\s*h(\d*)/,
    ex: (m, bf) => {
      return bf.slice(0, m[1] || 5)
    }
  }
}