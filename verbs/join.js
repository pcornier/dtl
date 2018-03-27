
module.exports = function (_) {
  // s = sum, c = count, m = min, M = max, a = average
  return {
    id: 'join',
    re: /^\s*&\s*(\(.+?\)|\@\d+)\s*([\d=\s]+)\s*(:[^\s]+)+/,

    ex: (m, bf) => {

      let tbl = _(m[1])
      let on = m[2].split(' ').filter(i => i).map(c => c.split('='))
      let left = on.map(o => o[0])
      let right = on.map(o => o[1])
      let sel = m[3].split('.').filter(i => i).map(s => s.trim()[1])

      // build indexes
      let indexes = tbl.reduce((p, row) => {
        let key = right.map(k => row[k])
        p[key] = row
        return p
      }, {})

      return bf.map(row => {
        let key = left.map(k => row[k])
        let cols = sel.map(c => indexes[key] !== undefined ? indexes[key][c] : null).filter(i => i)
        return cols.length ? row.concat(cols) : null
      }).filter(i => i !== null)

    }
  }
}