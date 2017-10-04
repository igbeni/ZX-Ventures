import {makeExecutableSchema} from "graphql-tools";
import {merge} from "lodash";
import rootResolvers from "./resolvers";
import PDV from "./models/pdv/pdv";
import GeoJSONInput from "./models/geojson/geojson-input";

const RootQuery = `

    type RootQuery {
        findAllPDVs: [PDV]!
        findPDVById(id: String!): PDV
        searchPDV(lng: Float!, lat: Float!): PDV
    }
  
`;

const RootMutation = `

    type RootMutation {
        createNewPDV(id: String!, tradingName: String!, ownerName: String!, document: String!, coverageArea: GeoJSONMPInput!, address: GeoJSONInput!): PDV!
    }
  
`;

const SchemaDefinition = `

    schema {
        query: RootQuery
        mutation: RootMutation
    }
  
`;

const executableSchema = makeExecutableSchema({
    typeDefs: [SchemaDefinition, RootQuery, RootMutation, ...PDV, ...GeoJSONInput],
    resolvers: merge(rootResolvers),
});

export default executableSchema;