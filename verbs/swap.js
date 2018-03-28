
module.exports = function (_) {
  return {
    id: 'swap',
    re: /^\s*:\|/,
    ex: (m, bf) => {
      if (!Array.isArray(bf)) return bf
      if (!Array.isArray(bf[0])) return bf.map(i => [i])
      let res = []
      for (let x = 0; x < bf[0].length; x++) {
        let row = []
        for (let y = 0; y < bf.length; y++) {
          row.push(bf[y][x])
        }
        res.push(row)
      }
      return res
    }
  }
}
