
module.exports = function (_) {
  return {
    id: 'filter',
    re: /^\s*\?(\s*(.+?)\s*([<=>]+)\s*([^?\s]+)\s*)+/,
    ex: (m, bf) => {
      let fn = []

      let e
      let re = /[^?]*\?\s*(:*)([^\s]+)\s*([<=>]+)\s*(:*)([^\s?]+)/g
      while(e = re.exec(m.input)) {
        let ia = _(e[2])
        let ib = _(e[5])
        let a = e[1] === ':' ? r => r[ia] : r => ia
        let b = e[4] === ':' ? r => r[ib] : r => ib
        let f
        switch(e[3]) {
          case '<':
            f = (r) => a(r) < b(r)
            break
          case '>':
            f = (r) => a(r) > b(r)
            break
          case '=':
            f = (r) => a(r) == b(r)
            break
          case '<=':
            f = (r) => a(r) <= b(r)
            break
          case '>=':
            f = (r) => a(r) >= b(r)
            break
        }
        fn.push(f)
      }

      return bf.filter(r => fn.every(f => f(r)))
    }
  }
}
