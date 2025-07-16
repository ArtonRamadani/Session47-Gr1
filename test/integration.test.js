let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');

chai.use(chaiHttp);

describe('/server and get helth endpoint test', () => {
    it('it should say "Server is healthy"', (done) => {
        chai.request(server)
            .get('/health')
            .end((err, res) => {
                console.log("res gashi", res.text)
                res.should.have.status(200);
                chai.expect(res.text).to.equal("Server is healthy");
                done();
            });
    });
});