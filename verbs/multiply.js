
module.exports = function (_) {
  return {
    id: 'multiply',
    re: /^\s*\*\s*(.+)/,
    ex: (m, bf) => {
      let [a, b] = _.create_arrays(bf, _(m[1]))
      let scalar = a.length + b.length === 2
      let longest = a.length >= b.length ? a : b
      let gen =  _.create_generator(a.length >= b.length ? b : a)
      let res = longest.map(i => i * gen.next().value)
      return scalar ? res[0] : res
    }
  }
}

