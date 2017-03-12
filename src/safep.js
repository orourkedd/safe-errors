const { success, failure } = require('simple-protocol-helpers')

function safep (p, ctx) {
  return function () {
    return p
    .apply(ctx, arguments)
    .then((payload) => {
      return success(payload)
    })
    .catch((error) => {
      return failure(error)
    })
  }
}

module.exports = {
  safep
}
