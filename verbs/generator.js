
module.exports = function (_) {
  return {
    id: 'generator',
    re: /^\s*i\.\s*(\d+)/,
    ex: m => {
      let length = _(m[1])
      return new Array(length).fill(0).map((v, i) => i)
    }
  }
}
