const { safep } = require('./safep')
const deep = require('assert').deepEqual

describe('safe promise', () => {
  it('should convert a promise to a safe promise', () => {
    let p = () => {
      return Promise.resolve('a')
    }

    return safep(p)().then((result) => {
      deep(result.success, true)
      deep(result.payload[0], 'a')
    })
  })
})
