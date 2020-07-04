const AWS = require("aws-sdk");
AWS.config.update({region: 'eu-west-2'});

const docClient = new AWS.DynamoDB.DocumentClient();

/** Function to insert/set a row in the DynamnoDB table */
docClient.put({
    TableName: 'testDatabase_sdk',

    // specify the table attributes as Key Value pairs
    Item: {
        user_id: '1000',
        timestamp: 1,
        title: 'test title',
        content: 'my content'
    }
}, (err, data) => {
    if(err) {
        console.log(err);
    } else {
        console.log(data);
    }
});

/** Function to update a row in the DynamnoDB table */
docClient.update({
    TableName: 'testDatabase_sdk',

    // Give the key of the row we wish to update. 
    // In this case, both the user_id and timestamp combine as the key.
    Key: {
        user_id: '1000',
        timestamp: 1
    },

    // Set #t as the title, and then change its value with :t
    UpdateExpression: 'set #t = :t',
    ExpressionAttributeNames: {
        '#t': 'title'
    },
    ExpressionAttributeValues: {
        ':t': 'new updated title'
    },
}, (err, data) => {
    if(err) {
        console.log(err);
    } else {
        console.log(data);
    }
});

/** Function to delete a row in the DynamnoDB table */
docClient.delete({
    TableName: 'testDatabase_sdk',

    // Give the key of the row we wish to delete. 
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
});