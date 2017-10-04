/**
 * Created by iggor on 04/10/17.
 */
import GeoJSON from "../geojson/geojson";

const PDV = `

type PDV {
    id: String!
    tradingName: String!
    ownerName: String!
    document: String!
    coverageArea: GeoJSON!
    address: GeoJSON!
}

`;

export default [PDV, ...GeoJSON];