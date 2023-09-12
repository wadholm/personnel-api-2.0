/* eslint-env mocha */
process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const { server } = require("../index");

chai.should();
chai.use(chaiHttp);

describe('Home', () => {
    describe('GET /api/v1/', () => {
        it('should get 200 HAPPY PATH for home', (done) => {
            chai.request(server)
                .get("/api/v1/")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.should.have.property("title");
                    res.body.title.should.equal("Personnel API");
                    done();
                });
        });
    });
});