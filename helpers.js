const command = require('minimist')(process.argv.slice(2))._[0]

const message = (err, data) => {
  if (err) { console.log(`Error: ${err.message}`); }
  else if (data) { console.log(`Success: ${JSON.stringify(data)}`); }
};

const keyExists = ec2.describeKeyPairs().promise().then((data) => data).catch((err) => err);

module.exports = { command, message, keyExists }
