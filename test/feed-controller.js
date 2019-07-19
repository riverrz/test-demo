const expect = require("chai").expect;
const mongoose = require("mongoose");

const User = require("../models/user");

const feedController = require("../controllers/feed");

describe("Feed Controller", function() {
  before(function(done) {
    mongoose
      .connect("mongodb://localhost:27017/test-demo-dev")
      .then(result => {
        const user = new User({
          email: "shivam@example.com",
          password: "qwerty",
          name: "Shivam",
          posts: [],
          _id: "5c0f66b979af55031b34728a"
        });
        return user.save();
      })
      .then(() => {
        done();
      });
  });
  it("should add a created post to the posts of the creator", function(done) {
    const req = {
      body: {
        title: "Test Post",
        content: "A Test Post"
      },
      file: {
        path: "abc"
      },
      userId: "5c0f66b979af55031b34728a"
    };
    const res = {
      status: function() {
        return this;
      },
      json: function() {}
    };

    feedController
      .createPost(req, res, () => {})
      .then(savedUser => {
        expect(savedUser).to.have.property("posts");
        expect(savedUser.posts).to.have.length(1);
        done();
      })
      .catch(done);
  });

  after(function(done) {
    User.deleteMany({})
      .then(() => {
        return mongoose.disconnect();
      })
      .then(() => {
        done();
      });
  });
});
