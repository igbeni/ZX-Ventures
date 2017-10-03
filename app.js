var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var lodash = require('lodash');
var graphqlTools = require('graphql-tools');
var apolloServerExpress = require('apollo-server-express');

mongoose.Promise = require('bluebird');

var app = express();

mongoose.connect("mongodb://mongo:27017/zx-ventures");

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('App connected to mongodb.');
});

const pdvSchema = mongoose.Schema({
    id: {
        type: String,
        unique: true,
        index: true
    },
    tradingName: {
        type: String
    },
    ownerName: {
        type: String
    },
    document: {
        type: String,
        unique: true,
        index: true
    },
    coverageArea: {
        type: {type: String},
        coordinates: []
    },
    address: {
        type: {type: String},
        coordinates: []
    }
});
pdvSchema.index({coverageArea: '2dsphere'});
pdvSchema.index({address: '2dsphere'});

var PDV = mongoose.model('PDV', pdvSchema);

var typeDefs = `

enum GeoJSONType {
    Point
    MultiPolygon
}

schema {
    query: Query
    mutation: Mutation
}

type Query {
    findAllPDVs: [PDV]!
    findPDVById(id: String!): PDV
    searchPDVs(lng: Float!, lat: Float!): [PDV]!
}

type Mutation {
    createNewPDV(id: String!, tradingName: String!, ownerName: String!, document: String!, coverageArea: GeoJSONMPInput!, address: GeoJSONInput!): PDV!
}

type GeoJSON {
    type: GeoJSONType!
    coordinates: [Float!]!
}

input GeoJSONInput {
    type: GeoJSONType!
    coordinates: [Float!]!
}

input GeoJSONMPInput {
    type: GeoJSONType!
    coordinates: [[[[Float!]]]]!
}

type PDV {
    id: String!
    tradingName: String!
    ownerName: String!
    document: String!
    coverageArea:GeoJSONType!
    address: GeoJSONType!
}

`;

const rootResolvers = {
    Query: {
        findAllPDVs: () => {
            return new Promise((resolve, reject) => {
                resolve(PDV.find({}));
            });
        },
        findPDVById: (root, args) => {
            return new Promise((resolve, reject) => {
                resolve(PDV.findOne(args));
            });
        },
        searchPDVs: (root, args) => {
            return new Promise((resolve, reject) => {
                var loc = {type: "Point", coordinates: [args.lng, args.lat]};
                resolve(PDV.find({
                    address: {$nearSphere: {$geometry: loc}},
                    coverageArea: {$geoIntersects: {$geometry: loc}}
                }).limit(1));
            });
        }
    },
    Mutation: {
        createNewPDV: (root, args) => {
            return new Promise((resolve, reject) => {
                var newPdv = new PDV({
                    id: args.id.toString(),
                    tradingName: args.tradingName,
                    ownerName: args.ownerName,
                    document: args.document,
                    coverageArea: args.coverageArea,
                    address: args.address
                });

                return newPdv.save(function (err, pdv) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(pdv);
                    }
                });
            });
        }
    }
};

var executableSchema = graphqlTools.makeExecutableSchema({
    typeDefs: [typeDefs],
    resolvers: lodash.merge(rootResolvers),
});

app.use('/graphql', bodyParser.json(), apolloServerExpress.graphqlConnect({schema: executableSchema}));
app.use('/graphiql', apolloServerExpress.graphiqlConnect({
    endpointURL: '/graphql'
}));

app.listen(3000, function () {
    console.log('App listening on port 3000!');
});