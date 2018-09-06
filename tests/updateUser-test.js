var supertest = require("supertest");
var should = require("should");

// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:8000");

// UNIT test begin

describe("update user unit test",function(){

  it("should update a user",function(done){

    //calling api
    server
    .post('/api/user/login')
    .send({username : "Any", password : "123"})
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
      server
      .put(`/api/users/${res.body.user.id}`)
      .send({firstName: "Gyan", lastName: "Gupta"})
      .set({"x-access-token" : res.body.token })
      .expect("Content-type",/json/)
      .expect(200)
      .end(function(err,res){
        res.status.should.equal(200);
        res.body.auth.should.equal(true);
        res.body.message.should.equal('user updated');
      });
      done();
    });
  });
});