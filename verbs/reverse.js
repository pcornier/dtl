
module.exports = function (_) {
  return {
    id: 'reverse',
    re: /^\s*\!/,
    ex: (m, bf) => {
      if (Array.isArray(bf)) {
        return bf.reverse()
      }
      else if (typeof(bf) === 'string') {
        return bf.split('').reverse().join('')
      }
      return -bf
    }
  }
}
