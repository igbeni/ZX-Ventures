/**
 * Created by iggor on 04/10/17.
 */
import GeoJSONType from "./geojson-type";

const GeoJSON = `

    type GeoJSON {
        type: GeoJSONType!
        coordinates: [Float!]!
    }
  
`;
export default [GeoJSON, GeoJSONType];