/**
 * Created by iggor on 02/10/17.
 */
import mongoose from "mongoose";

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

const PDV = mongoose.model('PDV', pdvSchema);

export default PDV;