const fs = require('fs');
const { command, instance, tag, message, keyExists, ensureKey } = require('./helpers');

/****************
AWS Configuration
*****************/
const AWS = require('aws-sdk');
AWS.config.region = 'us-west-2';
AWS.config.apiVersions = { ec2: '2016-11-15' };
const ec2 = new AWS.EC2();

const keyParams = { KeyName: 'ec2-js-sdk-key-pair' };
const manageParams = { InstanceIds: [instance] };

switch (command) {
  case 'key':
    keyExists(keyParams.KeyName, () => {
      ec2.createKeyPair(keyParams, (err, data) => {
        if (err) { console.log("Error", err); }
        else { 
          fs.writeFileSync('private.pem', data.KeyMaterial, 'utf-8'); 
          console.log('KeyPair Created. Private Key saved to `private.pem`.');
        }
      });
    });
    break;
  case 'create':
    ensureKey(keyParams.KeyName, () => {
      const instanceParams = {
        ImageId: 'ami-09dd2e08d601bff67',
        InstanceType: 't2.nano',
        KeyName: keyParams.KeyName,
        MinCount: 1,
        MaxCount: 1
      };
      ec2.runInstances(instanceParams, (err, data) => {
        if (err) {
          console.error(err, err.stack);
        } else {
          const instanceId = data.Instances[0].InstanceId;
          console.log(`Instance Created. InstanceId: ${instanceId}`);
        }
      });
    });
    break;
  case 'tag':
    const tagParams = {
      Resources: [instance],
      Tags: [{ Key: 'Name', Value: tag }]
    };
    ec2.createTags(tagParams, message);
    break;
  case 'start':
    ec2.startInstances(manageParams, message);
    break;
  case 'stop':
    ec2.stopInstances(manageParams, message);
    break;
  case 'reboot':
    ec2.rebootInstances(manageParams, message);
    break;
  case 'describe':
    ec2.describeInstances(manageParams, message);
    break;
  case 'monitor':
    ec2.monitorInstances(manageParams, message);
    break;
  case 'unmonitor':
    ec2.unmonitorInstances(manageParams, message);
    break;
  default:
    console.error('Not a valid command!');
    break;
}
