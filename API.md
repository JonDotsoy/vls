# API `Vls`

## `[new ]Vls([source])`

### Arguments
- `[sources]` *`(Array|Vls|Object)`*: Initial values to vls object.

### Returns
- `(Vls)`: Object Vls type

### Example
```javascript
const vls1 = new Vls([ ['a', 4], ['b', 1], ['c', 9] ])
const vls2 = new Vls({ a: 4, b: 1, c: 9 })
const vls3 = new Vls(vls1)
```
