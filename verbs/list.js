'use strict'

module.exports = function (_) {
  return {
    id: 'list',
    re: /^\s*(([\d\.]+|["`'].+?["`'])+\s+(\s*([\d\.]+|["`'].+?["`'])*\s*)+([\d\.]+|["`'].+?["`'])+)+/,
    ex: m => {
      return m[0].split(' ').map(v => {
        return _(v)
      })
    }
  }
}
