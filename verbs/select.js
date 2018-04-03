'use strict'

module.exports = function (_) {

  let select = (m, bf) => {
    let sel = function(d, idx, i, buf) {
      idx[i].map(n => {
        try {
          if (i === idx.length - 1) {
            buf.push(d[n])
          }
          else {
            buf[n] = sel(d[n], idx, i+1, [])
          }
        }
        catch(e) {
          throw Error('index error')
        }
      })
      return buf.filter(i => i != undefined)
    }

    let idx = m[1].split(':').map(d => d.split('.').map(v => _(v)))
    return sel(bf, idx, 0, [])
  }

  return {
    id: 'select',
    re: /^\s*:([\d\.:]+)/,
    select: select,
    ex: (m, bf) => select(m, bf)
  }
}
