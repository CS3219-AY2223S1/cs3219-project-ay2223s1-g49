process.env.NODE_ENV= 'test'

import chaiHttp from 'chai-http';
import app from '../index.js';
import chai from 'chai';
import { HELLO_WORLD_STRING } from '../constants.js';

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

describe("Test user checking", () => {
    it("Testing valid user", done => {
        const VALID_USERNAME = "test"
        let validUser = { username: VALID_USERNAME }
        chai.request(app)
        .get('/api/user/check')
        .send(validUser)
        .end( (req,res) => {
            expect(res).to.have.status(200);
            expect(res.body.message).to.equal(`${VALID_USERNAME} exists!`)
            done();
        })
    })

    it("Testing invalid user", done => {
        const INVALID_USERNAME = "NONE"
        let invalidUser = { username: INVALID_USERNAME }
        chai.request(app)
        .get('/api/user/check')
        .send(invalidUser)
        .end( (req,res) => {
            expect(res).to.have.status(200);
            expect(res.body.message).to.equal(`${INVALID_USERNAME} does not exist`)
            done();
        })
    })
})

describe("Test user login", () => {
    it("Testing successful login", done => {
        const VALID_USERNAME = "test"
        const VALID_PASSWORD = "test"
        let validLogin = { username: VALID_USERNAME , password: VALID_PASSWORD }
        chai.request(app)
        .post('/api/user/login')
        .send(validLogin)
        .end( (req,res) => {
            expect(res).to.have.status(200);
            expect(res.body.message).to.equal(`Logged in as ${VALID_USERNAME}!`)
            done();
        })
    })

    it("Testing invalid username", done => {
        const INVALID_USERNAME = "NONE"
        const VALID_PASSWORD = "test"
        let invalidLogin = { username: INVALID_USERNAME , password: VALID_PASSWORD }
        chai.request(app)
        .post('/api/user/login')
        .send(invalidLogin)
        .end( (req,res) => {
            expect(res).to.have.status(403);
            expect(res.body.message).to.equal(`Authentication failed for ${INVALID_USERNAME}!`)
            done();
        })
    })

    it("Testing invalid password", done => {
        const VALID_USERNAME = "test"
        const INVALID_PASSWORD = "NONE"
        let invalidLogin = { username: VALID_USERNAME , password: INVALID_PASSWORD }
        chai.request(app)
        .post('/api/user/login')
        .send(invalidLogin)
        .end( (req,res) => {
            expect(res).to.have.status(403);
            expect(res.body.message).to.equal(`Authentication failed for ${VALID_USERNAME}!`)
            done();
        })
    })

    it("Testing invalid username and password", done => {
        const INVALID_USERNAME = "NONE"
        const INVALID_PASSWORD = "NONE"
        let invalidLogin = { username: INVALID_USERNAME , password: INVALID_PASSWORD }
        chai.request(app)
        .post('/api/user/login')
        .send(invalidLogin)
        .end( (req,res) => {
            expect(res).to.have.status(403);
            expect(res.body.message).to.equal(`Authentication failed for ${INVALID_USERNAME}!`)
            done();
        })
    })

    it("Testing missing username", done => {
        const VALID_USERNAME = "test"
        let invalidLogin = { username: VALID_USERNAME }
        chai.request(app)
        .post('/api/user/login')
        .send(invalidLogin)
        .end( (req,res) => {
            expect(res).to.have.status(400);
            expect(res.body.message).to.equal(`Username and/or Password are missing!`)
            done();
        })
    })

    it("Testing missing password", done => {
        const VALID_PASSWORD = "test"
        let invalidLogin = { username: VALID_PASSWORD }
        chai.request(app)
        .post('/api/user/login')
        .send(invalidLogin)
        .end( (req,res) => {
            expect(res).to.have.status(400);
            expect(res.body.message).to.equal(`Username and/or Password are missing!`)
            done();
        })
    })

    it("Testing missing username and password", done => {
        let invalidLogin = {  }
        chai.request(app)
        .post('/api/user/login')
        .send(invalidLogin)
        .end( (req,res) => {
            expect(res).to.have.status(400);
            expect(res.body.message).to.equal(`Username and/or Password are missing!`)
            done();
        })
    })
})
