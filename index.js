const curry = require('lodash.curry')
const isFunction = require('lodash.isfunction')
const isObject = require('lodash.isobject')

const isArray = Array.isArray

const VALUES = Symbol('Values Vls')

function setter (name, value) {
  this.ref[VALUES].set(name, value)
}

function getter (name) {
  return this.ref[VALUES].get(name)
}

function ref (name, defineValue = null) {
  if (defineValue === null) {
    return this.ref.get(name)
  } else {
    return this.ref.set(name, defineValue)
  }
}

function findEntry (validator) {
  if (!isFunction(validator)) {
    throw new TypeError(`validator is not a Function type`)
  }

  let returned
  const entries = this.ref.entries()

  while (true) {
    const { done, value: values } = entries.next()

    if (done === true || returned !== undefined) break

    const [index, value] = values

    if (validator.apply(this.ref, [ value, index, this.ref[VALUES] ])) {
      returned = [index, value]
    }
  }

  return returned
}

function findValue (validator) {
  return (findEntry.apply(this, [validator]) || [])[1]
}

function findKey (validator) {
  return (findEntry.apply(this, [validator]) || [])[0]
}

function parseToMapValue (value = null) {
  if (value === null) {
    return []
  } else if (value instanceof Map || isArray(value)) {
    return value
  } else if (isObject(value)) {
    return Object.entries(value)
  } else {
    return []
  }
}

function Vls (initValues = null) {
  if (initValues !== null && VALUES in initValues) return initValues

  const self = {}

  self.ref = ref.bind(self)
  self.ref[VALUES] = new Map(parseToMapValue(initValues))
  self.ref.set = setter.bind(self)
  self.ref.get = getter.bind(self)
  self.ref.define = curry(setter.bind(self))

  self.ref.findEntry = findEntry.bind(self)
  self.ref.findKey = findKey.bind(self)
  self.ref.findValue = findValue.bind(self)
  self.ref.find = findValue.bind(self)

  self.ref.keys = self.ref[VALUES].keys.bind(self.ref[VALUES])
  self.ref.values = self.ref[VALUES].values.bind(self.ref[VALUES])
  self.ref.entries = self.ref[VALUES].entries.bind(self.ref[VALUES])
  self.ref.forEach = self.ref[VALUES].forEach.bind(self.ref[VALUES])
  self.ref.each = self.ref[VALUES].forEach.bind(self.ref[VALUES])
  self.ref.has = self.ref[VALUES].has.bind(self.ref[VALUES])
  self.ref.delete = self.ref[VALUES].delete.bind(self.ref[VALUES])
  self.ref.clear = self.ref[VALUES].clear.bind(self.ref[VALUES])

  self.ref[Symbol.iterator] = self.ref.entries

  Object.defineProperty(self.ref, 'size', {
    get: () => self.ref[VALUES].size
  })

  self.ref.Vls = Vls

  return self.ref
}

Vls.Vls = Vls

exports = module.exports
exports.default = Vls
exports.Vls = Vls


