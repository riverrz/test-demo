const expect = require("chai").expect;
const jwt = require("jsonwebtoken");
const sinon = require("sinon");
const authMiddleware = require("../middleware/is-auth");

describe("Auth middleware", function() {
  it("should throw error if no authorization header present", function() {
    const req = {
      get: function() {
        return null;
      }
    };
    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw(
      "Not authenticated."
    );
  });

  it("should throw an error if authrization token is one string", function() {
    const req = {
      get: function() {
        return "Bearer";
      }
    };
    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw();
  });
  it("should yield an userId after verification of token ", function() {
    const req = {
      get: function() {
        return "Bearer sadfgdsxcvdsfd";
      }
    };
    sinon.stub(jwt, "verify");
    // addded by sinon
    jwt.verify.returns({ userId: "abc" });
    authMiddleware(req, {}, () => {});
    expect(req).to.have.property("userId");
    expect(req).to.have.property("userId", "abc");
    jwt.verify.restore();
  });
  it("should throw an error if token cannot be verified", function() {
    const req = {
      get: function() {
        return "Bearer xyz";
      }
    };
    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw();
  });
});
