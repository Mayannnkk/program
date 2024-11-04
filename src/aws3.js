const AWS = require('aws-sdk');
const fs = require('fs');

AWS.config.update({
  accessKeyId: 'YOUR_AWS_ACCESS_KEY',
  secretAccessKey: 'YOUR_AWS_SECRET_KEY',
  region: 'YOUR_AWS_REGION',
});

const s3 = new AWS.S3();
