const isUndefined = require('lodash.isundefined')
const Vls = require('.')

if (isUndefined(global.Vls)) global.Vls = Vls.Vls

exports = module.exports = Vls
