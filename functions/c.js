'use strict';

const Promise  = require('bluebird'),
      co       = require('co');

module.exports.handle = (event, context, callback) => {
  co(function* () {
    console.log('here');
    yield Promise.resolve();
  }).then(() => {
    callback(null, { statusCode: 200 });
  }).catch(e => {
    console.log(e);
    callback(null, { statusCode: 500 });
  });
};