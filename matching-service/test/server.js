// Mocha/Chai/App imports
import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../server.js';
const { expect } = chai;
chai.use(chaiHttp)

// Test using direct connection to MongoDB
import mongoose from 'mongoose'
let mongoDB = process.env.DB_CLOUD_URI_TEST
if (!mongoDB || mongoDB=="" || process.env.ENV != "TEST") process.exit(1);
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});

describe("Hello World Test", () => {
    const route = '/'
    it("Returns Hello World String", done => {
        chai.request(app)
            .get(route)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.text).to.equals("Hello World from matching-service");
                done();
            });
        });
    });
