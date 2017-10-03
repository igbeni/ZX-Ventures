var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var apolloServerExpress = require('apollo-server-express');

var app = express();

mongoose.Promise = require('bluebird');

mongoose.connect("mongodb://mongo:27017/zx-ventures");

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // console.log('App connected to mongodb.');
});

var executableSchema = require('./graphql/schema');

app.use('/graphql', bodyParser.json(), apolloServerExpress.graphqlConnect({schema: executableSchema}));
app.use('/graphiql', apolloServerExpress.graphiqlConnect({
    endpointURL: '/graphql'
}));

app.listen(3000, function () {
    console.log('App listening on port 3000!');
});

module.exports = app;