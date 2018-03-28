'use strict'

module.exports = function (_) {
  return {
    id: 'string',
    re: /^\s*[`"'](.+?)[`"']/,
    ex: m => {
      return m[1]
    }
  }
}
