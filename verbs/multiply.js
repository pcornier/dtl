
module.exports = function (_) {
  let multiply = (a, b) => {
    let scalar = a.length + b.length === 2
    let longest = a.length >= b.length ? a : b
    let gen =  _.create_generator(a.length >= b.length ? b : a)
    let res = longest.map(i => (i * 1 || 0) * (gen.next().value * 1 || 0))
    return scalar ? res[0] : res
  }
  return {
    id: 'multiply',
    re: /^\s*\*\s*(.+)/,
    multiply: multiply,
    ex: (m, bf) => {
      let [a, b] = _.create_arrays(bf, _(m[1]))
      return multiply(a, b)
    }
  }
}

