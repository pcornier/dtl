'use strict'

module.exports = function (_) {
  return [
    require('./csv')(_),
    require('./filter')(_),
    require('./select')(_),
    require('./dimensions')(_),
    require('./list')(_),
    require('./swap')(_),
    require('./count')(_),
    require('./reverse')(_),
    require('./generator')(_),
    require('./merge')(_),
    require('./number')(_),
    require('./multiply')(_),
    require('./add')(_),
    require('./string')(_),
    require('./tostring')(_),
    require('./group')(_),
    require('./join')(_),
    require('./insert')(_),
    require('./box')(_),
  ]
}