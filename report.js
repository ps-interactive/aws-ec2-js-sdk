const AWS = require('aws-sdk');

AWS.config.region = 'us-west-2';
AWS.config.apiVersions = { ec2: '2016-11-15' };

new AWS.EC2().describeSubnets((err, data) => {
  if (err) { console.log(err, err.stack); }
  else { console.log('SubentID: ', data['Subnets'][0].SubnetId); }
});
