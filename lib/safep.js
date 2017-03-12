'use strict';

var _require = require('simple-protocol-helpers');

var success = _require.success;
var failure = _require.failure;

function safep(p, ctx) {
  return function () {
    return p.apply(ctx, arguments).then(function (payload) {
      return success(payload);
    }).catch(function (error) {
      return failure(error);
    });
  };
}

module.exports = {
  safep: safep
};