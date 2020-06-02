const fs = require('fs');
const { command, message, keyExists } = require('./helpers')

/****************
AWS Configuration
*****************/
const AWS = require('aws-sdk');
AWS.config.region = 'us-west-2';
AWS.config.apiVersions = { ec2: '2016-11-15' };
const ec2 = new AWS.EC2();

// const keyParams = { KeyName: 'ec2-js-sdk-key-pair' };

switch (command) {
  // case 'key':
  //   keyExists(keyParams.KeyName, () => {
  //     ec2.createKeyPair(keyParams, (err, data) => {
  //       if (err) { console.log("Error", err); } 
  //       else { 
  //         fs.writeFileSync('private.pem', data.KeyMaterial, 'utf-8'); 
  //         console.log('KeyPair Created. Private Key saved to `private.pem`.')
  //       }
  //     });
  //   });
  //   break;
  default:
    console.error('Not a valid command!');
    break;
}
