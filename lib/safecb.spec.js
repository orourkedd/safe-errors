'use strict';

var _require = require('simple-protocol-helpers');

var errorToObject = _require.errorToObject;

var _require2 = require('./safecb');

var safecb = _require2.safecb;

var deep = require('assert').deepEqual;

describe('safe callback', function () {
  it('should convert a callback to a promise', function () {
    var cb = function cb(a, b, done) {
      done(null, '1');
    };

    return safecb(cb)('a', 'b').then(function (result) {
      deep(result.success, true);
      deep(result.payload, '1');
      deep(result.args, ['1']);
    });
  });

  it('should convert a callback to a promise and handle no arguments', function () {
    var cb = function cb(done) {
      done(null, 'a');
    };

    return safecb(cb)().then(function (result) {
      deep(result.success, true);
      deep(result.payload[0], 'a');
    });
  });

  it('should convert a callback to a promise and handle errors', function () {
    var error = new Error('error in cb');
    var cb = function cb(a, b, done) {
      done(error);
    };

    return safecb(cb)('a', 'b').then(function (result) {
      deep(result.success, false);
      deep(result.error, errorToObject(error));
    });
  });

  it('should convert a callback to a promise and catch errors', function () {
    var error = new Error('error thrown in cb');

    var cb = function cb(a, b, done) {
      throw error;
    };

    return safecb(cb)('a', 'b').then(function (result) {
      deep(result.success, false);
      deep(result.error, errorToObject(error));
    });
  });
});