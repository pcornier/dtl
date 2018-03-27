
module.exports = function (_) {
  return {
    id: 'dim',
    re: /^\$\s*([^)]+)/,
    ex: (m, bf) => {

      let dim = function(n, gen, buffer, r) {
        if (r < n.length) {
          let length = n[r]
          if (!buffer.length) {
            buffer = new Array(length).fill(0)
          }
          return buffer.map(i => dim(n, gen, buffer[i], r+1))
        }
        return gen.next().value
      }
      let n = _.create_arrays(bf)
      let gen = _.create_generator(_(m[1]))
      return dim(n, gen, [], 0)
    }
  }
}
