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
      if (err) {
        console.error(err, err.stack)
      } else {
        console.log("Instance tagged")
      }
    });
  }
});

const descParam = { DryRun: false };

ec2.describeInstances(descParam, (err, data) => {
  if (err) {
    console.log("Error", err.stack);
  } else {
    console.log("Success", JSON.stringify(data));
  }
});



/*
const monitorParams = {
  InstanceIds: [process.argv[3]],
  DryRun: true
};

if (process.argv[2].toUpperCase() === "START") {
  // Call EC2 to start the selected instances
  ec2.startInstances(monitorParams, function(err, data) {
    if (err && err.code === 'DryRunOperation') {
      monitorParams.DryRun = false;
      ec2.startInstances(monitorParams, function(err, data) {
          if (err) {
            console.log("Error", err);
          } else if (data) {
            console.log("Success", data.StartingInstances);
          }
      });
    } else {
      console.log("You don't have permission to start instances.");
    }
  });
} else if (process.argv[2].toUpperCase() === "STOP") {
  // Call EC2 to stop the selected instances
  ec2.stopInstances(monitorParams, function(err, data) {
    if (err && err.code === 'DryRunOperation') {
      monitorParams.DryRun = false;
      ec2.stopInstances(monitorParams, function(err, data) {
          if (err) {
            console.log("Error", err);
          } else if (data) {
            console.log("Success", data.StoppingInstances);
          }
      });
    } else {
      console.log("You don't have permission to stop instances");
    }
  });
}


const rebootParams = {
  InstanceIds: ['INSTANCE_ID'],
  DryRun: true
};

// Call EC2 to reboot instances
ec2.rebootInstances(rebootParams, function(err, data) {
  if (err && err.code === 'DryRunOperation') {
    rebootParams.DryRun = false;
    ec2.rebootInstances(rebootParams, function(err, data) {
        if (err) {
          console.log("Error", err);
        } else if (data) {
          console.log("Success", data);
        }
    });
  } else {
    console.log("You don't have permission to reboot instances.");
  }
});


var keyParams = {
   KeyName: 'KEY_PAIR_NAME'
};

// Create the key pair
ec2.createKeyPair(params, function(err, data) {
   if (err) {
      console.log("Error", err);
   } else {
      console.log(JSON.stringify(data));
   }
});

*/
