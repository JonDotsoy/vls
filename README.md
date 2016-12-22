# VLS
VLS or (Vertical Layer State) is a persistent object, similar to Map.

## API `Vls`

### Syntax

> `[new ]Vls([initialValues])`

## Example

### One example similar to a Map Object

```javascript
const myVls = new Vls

myVls.set('key1', 'value to key1')
myVls.set('key2', 'value to key2')
myVls.set('key3', 'value to key3')

console.log(myVls.get('key3')) // value to key3
```

### Find a value

```javascript
const myVls = new Vls

myVls.set('key1', {v: 9,text:'value to key1'})
myVls.set('key2', {v: 3,text:'value to key2'})
myVls.set('key3', {v: 7,text:'value to key3'})

const myResult = myVls.find(function (value, index) {
  return value.v === 9
})

console.log(myResult) // {v: 3,text:'value to key2'}
```

### References on ReactJS

> See it https://facebook.github.io/react/docs/refs-and-the-dom.html

```javascript
class myComponent extends React.Component {
  constructor(props) {
    super(props)

    this.ref = Vls()
  }

  updateValue() {
    const value = this.ref('input').value
    this.setState({value})
  }

  handleUpdateInput (event) {
    this.updateValue()
  }

  render () {
    this.ref.clear()
    const refd = this.ref.define

    return <div ref={refd("root")}>
      <from class="form" role="form">
        <div class="input-text">
          <input type="text" ref={refd("input")}>
        </div>

        <div class="preview">
          <h1 class="content-text">{String(this.state.value)}</h1>
        </div>
      </from>
    </div>
  }
}
```

