const AWS = require('aws-sdk');

AWS.config.region = 'us-west-2';
AWS.config.apiVersions = { ec2: '2016-11-15' };

const ec2 = new AWS.EC2();

const params = { InstanceIds: [process.argv[3]] };
const command = process.argv[2].toUpperCase()
const process = (err, data) => {
  if (err) { console.log(`Error: ${err.message}`); }
  else if (data) { console.log(`Success: ${JSON.stringify(data)}`); }
}

switch (command) {
  case 'CREATE':
    const keyParams = { KeyName: 'ec2-js-sdk-key-pair' };
    ec2.createKeyPair(params, process);
    const instanceParams = {
      ImageId: 'ami-09dd2e08d601bff67',
      InstanceType: 't2.nano',
      KeyName: keyParams.KeyName,
      MinCount: 1,
      MaxCount: 1,
    };
    ec2.runInstances(instanceParams, (err, data) => {
      if (err) {
        console.error(err, err.stack);
      } else {
        const instanceId = data.Instances[0].InstanceId;
        console.log(`Instance Created. InstanceId: ${instanceId}`);
        const tagParams = {
          Resources: [instanceId],
          Tags: [{ Key: 'Name', Value: 'ec2-js-sdk-instance' }]
        };
        const tagPromise = ec2.createTags(tagParams, process);
      }
    });
    break;
  case 'DESCRIBE':
    ec2.describeInstances(params, process);
    break;
  case 'START':
    ec2.startInstances(params, process);
    break;
  case 'STOP':
    ec2.stopInstances(params, process);
    break;
  case 'REBOOT':
    ec2.rebootInstances(params, process);
    break;
  case 'MONITOR':
    ec2.monitorInstances(params, process);
    break;
  case 'UNMONITOR':
    ec2.unmonitorInstances(params, process);
    break;
  default:
    console.log('Command not recognized');
}
