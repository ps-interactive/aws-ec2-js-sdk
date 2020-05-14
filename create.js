const AWS = require('aws-sdk');

AWS.config.region = 'us-west-2';
AWS.config.apiVersions = { ec2: '2016-11-15' };

const ec2 = new AWS.EC2();

const params = {
  ImageId: 'ami-09dd2e08d601bff67',
  InstanceType: 't2.nano',
  MinCount: 1,
  MaxCount: 1,
  SubnetId: "subnet-0720e3c74ef10ff97"
};

const instancePromise = new AWS.EC2().runInstances(params, (err, data) => {
  if (err) {
    console.error(err, err.stack);
  } else {
    const instanceId = data.Instances[0].InstanceId;
    const tagParams = {
      Resources: [instanceId],
      Tags: [{ Key: 'Name', Value: 'SDK Sample' }]
    };
    const tagPromise = new AWS.EC2().createTags(tagParams, (err, data) => {
      if (err) { console.error(err, err.stack); }
      else { console.log("Instance tagged"); }
    });
  }
});
