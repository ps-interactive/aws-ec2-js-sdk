const AWS = require('aws-sdk');

AWS.config.region = 'us-west-2';
AWS.config.apiVersions = { ec2: '2016-11-15' };

const ec2 = new AWS.EC2();
const params = { KeyName: 'KEY_PAIR_NAME' };

ec2.createKeyPair(params, (err, data)  => {
  if (err) { console.log("Error", err); }
  else { console.log(JSON.stringify(data)); }
});
