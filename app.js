import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import {graphqlConnect, graphiqlConnect} from "apollo-server-express";
import executableSchema from "./graphql/schema";

const app = express();

mongoose.Promise = require('bluebird');

mongoose.connect("mongodb://mongo:27017/zx-ventures");

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('App connected to mongodb.');
});

app.use('/graphql', bodyParser.json(), graphqlConnect({schema: executableSchema}));
app.use('/graphiql', graphiqlConnect({
    endpointURL: '/graphql'
}));

app.listen(3000, function () {
    console.log('App listening on port 3000!');
});

export default app;