'use strict';

const AWSXRay  = require('aws-xray-sdk-core'),
      AWS      = AWSXRay.captureAWS(require('aws-sdk')),
      Promise  = require('bluebird'),
      dynamoDb = Promise.promisifyAll(new AWS.DynamoDB.DocumentClient()),
      co       = require('co'),
      _        = require('lodash'),
      rp       = require('request-promise');

module.exports.handle = (event, context, callback) => {
  co(function* () {
    console.log('event', event);
    console.log('context', context);

    event.key = _.uniqueId();
    yield dynamoDb.putAsync({
      TableName: 'tracingTable',
      Item: event
    });

    yield rp({
      method: 'POST',
      uri: 'https://qkgwv4194b.execute-api.eu-west-1.amazonaws.com/dev/c',
      headers: {
        'x-api-key': process.env.API_KEY,
        // 'X-Amzn-Trace-id'
      }
    });
  }).then(() => {
    callback(null);
  }).catch(e => {
    console.log(e);
    callback('Oops!');
  });
};