/**
 * Created by iggor on 04/10/17.
 */
import GeoJSONType from "./geojson-type";

const GeoJSONInput = `

    input GeoJSONInput {
        type: GeoJSONType!
        coordinates: [Float!]!
    }
  
`;

const GeoJSONMPInput = `

    input GeoJSONMPInput {
        type: GeoJSONType!
        coordinates: [[[[Float!]]]]!
    }
  
`;

export default [GeoJSONInput, GeoJSONMPInput, GeoJSONType];