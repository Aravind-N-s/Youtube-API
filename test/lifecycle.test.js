require("../utils/env");
const chai = require("chai");
const chaiHttp = require("chai-http");
const qs = require("qs");
const chaiJsonSchema = require("chai-json-schema");

chai.should();
chai.use(chaiHttp);
chai.use(chaiJsonSchema);

const chaiServer = chai.request.agent(process.env.HOST);

const token = {
  tokenId: "",
  set setUserToken(value) {
    this.tokenId = value;
  },
  get jwtToken() {
    return `JWT ${this.tokenId}`;
  },
};

const get = (url, query = {}) =>
  // eslint-disable-next-line no-return-await
  chaiServer
    .get(`${url}${Object.keys(query).length ? `?${qs.stringify(query)}` : ""}`)
    .set("Authorization", token.jwtToken);
const post = (url = "/", body = {}) =>
  // eslint-disable-next-line no-return-await
  chaiServer.post(url).set("Authorization", token.jwtToken).send(body);
const patch = (url = "/", body = {}) =>
  // eslint-disable-next-line no-return-await
  chaiServer.patch(url).set("Authorization", token.jwtToken).send(body);
const del = (url = "/", body = {}) =>
  // eslint-disable-next-line no-return-await
  chaiServer.delete(url).set("Authorization", token.jwtToken).send(body);

const authenticate = async () => {
  try {
    const { body } = await chaiServer.post("/users/login").send({
      email: process.env.EMAIL,
      password: process.env.PASSWORD,
    });
    token.setUserToken = body.token;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log({ err });
    process.exit(1);
  }
};

before(authenticate);

after(async () => {
  await chaiServer.close();
});

module.exports = {
  chaiServer,
  authenticate,
  get,
  post,
  patch,
  del,
  token,
};
