'use strict'

module.exports = function (_) {
  return {
    id: 'unbox',
    re: /^\s*\[/,
    ex: (m, bf) => {
      return bf.length === 1 ? bf[0] : bf
    }
  }
}
