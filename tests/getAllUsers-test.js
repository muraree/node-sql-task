var supertest = require("supertest");
var should = require("should");

// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:8000");

// UNIT test begin

describe("Get all users unit test",function(){

  it("should get all users",function(done){

    //calling api
    server
    .post('/api/user/login')
    .send({username : "Any", password : "123"})
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
      server
      .get('/api/users')
      .set({"x-access-token" : res.body.token })
      .expect("Content-type",/json/)
      .expect(200)
      .end(function(err,res){
        res.status.should.equal(200);
        res.body.auth.should.equal(true);
      });
      done();
    });
  });
});
