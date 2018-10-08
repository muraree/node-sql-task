var supertest = require("supertest");
var should = require("should");

// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:8000");

// UNIT test begin

describe("Create lock unit test",function(){

  it("should create a lock",function(done){

    //calling api
    server
    .post('/api/user/login')
    .send({username : "Any", password : "123"})
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
      console.log(res.body);
      server
      .post('/api/locks/create')
      .set({"x-access-token" : res.body.token })
      .send({name: "Gyang", userid: res.body.user.id})
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