const router = require("express").Router();
const { Thought, User } = require("../../models");

//getting all the users
router
  .route("/")
  .get((req, res) => {
    Thought.find({})
      .then((data) => res.json(data))
      .catch((err) => res.send(err));
  })
  .post((req, res) => {
    Thought.create(req.body)
      .then((data) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          {
            $addToSet: { thoughts: data.id },
          }
        );
      })
      .then((data) => res.json(data))
      .catch((err) => res.send(err));
  });

router
  .route("/:id")
  .get((req, res) => {
    Thought.findOne({
      _id: req.params.id,
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
      {
        $set: req.body,
      }
    )
      .select("-__v")
      .then((data) => res.json(data))
      .catch((err) => res.send(err));
  })
  .delete((req, res) => {
    Thought.findOneAndDelete({
      _id: req.params.id,
    })
      .then((data) => {
        return User.findOneAndUpdate(
          {
            thoughts: req.params.id,
          },
          {
            $pull: {
              thoughts: req.params.id,
            },
          }
        );
      })
      .then((data) => res.send(`User deleted: ${data}`))
      .catch((err) => res.send(err));
  });

router.route("/:thoughtId/reactions").post((req, res) => {
  Thought.findOneAndUpdate(
    {
      _id: req.params.thoughtId,
    },
    {
      $push: {
        reactions: req.body,
      },
    }
  )
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.send(err));
});

router.route("/:thoughtId/reactions/:reactionId").delete((req, res) => {
  Thought.findOneAndUpdate(
    {
      _id: req.params.thoughtId,
    },
    {
      $pull: {
        reactions: {
          _id: req.params.reactionId,
        },
      },
    }
  )
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.send(err));
});

module.exports = router;
