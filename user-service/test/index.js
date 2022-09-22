process.env.NODE_ENV= 'test'

import chaiHttp from 'chai-http';
import app from '../index.js';
import chai from 'chai';
import { HELLO_WORLD_STRING } from '../constants.js';
import jwt from 'jsonwebtoken'
const SECRET_KEY = process.env.JWT_SECRET_KEY //|| crypto.randomBytes(16).toString('hex')

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
            expect(res).to.have.status(403);
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
            expect(res).to.have.status(403);
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

    it("Testing empty username", done => {
        const EMPTY_USERNAME = ""
        const VALID_PASSWORD = "NONE"
        let invalidLogin = { username: EMPTY_USERNAME , password: VALID_PASSWORD}
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

    it("Testing empty password", done => {
        const VALID_PASSWORD = "test"
        const EMPTY_PASSWORD = ""
        let invalidLogin = { username: VALID_PASSWORD , password: EMPTY_PASSWORD}
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

describe("Test create user", () => {
    it("Testing create new user returns success", done => {
        const VALID_USERNAME = "newuser"
        const VALID_PASSWORD = "newuser"
        let validUser = { username: VALID_USERNAME, password: VALID_PASSWORD }
        chai.request(app)
        .post('/api/user/signup')
        .send(validUser)
        .end( (req,res) => {
            expect(res).to.have.status(201);
            expect(res.body.message).to.equal(`Created new user ${VALID_USERNAME} successfully!`)
            done();
        })
    })

    it("Testing create user that exist returns failure", done => {
        const INVALID_USERNAME = "existinguser"
        const INVALID_PASSWORD = "existinguser"
        let invalidUser = { username: INVALID_USERNAME, password: INVALID_PASSWORD }
        chai.request(app)
        .post('/api/user/signup')
        .send(invalidUser)
        .end( (req,res) => {
            expect(res).to.have.status(409);
            expect(res.body.message).to.equal(`Username ${INVALID_USERNAME} has been used!`)
            done();
        })
    })

    // need to delete user after this test

    it("Testing create user with missing username returns failure", done => {
        const INVALID_USERNAME = ""
        const VALID_PASSWORD = "newuser"
        let invalidUser = { username: INVALID_USERNAME, password: VALID_PASSWORD }
        chai.request(app)
        .post('/api/user/signup')
        .send(invalidUser)
        .end( (req,res) => {
            expect(res).to.have.status(400);
            expect(res.body.message).to.equal('Username and/or Password are missing!')
            done();
        })
    })

    it("Testing create user with missing password returns failure", done => {
        const VALID_USERNAME = "newuser"
        const INVALID_PASSWORD = ""
        let invalidUser = { username: VALID_USERNAME, password: INVALID_PASSWORD }
        chai.request(app)
        .post('/api/user/signup')
        .send(invalidUser)
        .end( (req,res) => {
            expect(res).to.have.status(400);
            expect(res.body.message).to.equal('Username and/or Password are missing!')
            done();
        })
    })
})

describe("Test delete user", () => {
    it("Testing delete user returns success", done => {
        const VALID_USERNAME = "newuser"
        let validUser = { username: VALID_USERNAME }
        let token = jwt.sign({ user: validUser }, SECRET_KEY)

        chai.request(app)
        .post('/api/user/delete-user')
        .send(validUser)
        .set("Authorization", token)
        .end( (req,res) => {
            expect(res).to.have.status(202);
            expect(res.body.message).to.equal(`Deleted new user ${VALID_USERNAME} successfully!`)
            done();
        })
    })

    it("Testing delete non-existing user returns failure", done => {
        const INVALID_USERNAME = "nonexistinguser"
        let invalidUser = { username: INVALID_USERNAME }
        let token = jwt.sign({ user: invalidUser}, SECRET_KEY)

        chai.request(app)
        .post('/api/user/delete-user')
        .send(invalidUser)
        .set("Authorization", token)
        .end( (req,res) => {
            expect(res).to.have.status(402);
            expect(res.body.message).to.equal(`Account with username ${INVALID_USERNAME} is not valid, unable to delete account`)
            done();
        })
    })

    // need to delete token after this test
})