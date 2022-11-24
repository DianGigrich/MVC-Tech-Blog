const express = require("express");
const router = express.Router();
const { Comment, User, Post} = require("../../models")

router.get("/", async (req, res) => {
  try {
    const comments = await Comment.findAll({
      include:[{
        model: User
      },{
        model:Post
      }]
    });
    res.json(comments);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: err });
  }
});

router.get("/:id", (req, res) => {
  Comment.findByPk(req.params.id)
    .then((oneComment) => {
      res.json(oneComment);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err: err });
    });
});

router.post("/", (req, res) => {
  console.log(req.body);
  Comment.create({
    comment: req.body.comment,
    PostId: req.body.postId,
    UserId: req.session.userId
  })
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err: err });
    });
});

router.delete("/:id", (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((delComment) => {
      if (delComment === 0) {
        return res.status(404).json({ msg: "no Comment found!" });
      }
      res.json(delComment);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err: err });
    });
});

module.exports = router;