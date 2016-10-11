'use strict';

var Promise = require('bluebird');

function safecb(fn, ctx) {
  return function () {
    var args = [].slice.call(arguments);
    return new Promise(function (resolve) {
      var done = function done() {
        var doneArgs = [].slice.call(arguments);
        var error = doneArgs.shift();

        if (error) {
          resolve({
            success: false,
            error: error
          });
          return;
        }

        resolve({
          success: true,
          payload: doneArgs[0],
          args: doneArgs
        });
      };

      args.push(done);
      fn.apply(ctx, args);
    }).catch(function (error) {
      return {
        success: false,
        error: error
      };
    });
  };
}

module.exports = {
  safecb: safecb
};