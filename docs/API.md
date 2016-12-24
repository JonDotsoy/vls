# API `Vls`

## `[new ]Vls([source])`

### Arguments
- `[sources]` *`(Array|Vls|Object)`*: Initial values to vls object.

### Returns
- `(Vls)`: Object Vls type

### Example
```javascript
const vls1 = new Vls([ ['a', 4], ['b', 1], ['c', 9] ]) // [object Vls]
const vls2 = new Vls({ a: 4, b: 1, c: 9 }) // [object Vls]
const vls3 = new Vls(vls1) // [object Vls]
const vls4 = Vls([ ['a', 4], ['b', 1], ['c', 9] ]) // [object Vls]
const vls5 = Vls({ a: 4, b: 1, c: 9 }) // [object Vls]
const vls6 = Vls(vls4) // [object Vls]

[...vls1] // [ [ 'a', 4 ], [ 'b', 1 ], [ 'c', 9 ] ]
[...vls2] // [ [ 'a', 4 ], [ 'b', 1 ], [ 'c', 9 ] ]
[...vls3] // [ [ 'a', 4 ], [ 'b', 1 ], [ 'c', 9 ] ]
```

## Setter `vls(key)`

### Arguments
- `key` *`(*)`*: Key reference to value.

### Returns
- `(*)`: Value by propitie element.

### Example
```javascript
const vls1 = new Vls({a: 13}) // [object Vls]

vls1('a') // 13
```

## Getter `vls(key, value)`

### Arguments
- `key` *`(*)`*: Key reference to value.
- `value` *`(*)`*: Value of the key reference.

### Example
```javascript
const vls1 = new Vls() // [object Vls]

vls1('a', 13)
vls1('a') // 13
```

## `vls.define(key, value)` or `vls.define(key)(value)`

### Arguments
- `key` *`(*)`*: Key reference to value.
- `[value]` *`(*)`*: Value of the key reference.

### Example
```javascript
const memory = Vls()

// Example: /list/operations/define/rol
page('/u/:uid/settings', (ctx, next) => {
  const setterOperation = memory.define(ctx.params.operation)

  $('#selector-operation').change(function (event){
    setterOperation(event.target.value)
  })
})

page('/results', () => {
  [...memory] // [ [ 'rol', 'admin' ] ]
  // Mi code on here
})
```