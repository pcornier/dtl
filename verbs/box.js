
module.exports = function (_) {
  return {
    id: 'box',
    re: /^\s*\]/,
    ex: (m, bf) => {
      return [bf]
    }
  }
}
