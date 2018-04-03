'use strict'

module.exports = function (_) {
  return {
    id: 'rand',
    re: /^\s*\?:(\d+)/,
    ex: (m, bf) => {
      if (bf !== undefined) {
        if (Array.isArray(bf)) {
          bf.push(parseInt(Math.random() * (m[1] * 1)))
          return bf
        }
        else {
          return [bf, parseInt(Math.random() * (m[1] * 1))]
        }
      }
      else {
        return () => parseInt(Math.random() * (m[1] * 1))
      }
    }
  }
}