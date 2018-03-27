
module.exports = function (_) {
  return {
    id: 'merge',
    re: /^\s*;(.+)/,
    ex: (m, bf) => {
      return bf.concat(_(m[1]))
    }
  }
}
