const expect = require("chai").expect;

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
});
