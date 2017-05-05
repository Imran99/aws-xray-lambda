'use strict';

const AWSXRay = require('aws-xray-sdk-core'),
      AWS     = AWSXRay.captureAWS(require('aws-sdk')),
      lambda  = new AWS.Lambda(),
      co      = require('co');

module.exports.handle = (event, context, callback) => {
  co(function* () {
    console.log(event);
    let body = JSON.parse(event.body);
    yield lambda.invoke({
      FunctionName: 'aws-xray-lambda-dev-b',
      InvocationType: 'RequestResponse',
      Payload: JSON.stringify(body),
    }).promise();
  }).then(() => {
    callback(null, { statusCode: 200 });
  }).catch(e => {
    console.log(e);
    callback(null, { statusCode: 500 });
  });
};