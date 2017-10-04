/**
 * Created by iggor on 02/10/17.
 */
process.env.NODE_ENV = 'test';

import PDV from "../model/pdv";
import chai from "chai";
import chaiHttp from "chai-http";
import app from "../app";

const should = chai.should();

chai.use(chaiHttp);

describe('PDV', () => {
    beforeEach((done) => {
        PDV.remove({}, (err) => {
            done();
        });
    });

    describe('/POST createNewPDV', () => {
        it('it should create a new PDV on the database', (done) => {
            chai.request(app)
                .post('/graphql?')
                // .set('content-type', 'application/x-www-form-urlencoded')
                .send({query: "mutation {  pdv: createNewPDV(id: \"6\", tradingName: \"Adega Sao Paulo\", ownerName: \"Pedro Silva\", document: \"0466641182390\", coverageArea: {type: MultiPolygon, coordinates: [[[[-38.6577, -3.7753], [-38.63212, -3.81418], [-38.61925, -3.82873], [-38.59762, -3.84004], [-38.58727, -3.84345], [-38.58189, -3.8442], [-38.57667, -3.84573], [-38.56706, -3.85015], [-38.56637, -3.84937], [-38.56268, -3.84286], [-38.56148, -3.83772], [-38.55881, -3.82411], [-38.55577, -3.81507], [-38.55258, -3.80674], [-38.54968, -3.80222], [-38.53406, -3.79495], [-38.52894, -3.77718], [-38.52517, -3.76313], [-38.53118, -3.76203], [-38.53968, -3.76126], [-38.54577, -3.76151], [-38.55344, -3.76102], [-38.56327, -3.76029], [-38.58118, -3.75907], [-38.60079, -3.75423], [-38.60671, -3.74772], [-38.61787, -3.7431], [-38.62577, -3.7472], [-38.63332, -3.7496], [-38.65049, -3.76057], [-38.6577, -3.7753]]]]}, address: {type: Point, coordinates: [-38.59826, -3.774186]}) {    id  }}"})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('data');
                    res.body.data.should.have.property('pdv');
                    res.body.data.pdv.should.be.a('object');
                    res.body.data.pdv.should.have.property('id');
                    done();
                });
        });
    });

    describe('/POST findAllPDVs', () => {
        it('it should find all PDVs on the database', (done) => {
            chai.request(app)
                .post('/graphql?')
                // .set('content-type', 'application/x-www-form-urlencoded')
                .send({query: "{ findAllPDVs { id } }"})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('data');
                    res.body.data.should.have.property('findAllPDVs');
                    res.body.data.findAllPDVs.should.be.a('array');
                    done();
                });
        });
    });

    describe('/POST findPDVById', () => {
        it('it should find a PDV by its \'id\' on the database', (done) => {
            chai.request(app)
                .post('/graphql?')
                // .set('content-type', 'application/x-www-form-urlencoded')
                .send({query: "{ findPDVById(id: \"4\") { id } }"})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('data');
                    res.body.data.should.have.property('findPDVById');

                    if (res.body.data.findPDVById !== null) {
                        res.body.data.findPDVById.should.be.a('object');
                    }

                    done();
                });
        });
    });

    describe('/POST searchPDV', () => {
        it('it should find the nearest PDV to a location', (done) => {
            chai.request(app)
                .post('/graphql?')
                // .set('content-type', 'application/x-www-form-urlencoded')
                .send({query: "{ searchPDV(lng: 0, lat: 0) { id } }"})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('data');
                    res.body.data.should.have.property('searchPDV');

                    if (res.body.data.searchPDVs !== null) {
                        res.body.data.searchPDVs.should.be.a('object');
                    }

                    done();
                });
        });
    });
});
