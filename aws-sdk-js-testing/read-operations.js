const AWS = require("aws-sdk");
AWS.config.update({region: 'eu-west-2'});

const docClient = new AWS.DynamoDB.DocumentClient();

/** This gets the corresponding item/row based on the given Key */
docClient.get({
    TableName: 'testDatabase_sdk',

    // Give the key of the row we wish to update. 
    // In this case, both the user_id and timestamp combine as the key.
    Key: {
        user_id: '1000',
        timestamp: 1
    },
}, (err, data) => {
    if(err) {
        console.log(err);
    } else {
        console.log(data);
    }
})


/** This gets the corresponding item/row based on the given Key and condition given */
docClient.query({
    TableName: 'testDatabase_sdk',
    KeyConditionExpression: 'user_id = :uid', // similar to WHERE
    ExpressionAttributeValues: { // setting what the :uid is
        ':uid': '1000'
    }
}, (err, data) => {
    if(err) {
        console.log(err);
    } else {
        console.log(data);
    }
})


// if using secondary indexes, the syntax remains the same, we just have to pass an
// additional parameter called index name, and then pass the name of the index.

// After querying, can use FilterExpression to filter specific details, like id > 10 or something.
// https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.NodeJs.04.html