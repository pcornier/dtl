'use strict'

const dtl = function(code) {

  let ctx = {}
  let ctx_idx = 0

  const _ = function (code, buffer) {

    code = code.trim()

    if (code.match(/\n|\r\n/g)) {
      return code.split(/\n|\r\n/).map(c => _(c)).filter(i => i)
    }

    // get from context
    if (Object.keys(ctx).includes(code)) {
      let v = ctx[code]
      delete ctx[code]
      return v
    }

    // parenthesis
    if (/^\s*\(/.test(code)) {
      let c = 0
      let exp = ''
      let i
      for (i of code) {
        if (i === '(') c++
        if (i === ')') c--
        if (c >= 1) exp += i
        if (c === 0 && exp.length) break
      }
      buffer = _(exp.substr(1), buffer)
      code = code.replace(exp + ')', '')
      return _(code, buffer)
    }

    // save/load state
    let m
    if (m = code.match(/^\s*@(:)*([^\s]+)/)) {
      let n = _(m[2])
      if (m[1] === ':') {
        ctx['@'+n] = buffer
        code = code.replace(m[0], '')
        return _(code, buffer)
      }
      code = code.replace(m[0], '')
      return _(code, ctx['@'+n])
    }

    let found = verbs.some(v => {
      let m
      if (m = code.match(v.re)) {
        code = code.replace(m[0], '')
        buffer = v.ex(m, buffer)
        return true
      }
      return false
    })

    if (found && code.trim().length) {
      return _(code, buffer)
    }
    else {
      if (code.trim().length === 0) return buffer
      return new Function('return ' + code)()
    }
  }

  _.create_generator = arr => {
    return function* () {
      while (true) {
        let i = 0
        for (; i < arr.length; i++) yield arr[i]
      }
    }()
  }

  _.create_arrays = function() {
    let args = Array.from(arguments).map(arr => Array.isArray(arr) ? arr : [arr])
    return args.length > 1 ? args : args[0]
  }

  _.ctx = ctx

  const verbs = require('./verbs')(_)
  return _(code)
}

module.exports = dtl

// let a = dtl('(csv `spec/sample.csv` @:1 (:0 /+ ; `total`) ] @:2 @1 ? :0 == `B` :| @:1 /+ ] -; @1) :| @:1 /+ (:1.2.3.4.5 -; `Total`]) ] -; @1 -; @2') //?
let a = dtl('(5 3 $ i.10) ? :0 > 2 ? :1 == 0') //?
console.log(a)
