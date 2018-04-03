'use strict'

const dtl = function(code) {

  let ctx = {}
  let ctx_idx = 0

  const _ = function (code, buffer) {

    code = code.trim()

    if (code.match(/\n|\r\n/g)) {
      return code.split(/\n|\r\n/).map(c => _(c)).filter(i => i)
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
    if (m = code.match(/^\s*@([^\s]+)/)) {
      let n = _(m[1])
      if (ctx['@'+n] !== undefined) {
        buffer = ctx['@'+n]
        code = code.replace(m[0], '')
        return _(code, ctx['@'+n])
      }
      ctx['@'+n] = Array.isArray(buffer) ? [...buffer] : buffer
      buffer = undefined
      code = code.replace(m[0], '')
      return _(code, buffer)
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
    if (typeof(arr) === 'function') {
      return function* () {
        while (true) yield arr()
      }()
    }

    if (!Array.isArray(arr)) {
      arr = [arr]
    }

    return function* () {
      while (true) {
        let i = 0
        for (; i < arr.length; i++) yield arr[i]
      }
    }()
  }

  _.create_arrays = (...args) => {
    args = args.map(arr => Array.isArray(arr) ? arr : [arr])
    return args.length > 1 ? args : args[0]
  }

  _.ctx = ctx

  const verbs = require('./verbs')(_)
  let result = _(code)
  return typeof(result) === 'function' ? result() : result
}

module.exports = dtl

dtl('(3 3 $ 1 2) @1 (2 2 $ 1 `one` 2 `two`) @2 @1 & @2 0=0 :1') //?