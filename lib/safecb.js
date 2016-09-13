'use strict';

const Promise = require('bluebird');

function safecb(fn, ctx) {
  return function () {
    let args = [].slice.call(arguments);
    return new Promise(resolve => {
      let done = function () {
        let doneArgs = [].slice.call(arguments);
        let error = doneArgs.shift();

        if (error) {
          resolve({
            success: false,
            error
          });
          return;
        }

        resolve({
          success: true,
          payload: doneArgs
        });
      };

      args.push(done);
      fn.apply(ctx, args);
    }).catch(error => {
      return {
        success: false,
        error
      };
    });
  };
}

module.exports = {
  safecb
};