'use strict'

module.exports = function (_) {

  let calc = (a, b, op) => {
    let scalar = a.length + b.length === 2
    let [sortest, longest] = a.length >= b.length ? [b, a] : [a, b]
    let gen =  _.create_generator((a.length || Infinity) >= (b.length || Infinity) ? b : a)
    let res = longest.map(i => {
      if (Array.isArray(i)) {
        return calc(i, sortest, op)
      }
      else {
        let v = gen.next().value
        if (Array.isArray(v)) {
          return calc(i, v, op)
        }
        else {
          switch (op) {
            case '+': return (i * 1 || 0) + (v * 1 || 0)
            case '-': return (i * 1 || 0) - (v * 1 || 0)
            case '*': return (i * 1 || 0) * (v * 1 || 0)
            case '%': return (i * 1 || 0) / (v * 1 || 0)
            case '#': return sortest.length
          }
        }
      }
    })
    return scalar ? res[0] : res
  }

  return {
    id: 'calc',
    re: /^\s*([#%\+\*]+)\s*(.+)/,
    calc: calc,
    ex: (m, bf) => {
      let [a, b] = _.create_arrays(bf, _(m[2]))
      return calc(a, b, m[1])
    }
  }
}

