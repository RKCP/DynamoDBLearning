const AWS = require("aws-sdk");
AWS.config.update({region: 'eu-west-2'});

const dynamoDB = new AWS.DynamoDB();

// For any of this to work, you must be connected to the DynamoDB table. Do so in the terminal using AWS Key and Secret Key.

/** This method lists the existing tables on DynamoDB */
dynamoDB.listTables({
    // since we only have 1 table, we don't need to specify which table we want in the params
}, (err, data) => {
    if(err) {
        console.log(err);
    } else {
        console.log(data);
    }
})


/** This method describes the existing tables on DynamoDB */
dynamoDB.describeTable({
    TableName: 'testDatabase_sdk'
}, (err, data) => {
    if(err) {
        console.log(err);
    } else {
        console.log(JSON.stringify(data, null, 2)); // the 2 allows the print out to be nicely formatted.
    }
})


/** This method creates a table on DynamoDB */
dynamoDB.createTable({
    TableName: 'testDatabase_sdk_two',
    AttributeDefinitions: [ // must specify the key
        {
            AttributeName: 'user_id',
            AttributeType: 'S'
        },
        {
            AttributeName: 'timestamp',
            AttributeType: 'N'
        }
    ],
    KeySchema: [ // must specify what KeyType the keys above are. 
        // KeyType is the role the key attribute will assume. HASH = Partition key, RANGE = sort key
        {
            AttributeName: 'user_id',
            KeyType: "HASH"
        },
        {
            AttributeName: 'timestamp',
            KeyType: "RANGE"
        }
    ],
    ProvisionedThroughput: { // must specify what throughput for RCUs and WCUs you want this table to have
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1
    }
}, (err, data) => {
    if(err) {
        console.log(err);
    } else {
        console.log(JSON.stringify(data, null, 2)); // the 2 allows the print out to be nicely formatted.
    }
})

/** This is a method that will update a table. In this example I am changing the provisioned throughput */
dynamoDB.updateTable({
    TableName: 'testDatabase_sdk_two',
    ProvisionedThroughput: {
        ReadCapacityUnits: 2,
        WriteCapacityUnits: 1
    }
}, (err, data) => {
    if(err) {
        console.log(err);
    } else {
        console.log(JSON.stringify(data, null, 2)); // the 2 allows the print out to be nicely formatted.
    }
})


/** This is a method that will delete a table */
dynamoDB.deleteTable({
    TableName: 'testDatabase_sdk_two'
}, (err, data) => {
    if(err) {
        console.log(err);
    } else {
        console.log(JSON.stringify(data, null, 2)); // the 2 allows the print out to be nicely formatted.
    }
})