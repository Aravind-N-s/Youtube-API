const { authenticate, chaiServer, token } = require("../lifecycle.test");

describe("Authentication - User Controller", () => {
  after(authenticate);

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
        statusCode.should.equal(406);
        done();
      });
  });

  it("Trying to Register with short password", (done) => {
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
        statusCode.should.equal(406);
        done();
      });
  });

  it("Registering a registered user", (done) => {
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
        statusCode.should.equal(406);
        done();
      });
  });

  it("Trying to login without correct password", (done) => {
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

  it("Login with correct credentials", (done) => {
    chaiServer
      .post("/users/login")
      .send({
        email: process.env.EMAIL,
        password: process.env.PASSWORD,
      })
      .end((err, { body, statusCode }) => {
        body.should.be.a("object");
        statusCode.should.equal(200);
        token.setUserToken = body.token;
        done();
      });
  });
});
