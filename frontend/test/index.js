// Mocha/Chai/App imports
const chaiHttp = require('chai-http')
const chai = require('chai')
const app = require('../index.js')
const { expect } = chai;
chai.use(chaiHttp)

describe("Status Test", () => {
    it("Should return HTTP 200", done => {
        chai.request(app)
            .get('/')
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
        });
    });

