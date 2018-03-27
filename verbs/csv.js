const fs = require('fs')

module.exports = function (_) {
  return {
    id: 'csv',
    re: /^\s*(sc|t|c){1}sv\s*["'`]+(.+?)["'`]+/,
    ex: m => {
      let path = m[2]
      let sep = {sc: ';', t: '\t', c: ','}
      return fs.readFileSync(path, 'utf-8').split(/\n|\r\n/).filter(i => i !== '').map(row => row.split(sep[m[1]]))
    }
  }
}