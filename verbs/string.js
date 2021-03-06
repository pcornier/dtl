'use strict'

module.exports = function (_) {
  return {
    id: 'string',
    re: /^\s*[`"'](.+?)[`"']/,
    ex: (m, bf) => {
      if (bf !== undefined) {
        if (Array.isArray(bf)) {
          bf.push(m[1])
          return bf
        }
        else {
          return [bf, m[1]]
        }
      }
      else {
        return m[1]
      }
    }
  }
}
