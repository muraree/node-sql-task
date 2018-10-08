var supertest = require("supertest");
var should = require("should");

// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:8000");

// UNIT test begin

describe("Login user unit test",function(){

  it("should login a user",function(done){

    //calling api
    server
    .post('/api/user/login')
    .send({username : "Any", password : "123"})
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
      console.log(res.body);
      res.status.should.equal(200);
      res.body.auth.should.equal(true);
      res.body.user.username.should.equal("Any");
      done();
    });
  });
});