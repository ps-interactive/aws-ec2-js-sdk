const AWS = require('aws-sdk');

AWS.config.region = 'us-west-2';
AWS.config.apiVersions = { ec2: '2016-11-15' };

const ec2 = new AWS.EC2();

const params = {
  InstanceIds: [process.argv[3]]
};

const command = process.argv[2].toUpperCase()

const callback = (err, data) => {
  if (err) { console.log('Error', err); }
  else if (data) { console.log('Success', JSON.stringify(data)); }
}

switch (command) {
  case 'START':
    ec2.startInstances(params, callback);
    break;
  case 'STOP':
    ec2.stopInstances(params, callback);
    break;
  case 'REBOOT':
    ec2.rebootInstances(params, callback);
    break;
  case 'MONITOR':
    ec2.monitorInstances(params, callback);
    break;
  case 'UNMONITOR':
    ec2.unmonitorInstances(params, callback);
    break;
  default:
    console.log('Command not recognized');
}
