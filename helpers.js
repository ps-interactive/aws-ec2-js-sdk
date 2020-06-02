const aws = require('aws-sdk');
const command = require('minimist')(process.argv.slice(2))._[0]
const _ = require("lodash");

aws.config = {
  region: 'us-west-2',
  apiVersions: {
    ec2: '2016-11-15'
  }
};
const ec2 = new aws.EC2();

const message = (err, data) => {
  if (err) { console.log(`Error: ${err.message}`); }
  else if (data) { console.log(`Success: ${JSON.stringify(data)}`); }
};

const getKey = async name => {
  let data = await ec2.describeKeyPairs().promise();
  let result = _.filter(data.KeyPairs, { KeyName: name })
  return result.length == 1;
}

const keyExists = async (name, func) => !await getKey(name) ? func() : console.log("A key exists with that name.");
const ensureKey = async (name, func) => await getKey(name) ? func() : console.log("A key doesn't exists with that name.");


module.exports = { command, message, keyExists, ensureKey }
