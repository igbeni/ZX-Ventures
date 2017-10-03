/**
 * Created by iggor on 02/10/17.
 */
var lodash = require('lodash');
var graphqlTools = require('graphql-tools');

var PDV = require('../model/pdv');

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
    searchPDVs(lng: Float!, lat: Float!): PDV
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
                resolve(PDV.findOne({
                    address: {$nearSphere: {$geometry: loc}},
                    coverageArea: {$geoIntersects: {$geometry: loc}}
                }));
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

module.exports = graphqlTools.makeExecutableSchema({
    typeDefs: [typeDefs],
    resolvers: lodash.merge(rootResolvers),
});