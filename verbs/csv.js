'use strict'

const fs = require('fs')

module.exports = function (_) {
  return {
    id: 'csv',
    re: /^\s*(sc|t|c){1}sv(h?)\s*["'`]+(.+?)["'`]+/,
    ex: m => {
      let path = m[3]
      let sep = {sc: ';', t: '\t', c: ','}
      return fs.readFileSync(path, 'utf-8')
        .split(/\n|\r\n/)
        .filter(i => i !== '')
        .slice(m[2] ? 1 : 0)
        .map(row => row.split(sep[m[1]]))
    }
  }
}