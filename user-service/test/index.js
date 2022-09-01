process.env.NODE_ENV= 'test'

import chaiHttp from 'chai-http';
import app from '../index.js';
import chai from 'chai';

const { expect } = chai;
chai.use(chaiHttp)

describe("Server!", () => {
    it("welcomes user to the api", done => {
   chai
    .request(app)
   .get('/api/user')
   .end((err, res) => {
   expect(res).to.have.status(200);
   console.log(res);
//   expect(res.body.status).to.equals("success");
//   expect(res.body.message).to.equals("Welcome To Testing API");
    done();
   });
   });
});
