
module.exports = function (_) {
  return {
    id: 'number',
    re: /^\s*(\d+(\.\d+)?)\s*/,
    ex: m => {
      return m[1] * 1
    }
  }
}
