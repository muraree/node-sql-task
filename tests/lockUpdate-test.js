var supertest = require("supertest");
var should = require("should");

// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:8000");
var token;

// UNIT test begin

describe("Update lock unit test",function(){

  it("should update a lock",function(done){

    //calling api
    server
    .post('/api/user/login')
    .send({username : "Any", password : "123"})
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
      token = res.body.token;
      server
      .post('/api/locks/create')
      .set({"x-access-token" : res.body.token })
      .send({name: "Gyanprakashan", userid: res.body.user.id})
      .expect("Content-type",/json/)
      .expect(200)
      .end(function(err,res){
        server
        .put(`/api/locks/${res.body.lock.id}`)
        .set({"x-access-token" : token })
        .send({name: "Ga"})
        .expect("Content-type",/json/)
        .expect(200)
        .end(function(err,res){
          res.status.should.equal(200);
          res.body.auth.should.equal(true);
          res.body.message.should.equal("lock updated");
        });
      });
      done();
    });
  });
});