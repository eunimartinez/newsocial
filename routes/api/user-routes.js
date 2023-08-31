const router = require("express").Router();
const { User } = require("../../models");

//getting all the users
router
  .route("/")
  .get((req, res) => {
    User.find({})
      .populate({
        path: "friends",
        select: "-__v",
      })
      .select("-__v")
      .then((data) => res.json(data))
      .catch((err) => res.send(err));
  })
  .post((req, res) => {
    User.create({
      username: req.body.username,
      email: req.body.email,
    })
      .then((data) => res.json(data))
      .catch((err) => res.send(err));
  });

router
  .route("/:id")
  .get((req, res) => {
    User.findOne({
      _id: req.params.id,
    })
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .select("-__v")
      .then((data) => res.json(data))
      .catch((err) => res.send(err));
  })
  .put((req, res) => {
    User.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      req.body
    )
      .then((data) => res.json(data))
      .catch((err) => res.send(err));
  })
  .delete((req, res) => {
    User.findOneAndDelete({
      _id: req.params.id,
    }).then((data) => res.send(`User deleted: ${data}`));
  });

router
  .route("/:userId/friends/:friendId")
  .post((req, res) => {
    User.findOneAndUpdate(
      {
        _id: req.params.userId,
      },
      {
        $push: {
          friends: req.params.friendId,
        },
      }
    )
      .then((data) => res.json(data))
      .catch((err) => res.send(err));
  })
  .delete((req, res) => {
    User.findOneAndUpdate(
      {
        _id: req.params.userId,
      },
      {
        $pull: {
          friends: req.params.friendId,
        },
      }
    )
      .then((data) => res.json(data))
      .catch((err) => res.send(err));
  });

module.exports = router;
