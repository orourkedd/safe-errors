const Promise = require('bluebird')
const { success, failure } = require('simple-protocol-helpers')

function safecb (fn, ctx) {
  return function () {
    let args = [].slice.call(arguments)
    return new Promise((resolve) => {
      let done = function () {
        let doneArgs = [].slice.call(arguments)
        let error = doneArgs.shift()

        if (error) return resolve(failure(error))

        resolve(success(doneArgs[0], { args: doneArgs}))
      }

      args.push(done)
      fn.apply(ctx, args)
    }).catch(failure)
  }
}

module.exports = {
  safecb
}
