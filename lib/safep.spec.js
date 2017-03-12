'use strict';

var _require = require('simple-protocol-helpers');

var errorToObject = _require.errorToObject;

var _require2 = require('./safep');

var safep = _require2.safep;

var deep = require('assert').deepEqual;

describe('safe promise', function () {
  it('should convert a promise to a safe promise', function () {
    var p = function p() {
      return Promise.resolve('a');
    };

    return safep(p)().then(function (result) {
      deep(result.success, true);
      deep(result.payload, 'a');
    });
  });

  it('should return reject promise result', function () {
    var error = new Error('something bad!');
    var p = function p() {
      return Promise.reject(error);
    };

    return safep(p)().then(function (result) {
      deep(result.success, false);
      deep(result.error, errorToObject(error));
    });
  });
});