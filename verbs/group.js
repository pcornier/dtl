
module.exports = function (_) {
  // s = sum, c = count, m = min, M = max
  return {
    id: 'group',
    re: /^\s*~(h*)\s*([\d\s]+)(,.+)?/,
    ex: (m, bf) => {

      let cl = m[2].split(' ').filter(i => i).map(i => parseInt(i))
      let fn = m[3] && m[3].split(' ') || ['c']

      // TODO filter bf to ignore first line if m[1] (header)

      let keys = {}
      let groups = bf.reduce((p, row) => {
        let key = cl.map(i => row[i])
        keys[key] = keys[key] || key
        key = keys[key]
        fn.forEach(f => {
          let arr = p.get(key) || {}
          if (f === 'c') {
            arr[f] = arr[f] + 1 || 1
          }
          else if (f[0] === 's') {
            arr[f] = arr[f] + (row[f[1]] * 1) || row[f[1]] * 1
          }
          else if (f[0] === 'm') {
            arr[f] = row[f[1]] < arr[f] ? 1 * row[f[1]] : 1 * arr[f] || 0
          }
          else if (f[0] === 'M') {
            arr[f] = row[f[1]] > arr[f] ? 1 * row[f[1]] : 1 * arr[f] || 0
          }
          else if (f[0] === 'a') {
            arr[f] = arr[f] || {}
            let s = arr[f].s + (row[f[1]] * 1) || row[f[1]] * 1 || 0
            let c = arr[f].c + 1 || 1
            arr[f] = new Number(s / c)
            arr[f].s = s
            arr[f].c = c
          }
          p.set(key, arr)
        })
        return p
      }, new Map())

      return Array.from(groups.keys()).map(k => {
        return k.concat(Object.values(groups.get(k)).map(v => v*1))
      })
    }
  }
}