const { get } = require("../lifecycle.test");

describe("RequestController", () => {
  it("Trying to search with no query", (done) => {
    get("/api/search").end((err, { body, statusCode }) => {
      body.should.be.a("object");
      statusCode.should.equal(406);
      done();
    });
  });

  it("Search by a user", (done) => {
    get("/api/search", { search: "k" }).end((err, { body, statusCode }) => {
      body.should.be.a("object");
      body.data.length.should.be.equal(5);
      statusCode.should.equal(200);
      done();
    });
  });

  it("Registering a registered user", (done) => {
    get("/api/search", { search: "k", paginate: 7 }).end(
      (err, { body, statusCode }) => {
        body.should.be.a("object");
        body.data.length.should.be.equal(7);
        statusCode.should.equal(200);
        done();
      },
    );
  });

  it("Checking successful dashboard", (done) => {
    get("/api/dashboard").end((err, { body, statusCode }) => {
      body.should.be.a("object");
      body.data.length.should.be.equal(5);
      statusCode.should.equal(200);
      done();
    });
  });

  it("Pagination of dashboard", (done) => {
    get("/api/dashboard")
      .send({ paginate: 7 })
      .end((err, { body, statusCode }) => {
        body.should.be.a("object");
        body.data.length.should.be.equal(7);
        statusCode.should.equal(200);
        done();
      });
  });

  it("Sorting of dashboard", (done) => {
    get("/api/dashboard", { sort: "asc" }).end((err, { body, statusCode }) => {
      body.should.be.a("object");
      statusCode.should.equal(200);
      done();
    });
  });
});
