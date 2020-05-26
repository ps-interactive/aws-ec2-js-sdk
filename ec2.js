const fs = require('fs');
const command = process.argv[2].toUpperCase()
const process_data = (err, data) => {
  if (err) { console.log(`Error: ${err.message}`); }
  else if (data) { console.log(`Success: ${JSON.stringify(data)}`); }
};

const keyExists = (name) => {
  ec2.describeKeyPairs((err, data) => {
    if (err) { console.log(err, err.stack); }
    else { console.log(data); }
  });
};

// const AWS = require('aws-sdk');

// AWS.config.region = 'us-west-2';
// AWS.config.apiVersions = { ec2: '2016-11-15' };

// const ec2 = new AWS.EC2();

// switch (command) {
//   case 'KEY':
//     const keyParams = { KeyName: 'ec2-js-sdk-key-pair' };
//     ec2.createKeyPair(keyParams, (err, data) => {
//       if (err) { console.log(`Error: ${err.message}`); }
//       else if (data) {
//         fs.writeFileSync('private.pem', data.KeyMaterial, 'utf8');
//       }
//     });
//   default:
//     console.log('Command not recognized!');
// }
