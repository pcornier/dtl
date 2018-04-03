'use strict'

const fs = require('fs')

module.exports = function (_) {
  return {
    id: 'duplicates',
    re: /^\s*\|\|/,
    ex: (m, bf) => {
      let list = {}
      bf.forEach(i => list[i.toString()] = i)
      return Object.values(list)
    }
  }
}