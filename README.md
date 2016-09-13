# Safe Errors
In my opinion its simpler to handle errors just like I handle everything else.  Normally, errors are handled on a separate codepath. This module helps normalize the codepath for the return values (including errors) from asynchronous functions.

## Promise Example
#### Normal Way
```
let user
try {
  user = await getUser('http://www.example.com/api/v1/users/123')
} catch (e) {
  log(e)
  //  handle error in some way
}

user.name = 'New Name'

let postResponse
try {
  postResponse = await saveUser('http://www.example.com/api/v1/users/123')
} catch (e) {
  log(e)
  //  handle error in some way
}
```

#### Safe Way
```
const { safep } = require('safe-errors')
let getResult = await safep(getUser)('http://www.example.com/api/v1/users/123')
if (getResult.success === false) {
  log(getResult.error)
  //  handle error in some way
}

let user = getResult.payload
user.name = 'New Name'

let saveResult = await safep(saveUser)('http://www.example.com/api/v1/users/123', user)
if (saveResult.success === false) {
  log(saveResult.error)
  //  handle error in some way
}

```

#### Even Better Safe Way
```
const { pipeP, merge } = require('ramda')
const { safep } = require('safe-errors')

const getUserP = () => safep(getUser)('http://www.example.com/api/v1/users/123')
const updateUser = (user) => {
  return merge(user, {
    name: 'New name'
  })
}
const saveUserP = (user) => safep(saveUser)('http://www.example.com/api/v1/users/123', user)
const handleError = (result) => {
  if (result.success === false) {
    log(result.error)
    // maybe return a default
    return {}
  }

  return result.payload
}
let updateAndSaveUser = pipeP(getUserP, handleError, updateUser, saveUser, handleError)
let updateResult = await updateAndSaveUser()

if (updateResult.success === false) {
  log(updateResult.error)
}
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
