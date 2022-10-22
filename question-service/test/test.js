import chaiHttp from 'chai-http';
import app from '../index.js';
import chai from 'chai';
import jwt from 'jsonwebtoken'
const SECRET_KEY = process.env.JWT_SECRET_KEY

const { expect } = chai;
chai.use(chaiHttp)

describe("Hello World Test", () => {
    it("Returns Hello World String", done => {
        chai.request(app)
            .get('/api/user')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.text).to.equals(HELLO_WORLD_STRING);
                done();
            });
        });
    });