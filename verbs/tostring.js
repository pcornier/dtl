'use strict'

module.exports = function (_) {
  return {
    id: 'tostring',
    re: /^\s*:"/,
    ex: (m, bf) => {
      return Array.isArray(bf) ? bf.join('') : bf.toString()
    }
  }
}
