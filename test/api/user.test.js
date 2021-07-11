const { chaiServer, post, token } = require("../lifecycle.test");

describe("UserController", () => {
  it("Trying to Register with invalid email", (done) => {
    chaiServer
      .post("/users/register")
      .send({
        firstName: "Admin",
        lastName: "1",
        email: "notanemail",
        password: "admin@1235",
      })
      .end((err, { body, statusCode }) => {
        body.should.be.a("object");
        statusCode.should.equal(401);
        done();
      });
  });

  it("Trying to Register with ", (done) => {
    chaiServer
      .post("/users/register")
      .send({
        firstName: "Admin",
        lastName: "1",
        email: process.env.EMAIL,
        password: "ad",
      })
      .end((err, { body, statusCode }) => {
        body.should.be.a("object");
        statusCode.should.equal(401);
        done();
      });
  });

  it("Get stream details", (done) => {
    chaiServer
      .post("/users/register")
      .send({
        firstName: "Admin",
        lastName: "1",
        email: process.env.EMAIL,
        password: process.env.PASSWORD,
      })
      .end((err, { body, statusCode }) => {
        body.should.be.a("object");
        statusCode.should.equal(401);
        done();
      });
  });

  it("Get stream details", (done) => {
    chaiServer
      .post("/users/login")
      .send({
        email: process.env.EMAIL,
        password: "admin@1235",
      })
      .set("Authorization", token)
      .end((err, { body, statusCode }) => {
        body.should.be.a("object");
        statusCode.should.equal(401);
        done();
      });
  });

  it("Get stream details", (done) => {
    chaiServer
      .post("/users/login")
      .send({
        email: process.env.EMAIL,
        password: process.env.PASSWORD,
      })
      .end((err, { body, statusCode }) => {
        body.should.be.a("object");
        statusCode.should.equal(401);
        done();
      });
  });
});
