/**
 * Created by iggor on 04/10/17.
 */
import PDV from "../model/pdv";

const rootResolvers = {
    RootQuery: {
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
        searchPDV: (root, args) => {
            return new Promise((resolve, reject) => {
                var loc = {type: "Point", coordinates: [args.lng, args.lat]};
                resolve(PDV.findOne({
                    address: {$nearSphere: {$geometry: loc}},
                    coverageArea: {$geoIntersects: {$geometry: loc}}
                }));
            });
        }
    },
    RootMutation: {
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

export default rootResolvers;