const AWS = require('aws-sdk');

AWS.config.region = 'us-west-2';
AWS.config.apiVersions = { ec2: '2016-11-15' };

const ec2 = new AWS.EC2();

const keyParams = { KeyName: 'ec2-js-sdk-key-pair' };
ec2.createKeyPair(params, (err, data)  => {
  if (err) { console.log('Error', err); }
  else { console.log(JSON.stringify(data)); }
});

const instanceParams = {
  ImageId: 'ami-09dd2e08d601bff67',
  InstanceType: 't2.nano',
  MinCount: 1,
  MaxCount: 1,
};
ec2.runInstances(instanceParams, (err, data) => {
  if (err) {
    console.error(err, err.stack);
  } else {
    const instanceId = data.Instances[0].InstanceId;
    console.log('Instance Created. InstanceId: ', instanceId);
    const tagParams = {
      Resources: [instanceId],
      Tags: [{ Key: 'Name', Value: 'ec2-js-sdk-instance' }]
    };
    const tagPromise = ec2.createTags(tagParams, (err, data) => {
      if (err) { console.error(err, err.stack); }
      else { console.log('Instance tagged'); }
    });
  }
});
