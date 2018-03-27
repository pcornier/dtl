

module.exports = function (_) {
  let add = require('./add')(_)
  let mul = require('./multiply')(_)
  return {
    id: 'insert',
    re: /^\s*\/([s\*]+)/,
    ex: (m, bf) => {
      let fn = {
        's': (a, v) => {
          [a, v] = _.create_arrays(a, v)
          return add.add(a, v)
        },
        '*': (a, v) => {
          [a, v] = _.create_arrays(a, v)
          return mul.multiply(a, v)
        }
      }
      return bf.reduce((a, r) => {
        return fn[m[1]](a, r)
      })
    }
  }
}
