'use strict'

module.exports = function (_) {

  let sel = require('./select')(_)

  return {
    id: 'filter',
    re: /^\s*\?\s*(:*)([^<=>!]*)\s*([<=>!]+)\s*(:*)([^?:\s]+)(\s+r(['"`]*[^\s'"`]+.))?/,
    ex: (m, bf) => {
      let ia = _(m[2])
      let ib = _(m[5])
      let a = m[1] === ':' ? r => r[ia] || r : r => ia || r
      let b = m[4] === ':' ? r => r[ib] || r : r => ib || r

      if (!m[6]) {
        return bf.filter(r => {
          let exp = `return A ${m[3]} B`
          return new Function('A', 'B', exp)(a(r), b(r))
        })
      }

      else {
        let rep = _(m[7])
        return bf.map(r => {
          let exp = `return A ${m[3]} B`
          if (new Function('A', 'B', exp)(a(r), b(r))) {
            return rep
          }
          return r
        })

      }


    }
  }
}
