'use strict'

module.exports = function (_) {
  return {
    id: 'filter',
    re: /^\s*\?\s*(:*)([^<=>!]*)\s*([<=>!]+)\s*(:*)([^?:]+)/,
    ex: (m, bf) => {
      let ia = _(m[2])
      let ib = _(m[5])
      let a = m[1] === ':' ? r => r[ia] || r : r => ia || r
      let b = m[4] === ':' ? r => r[ib] || r : r => ib || r

      return bf.filter(r => {
        let exp = `return A ${m[3]} B`
        return new Function('A', 'B', exp)(a(r), b(r))
      })

    }
  }
}
