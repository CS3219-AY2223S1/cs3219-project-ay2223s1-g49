// Mocha/Chai/App imports
import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../index.js';
const { expect } = chai;
chai.use(chaiHttp)

// Test using direct connection to MongoDB
import mongoose from 'mongoose'
import userModel from '../model/user-model.js';
import tokenModel from '../model/token-model.js'
let mongoDB = process.env.DB_CLOUD_URI_TEST
if (!mongoDB || mongoDB=="" || process.env.ENV != "TEST") process.exit(1);
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});


// Import constants
import { HELLO_WORLD_STRING } from '../constants.js';


// Import Utils
import jwt from 'jsonwebtoken'
import { createSaltAndHash, verifyPassword } from '../utils/hash-module.js';
import { verifyToken } from '../utils/verify-token.js';


// Define environment variables
const SECRET_KEY = process.env.JWT_TEST_KEY


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

// Deprecated method - Remove?
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
    before(async () => {
        // Clear DB and insert test user
        await userModel.deleteMany({})
        const testPassword = await createSaltAndHash("test")
        const user = userModel({ username: "test", password: testPassword })
        user.save()
    })

    after(async () => {
        // Clear DB
        await userModel.deleteMany({})
    })


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
        const VALID_PASSWORD = "test"
        let invalidLogin = { password: VALID_PASSWORD }
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
    before(async () => {
        // Clear DB and insert test user
        await userModel.deleteMany({})
        const testPassword = await createSaltAndHash("existinguser")
        const user = userModel({ username: "existinguser", password: testPassword })
        user.save()
    })

    after(async () => {
        // Clear DB
        await userModel.deleteMany({})
    })

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
    before(async () => {
        // Clear DB and insert test user
        await userModel.deleteMany({})
        await tokenModel.deleteMany({})
        const testPassword = await createSaltAndHash("newuser")
        const user = userModel({ username: "newuser", password: testPassword })
        user.save()
    })

    after(async () => {
        // Clear DB
        await userModel.deleteMany({})
        await tokenModel.deleteMany({})
    })
    
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

    it("Testing delete user with invalid token returns failure", done => {
        const VALID_USERNAME = "newuser"
        let validUser = { username: VALID_USERNAME }
        let invalidToken = jwt.sign({ user: validUser }, "INVALID")

        chai.request(app)
        .post('/api/user/delete-user')
        .send(validUser)
        .set("Authorization", invalidToken)
        .end( (req,res) => {
            expect(res).to.have.status(403);
            done();
        })
    })

    // TODO
    // need to delete token after this test
    // token not blacklisted on delete user 
})

describe('Test change password', () => {
    const VALID_USERNAME = "newuser"
    const INVALID_USERNAME = "NONE"
    const VALID_OLDPASSWORD = "newuser"
    const INVALID_OLDPASSWORD = "NONE"
    const VALID_NEWPASSWORD = "newuser1"
    let validUsername = { username: VALID_USERNAME }
    let token = jwt.sign({ user: validUsername }, SECRET_KEY)
    let invalidToken = jwt.sign({ user: validUsername }, "INVALID")

    before(async () => {
        // Clear DB and insert test user
        await userModel.deleteMany({})
        await tokenModel.deleteMany({})
        const testPassword = await createSaltAndHash(VALID_OLDPASSWORD)
        const user = userModel({ username: VALID_USERNAME, password: testPassword })
        user.save()
    })

    after(async () => {
        // Clear DB
        //await userModel.deleteMany({})
        //await tokenModel.deleteMany({})
    })

    it(`should be able to change password with correct credentials`, done => {
        let validUser = { username: VALID_USERNAME, oldpassword: VALID_OLDPASSWORD, newpassword: VALID_NEWPASSWORD }

        chai.request(app)
        .post('/api/user/change-password')
        .send(validUser)
        .set("Authorization", token)
        .end( (req,res) => {
            expect(res).to.have.status(200);
            expect(res.body.message).to.equal(`Password for ${VALID_USERNAME} changed successfully!`)
            done();
        })
    })

    it(`should be able to login with new password after changing password`, done => {
        let validLogin = { username: VALID_USERNAME , password: VALID_NEWPASSWORD }
        chai.request(app)
        .post('/api/user/login')
        .send(validLogin)
        .end( (req,res) => {
            expect(res).to.have.status(200);
            done();
        })
    })

    it(`should not be able to change password with incorrect credentials`, done => {
        let validUser = { username: VALID_USERNAME, oldpassword: INVALID_OLDPASSWORD, newpassword: VALID_NEWPASSWORD }

        chai.request(app)
        .post('/api/user/change-password')
        .send(validUser)
        .set("Authorization", token)
        .end( (req,res) => {
            expect(res).to.have.status(401);
            expect(res.body.message).to.equal(`Unable to change password! Please check your credentials!`)
            done();
        })
    })

    it(`should be not able to change password with invalid token`, done => {
        let validUser = { username: VALID_USERNAME, oldpassword: VALID_OLDPASSWORD, newpassword: VALID_NEWPASSWORD }

        chai.request(app)
        .post('/api/user/change-password')
        .send(validUser)
        .set("Authorization", invalidToken)
        .end( (req,res) => {
            expect(res).to.have.status(403);
            done();
        })
    })
})
