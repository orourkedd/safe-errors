'use strict';

var Promise = require('bluebird');

var _require = require('simple-protocol-helpers');

var success = _require.success;
var failure = _require.failure;

function safecb(fn, ctx) {
  return function () {
    var args = [].slice.call(arguments);
    return new Promise(function (resolve) {
      var done = function done() {
        var doneArgs = [].slice.call(arguments);
        var error = doneArgs.shift();

        if (error) return resolve(failure(error));

        resolve(success(doneArgs[0], { args: doneArgs }));
      };

      args.push(done);
      fn.apply(ctx, args);
    }).catch(failure);
  };
}

module.exports = {
  safecb: safecb
};