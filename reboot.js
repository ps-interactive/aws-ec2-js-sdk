const AWS = require('aws-sdk');

AWS.config.region = 'us-west-2';
AWS.config.apiVersions = { ec2: '2016-11-15' };

const ec2 = new AWS.EC2();

const params = {
  InstanceIds: ['INSTANCE_ID'],
  DryRun: true
};
ec2.rebootInstances(params, (err, data) => {
  if (err && err.code === 'DryRunOperation') {
    params.DryRun = false;
    ec2.rebootInstances(params, (err, data) => {
        if (err) { console.log("Error", err); }
        else if (data) { console.log("Success", data); }
    });
  } else {
    console.log("You don't have permission to reboot instances.");
  }
});
