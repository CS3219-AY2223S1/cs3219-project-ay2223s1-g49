// Mocha/Chai/App imports
import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../server.js';
const { expect } = chai;
chai.use(chaiHttp)

describe("Hello World Test", () => {
    it("Returns Hello World String", done => {
        chai.request(app)
            .get('/')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.text).to.equals("Hello World from chat-service");
                done();
            });
        });
    });

