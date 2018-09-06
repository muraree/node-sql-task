var supertest = require("supertest");
var should = require("should");

// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:8000");

// UNIT test begin

describe("Register user unit test",function(){

  it("should register a user",function(done){

    //calling ADD api
    server
    .post('/api/user/register')
    .send({username : "Any", password : "123"})
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
      res.status.should.equal(200);
      res.body.auth.should.equal(true);
      done();
    });
  });
});