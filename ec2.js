const fs = require('fs');
const { command, message, keyExists } = require('./helpers')

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
    const keyParams = { KeyName: 'ec2-js-sdk-key-pair' };
    if(keyExists(keyParams.KeyName)){
      console.log('A Key Pair already exists.');
    } else {
      ec2.createKeyPair(keyParams, (err, data) => {
        if (err) { console.log(`Error: ${err.message}`); }
        else if (data) {
          fs.writeFileSync('private.pem', data.KeyMaterial, 'utf8');
        }
      });
    }
    break;
  default:
    console.error('Not a valid command!');
    break;
}
