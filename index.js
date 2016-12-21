const curry = require('lodash.curry')
const isFunction = require('lodash.isfunction')

const VALUES = Symbol('Values')

function setter (name, value) {
  this.ref[VALUES].set(name, value)
}

function getter (name) {
  return this.ref[VALUES].get(name)
}

function ref (name, defineValue = null) {
  if (defineValue === null) {
    return this.ref.getter(name)
  } else {
    return this.ref.setter(name, defineValue)
  }
}

function findEntry (validator) {
  if (!isFunction(validator)) {
    throw new TypeError(`validator is not a Function type`)
  }

  let returned
  const entries = this.ref.entries()

  while (true) {
    const { done, value:values } = entries.next()
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

function vls () {
  self = new Object

  self.ref = ref.bind(self)
  self.ref[VALUES] = new Map()
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

  return self.ref
}

global.vls = vls

const e = new vls
global.e = e

e.set("a", "a:3")
e.set("b", "b:6")
e.set("c", "c:9")

exports = module.exports
exports.default = vls
exports.vls = vls
