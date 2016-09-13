# Safe Errors
In my opinion its simpler to handle errors just like I handle everything else.  Normally errors are handled on a separate codepath. This module helps normalize the codepath for the return values (including errors) from async functions.

## Promise Example
#### Normal Way
```
let response
try {
  response = await getUsers('http://www.example.com/api/v1/users')
} catch (e) {
  log(e)
  //  handle error in some way
}
console.log(response)
```

#### Safe Way
```
const { safep } = require('safe-errors')
let result = await safep(getUsers)('http://www.example.com/api/v1/users')
if (result.error) {
  log(result.error)
  //  handle error in some way
}
console.log(result.payload)
```

## Callback Example
#### Normal Way
```
const { readFile } = require('fs')
fs.readFile('file.txt', (err, data) => {
  if (err) {
    log(err)
    //  handle error in some way
  }
  console.log(data)
})
```

#### Safe Way
```
const { readFile } = require('fs')
const { safecb } = require('safe-errors')

let result = await safecb(readFile)('file.txt')
if (result.error) {
  log(result.error)
  //  handle error in some way
}
console.log(result.payload[0])
```
