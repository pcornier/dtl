
module.exports = function (_) {
  return {
    id: 'merge',
    re: /^\s*(-?);(.+)/,
    ex: (m, bf) => {
      let a = bf
      let b = _(m[2])
      if (m[1]) {
        a = b
        b = bf
      }
      return a.concat(b)
    }
  }
}
