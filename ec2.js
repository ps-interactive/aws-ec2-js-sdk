const fs = require('fs');
const { command, message } = require('./helpers')

const aws = require('aws-sdk');
aws.config = {
  region: 'us-west-2',
  apiVersions: {
    ec2: '2016-11-15'
  }
};
const ec2 = new aws.EC2();

switch (command) {
  case 'key':
    console.log('key');
    break;
  default:
    console.error('Not a valid command!');
    break;
}
