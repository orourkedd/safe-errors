const { safecb } = require('./index')
const deep = require('assert').deepEqual

describe('safe errors', () => {
  describe('safecb', () => {
    it('should convert a callback to a promise', () => {
      let cb = (a, b, done) => {
        done(null, 'a')
      }

      return safecb(cb)('a', 'b').then((result) => {
        deep(result.success, true)
        deep(result.payload[0], 'a')
      })
    })

    it('should convert a callback to a promise and handle no arguments', () => {
      let cb = (done) => {
        done(null, 'a')
      }

      return safecb(cb)().then((result) => {
        deep(result.success, true)
        deep(result.payload[0], 'a')
      })
    })

    it('should convert a callback to a promise and handle errors', () => {
      let error = new Error('error in cb')
      let cb = (a, b, done) => {
        done(error)
      }

      return safecb(cb)('a', 'b').then((result) => {
        deep(result.success, false)
        deep(result.error, error)
      })
    })

    it('should convert a callback to a promise and catch errors', () => {
      let error = new Error('error thrown in cb')

      let cb = (a, b, done) => {
        throw error
      }

      return safecb(cb)('a', 'b').then((result) => {
        deep(result.success, false)
        deep(result.error, error)
      })
    })
  })
})
