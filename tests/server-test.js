const supertest = require("supertest");
const should = require("should");

// This agent refers to PORT where program is runninng.
var server = supertest.agent("http://localhost:8000");

// UNIT test begin
describe("Server unit test",function(){

  // #1 should return home page
  it("should return home page",function(done){

    // calling home page api
    server
    .get("/api/users/me")
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){

      // HTTP status should be 200
      res.status.should.equal(200);
      res.body.auth.should.equal(false);
      res.body.message.should.equal('no token provided');
      done();
    });
  });
});