'use strict'

module.exports = function (_) {
  return {
    id: 'sort',
    re: /^\s*\^(!?)(\d+)/,
    ex: (m, bf) => {
      let order = m[1] === '!' ? -1 : 1
      return bf.sort((a, b) => {
        a = Array.isArray(a) ? a[m[2]] : a
        b = Array.isArray(b) ? b[m[2]] : b
        if (a < b) return -1 * order
        if (a > b) return 1 * order
        return 0
      })
    }
  }
}