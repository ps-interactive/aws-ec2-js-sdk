const AWS = require('aws-sdk');

AWS.config.region = 'us-west-2';
AWS.config.apiVersions = { ec2: '2016-11-15' };

const ec2 = new AWS.EC2();
const params = { DryRun: false };
ec2.describeInstances(params, (err, data) => {
  if (err) { console.log("Error", err.stack); }
  else { console.log("Success", JSON.stringify(data)); }
});
